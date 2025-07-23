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

def _send_command(device: hid.device, group: int, command: int, data: bytes = b'', read: bool = True):
    """Função interna para enviar um comando HID, ler e validar a resposta."""
    packet = bytearray(64)
    packet[0] = 0x00
    packet[1] = 0xC0 if read else 0x40
    length = 2 + len(data)
    packet[3:5] = length.to_bytes(2, 'little')
    packet[5], packet[6] = command, group
    packet[7:7 + len(data)] = data

    try:
        device.write(packet)
        time.sleep(0.1)  # Aguarda um pouco para garantir que o comando foi enviado
        # Para comandos de escrita, fazemos uma leitura RÁPIDA e não-bloqueante para o ACK.
        if not read:
            # Tenta ler a confirmação com um timeout curto (200ms).
            # Se o dispositivo não responder, 'ack' será None e o código continuará.
            ack = device.read(64, 200) 
            if ack and ack[5] != command:
                config.logger.warning(f"ACK para o comando ({group},{command}) pode ter retornado um comando diferente.")
            return ack # Retorna o ACK ou None

        # Para comandos de leitura, esperamos pela resposta completa.
        response_packet = device.read(64, 5000)

        if not response_packet:
            raise HIDCommandError("Timeout: Nenhuma resposta recebida do dispositivo.")

        # Validação do cabeçalho da resposta
        flags = response_packet[1]
        error_status = (flags >> 4) & 0x03
        if error_status == 1:
            raise HIDCommandError(f"Dispositivo HID reportou um ERRO no comando ({group},{command}).")
        if error_status == 2:
            raise HIDCommandError(f"Dispositivo HID reportou estar OCUPADO para o comando ({group},{command}).")
        


        # Processamento do payload
        total_data_size = int.from_bytes(response_packet[3:5], "little")
        if total_data_size == 0:
            return bytearray()
        

        payload = bytearray(response_packet[7:])
        while len(payload) < total_data_size:
            chunk = device.read(64, 5000)
            if not chunk:
                break
            payload.extend(chunk)
        return payload[:total_data_size]

    except (IOError, OSError) as e:
        raise HIDCommandError(f"Erro de comunicação HID de baixo nível: {e}")

def _apply_scan_config(device: hid.device):
    """Cria, serializa e envia a configuração de varredura."""
    config.logger.info("ETAPA 1: Aplicando configuração de varredura...")
    scan_cfg = SlewScanConfig()

    # --- INICIALIZAÇÃO CORRETA E COMPLETA DO CABEÇALHO ---
    scan_cfg.head.scan_type = 0
    scan_cfg.head.num_repeats = 6
    scan_cfg.head.num_sections = 1
    # ADICIONADO: Dê um nome à configuração. É um campo obrigatório.
    scan_cfg.head.config_name = b"Python_Custom_Scan" 
    
    # O resto da função continua como está
    scan_cfg.section[0].wavelength_start_nm = 900
    scan_cfg.section[0].wavelength_end_nm = 1700
    scan_cfg.section[0].width_px = 10
    scan_cfg.section[0].num_patterns = 228
    scan_cfg.section[0].exposure_time = 635

    buf_size = ctypes.c_uint32(124)
    buf = (ctypes.c_uint8 * buf_size.value)()
    status = _lib.dlpspec_scan_write_configuration(ctypes.byref(scan_cfg), buf, ctypes.byref(buf_size))
    if status != 0: raise ScanFailedError(f"Erro C ao serializar configuração: {status}")
    
    _send_command(device, *config.CMD_SCAN_CFG_APPLY, data=bytes(buf), read=False)

def _get_scan_time(device: hid.device):
    """Solicita o tempo estimado da varredura ao dispositivo."""
    config.logger.info("ETAPA 2: Lendo tempo estimado...")
    time_payload = _send_command(device, *config.CMD_READ_SCAN_TIME, read=True)
    #scan_time_ms = int.from_bytes(time_payload, "little")
    scan_time_ms = int.from_bytes(time_payload[:4], "little")
    if len(time_payload) < 4:
        raise ScanFailedError(f"Payload de tempo inválido: {time_payload}")

    config.logger.info(f"Tempo estimado: {scan_time_ms} ms.")
    config.logger.debug(f"Bytes recebidos como tempo: {list(time_payload)}")
    return scan_time_ms

def _wait_for_scan_completion(device: hid.device, scan_time_ms: int):
    """Aguarda a varredura terminar, fazendo polling do status."""
    config.logger.info("ETAPA 4: Aguardando conclusão...")
    timeout_sec = (scan_time_ms // 1000) + 10
    for i in range(timeout_sec):
        time.sleep(1.0)
        status = _send_command(device, *config.CMD_GET_STATUS, read=True)
        if status and (status[0] & 0x02 == 0):
            config.logger.info(f"Varredura concluída após {i+1} segundos.")
            return
    raise ScanFailedError(f"Timeout: A varredura não terminou em {timeout_sec}s.")

# --- Função Principal de Interface ---

# app/hardware/hid_interface.py

def perform_full_scan() -> dict:
    """
    Executa o fluxo completo de varredura, desde abrir até fechar o dispositivo,
    e retorna os dados interpretados.
    """
    
    device = None
    connection_attempts = 5
    
    # 1. Conecta ao dispositivo (esta parte está correta).
    for attempt in range(connection_attempts):
        try:
            config.logger.info(f"Tentando conectar ao dispositivo... (Tentativa {attempt + 1}/{connection_attempts})")
            device = hid.device()
            device.open(config.DEVICE_VENDOR_ID, config.DEVICE_PRODUCT_ID)
            device.set_nonblocking(0)
            config.logger.info("Dispositivo HID aberto com sucesso.")
            break 
        except (IOError, OSError) as e:
            config.logger.error(f"--> ERRO na tentativa {attempt + 1}: {e}")
            device = None
            if attempt < connection_attempts - 1:
                time.sleep(2)
            else:
                raise DeviceConnectionError(f"Falha ao conectar no dispositivo após {connection_attempts} tentativas: {e}")
    
    if not device:
        raise DeviceConnectionError("Não foi possível estabelecer uma conexão com o dispositivo.")

    try:
        # O fluxo começa diretamente aplicando a sua configuração customizada.
        _apply_scan_config(device)
        
        # ADICIONADO: Pausa estratégica para o dispositivo processar a configuração.
        config.logger.info("Aguardando dispositivo processar a configuração...")
        time.sleep(1.0) # Pausa de 1 segundo.

        # Agora, com o dispositivo pronto, tentamos ler o tempo.
        scan_time_ms = _get_scan_time(device)
        
        # Checagem de sanidade para o valor retornado.
        if not (0 < scan_time_ms < 60000): # Tempo de varredura realista (menor que 1 minuto)
             raise ScanFailedError(f"Tempo estimado inválido ou corrompido: {scan_time_ms} ms")
        
        config.logger.info("ETAPA 3: Iniciando varredura...")
        _send_command(device, *config.CMD_PERFORM_SCAN, data=config.NNO_FILE_SCAN_DATA, read=False)

        _wait_for_scan_completion(device, scan_time_ms)
        
        config.logger.info("ETAPA 5: Lendo tamanho dos dados...")
        size_payload = _send_command(device, *config.CMD_FILE_GET_READSIZE, data=config.NNO_FILE_SCAN_DATA, read=True)

        if not size_payload or len(size_payload) < 4:
            raise ScanFailedError(f"Resposta inválida ao tentar obter tamanho dos dados: {size_payload}")

        data_size = int.from_bytes(size_payload[:4], "little")

        if not (0 < data_size < 100000):  # limite realista: 100KB
            raise ScanFailedError(f"Tamanho de dados inválido ou corrompido: {data_size}")


        # Checagem de sanidade para o tamanho dos dados.
        if not (0 < data_size < 100000): # Tamanho realista para dados de espectro (aprox. < 100KB)
            raise ScanFailedError(f"Tamanho de dados inválido ou corrompido: {data_size}")

        config.logger.info(f"Tamanho dos dados: {data_size} bytes.")

        config.logger.info("ETAPA 6: Lendo dados...")
        raw_data = _send_command(device, *config.CMD_FILE_GET_DATA, data=config.NNO_FILE_SCAN_DATA, read=True)
        
        # Dump dos dados para análise, caso precise no futuro.
        with open("raw_data_dump.bin", "wb") as f:
            f.write(raw_data)

        config.logger.info("ETAPA 7: Interpretando dados...")
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