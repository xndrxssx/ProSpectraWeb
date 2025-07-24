# app/hardware/hid_interface.py

import hid
import time
import json
import numpy as np
import ctypes
import os
from app.core import config
from app.hardware.spectrum_library import SlewScanConfig, _lib, scan_interpret, SpectrumLibraryError

# --- Exceções Customizadas para a Camada de Hardware ---
class DeviceConnectionError(Exception):
    """Erro ao tentar conectar ou abrir o dispositivo."""
    pass

class HIDCommandError(Exception):
    """Erro durante a comunicação de um comando HID."""
    pass

class ScanFailedError(Exception):
    """A varredura falhou em gerar dados válidos."""
    pass

# --- Funções Auxiliares de Baixo Nível ---

def _write_command(device: hid.device, group: int, command: int, data: bytes = b''):
    """Envia um comando de escrita, espelhando a referência (usb.py/writeCommand)."""
    packet = bytearray([0x00, 0x40, 0x00]) # ID, Flags (Write), Sequence
    packet.extend(((len(data) + 2)).to_bytes(2, 'little')) # Length
    packet.extend([command, group])
    packet.extend(data)
    
    device.write(packet)
    time.sleep(0.05)
    
    # Lê a confirmação e verifica se é um NACK (Comando Rejeitado).
    ack = device.read(64)
    if not ack:
        raise HIDCommandError(f"Comando de escrita ({group},{command}) não recebeu confirmação (timeout).")
    
    # O bit 4 do byte de Flags (índice 1) indica um NACK.
    if ack[1] & 0x10 != 0:
        raise HIDCommandError(f"Comando de escrita ({group},{command}) foi rejeitado pelo dispositivo (NACK).")
        
    return ack

def _read_command(device: hid.device, group: int, command: int, data: bytes = b''):
    """Envia um comando de leitura e retorna APENAS os dados da resposta, sem os bytes de eco."""
    packet = bytearray([0x00, 0xC0, 0x00]) # ID, Flags (Read), Sequence
    packet.extend(((len(data) + 2)).to_bytes(2, 'little'))
    packet.extend([command, group])
    packet.extend(data)
    
    device.write(packet)
    time.sleep(0.05)
    
    response_full = bytearray(device.read(64, 5000))
    if len(response_full) < 4: # Cabeçalho mínimo
        raise HIDCommandError("Resposta de leitura inválida (cabeçalho muito curto).")

    # O comprimento do payload (apenas dados) está nos bytes 2 e 3.
    payload_len = int.from_bytes(response_full[2:4], 'little')
    if payload_len == 0:
        return bytearray()

    # Os dados começam no byte 4 (sem eco).
    payload_received = response_full[4:]

    while len(payload_received) < payload_len:
        chunk = device.read(64, 1000)
        if not chunk:
            raise HIDCommandError("Comunicação interrompida ao ler payload longo.")
        payload_received.extend(chunk)

    # Retorna apenas os dados.
    return payload_received[0:payload_len]

def _wait_for_scan_completion(device: hid.device):
    """Aguarda a varredura terminar, fazendo polling do status."""
    config.logger.info("ETAPA 3: Aguardando conclusão da varredura (polling)...")
    time.sleep(0.1) 
    timeout = 30
    start_time = time.time()
    while True:
        # A resposta agora contém apenas os dados; o status é o primeiro byte.
        status_payload = _read_command(device, *config.CMD_GET_STATUS)
        if status_payload and (status_payload[0] & 0x02 == 0):
            config.logger.info(f"Varredura concluída após {time.time() - start_time:.2f} segundos.")
            return
        
        if (time.time() - start_time) > timeout:
            raise ScanFailedError(f"Timeout: A varredura não terminou em {timeout} segundos.")
        
        time.sleep(0.5)

def perform_full_scan() -> dict:
    """
    Executa o fluxo completo de varredura usando uma configuração de fábrica do dispositivo.
    """
    device = None
    connection_attempts = 3
    
    for attempt in range(connection_attempts):
        try:
            config.logger.info(f"Tentando conectar ao dispositivo... (Tentativa {attempt + 1}/{connection_attempts})")
            device = hid.device()
            device.open(config.DEVICE_VENDOR_ID, config.DEVICE_PRODUCT_ID)
            device.set_nonblocking(0)
            config.logger.info("Dispositivo HID aberto com sucesso.")
            time.sleep(0.5)
            break 
        except (IOError, OSError) as e:
            config.logger.error(f"--> ERRO na tentativa {attempt + 1}: {e}")
            device = None
            if attempt < connection_attempts - 1:
                time.sleep(1)
            else:
                raise DeviceConnectionError(f"Falha ao conectar no dispositivo após {connection_attempts} tentativas.")
    
    if not device:
        raise DeviceConnectionError("Não foi possível estabelecer uma conexão com o dispositivo.")

    try:
        config.logger.info("Verificando status de hibernação...")
        hibernate_payload = _read_command(device, *config.CMD_READ_HIBERNATE_STATUS)
        # O byte de status da hibernação está no índice 2 do payload.
        if hibernate_payload and len(hibernate_payload) > 2 and hibernate_payload[2] == 1:
            config.logger.info("Dispositivo em modo de hibernação. Desativando...")
            _write_command(device, *config.CMD_SET_HIBERNATE_STATUS, data=bytes([0x00]))
            time.sleep(0.5)

        config.logger.info("ETAPA 1: Ativando configuração de varredura de fábrica (índice 1)...")
        _write_command(device, *config.CMD_SET_ACTIVE_SCAN_CFG, data=bytes([0x01]))
        time.sleep(0.5)

        config.logger.info("ETAPA 2: Iniciando varredura...")
        _write_command(device, *config.CMD_PERFORM_SCAN, data=config.NNO_FILE_SCAN_DATA)

        _wait_for_scan_completion(device)
        
        config.logger.info("ETAPA 4: Lendo tamanho dos dados...")
        size_payload = _read_command(device, *config.CMD_FILE_GET_READSIZE, data=config.NNO_FILE_SCAN_DATA)
        if not size_payload or len(size_payload) < 4:
            raise ScanFailedError(f"Resposta inválida ao obter tamanho dos dados: {size_payload}")
        data_size = int.from_bytes(size_payload[0:4], "little")
        if not (0 < data_size < 100000):
            raise ScanFailedError(f"Tamanho de dados inválido ou corrompido: {data_size}")
        config.logger.info(f"Tamanho dos dados: {data_size} bytes.")

        config.logger.info("ETAPA 5: Lendo dados...")
        raw_data = bytearray()
        while len(raw_data) < data_size:
            chunk = _read_command(device, *config.CMD_FILE_GET_DATA)
            if not chunk:
                raise ScanFailedError("Falha ao ler chunk de dados; comunicação interrompida.")
            raw_data.extend(chunk)
        config.logger.info(f"Dados lidos completamente: {len(raw_data)} bytes.")
        
        with open(config.BASE_DIR / "raw_data_dump.bin", "wb") as f:
            f.write(raw_data)

        config.logger.info("ETAPA 6: Interpretando dados...")
        return scan_interpret(raw_data)

    except (HIDCommandError, ScanFailedError, SpectrumLibraryError) as e:
        config.logger.error(f"Erro durante a operação de varredura: {e}")
        raise e
    except Exception as e:
        config.logger.error(f"Erro inesperado durante a varredura: {e}")
        raise ScanFailedError(f"Erro inesperado: {e}")
    finally:
        if device:
            device.close()
            config.logger.info("Dispositivo HID fechado.")