import hid
import time
import json
import numpy as np
from fastapi import HTTPException

from app.core.config import (
    VENDOR_ID, PRODUCT_ID, CMD_SET_ACTIVE_SCAN_CFG, CMD_PERFORM_SCAN,
    CMD_GET_STATUS, CMD_FILE_GET_READSIZE, CMD_FILE_GET_DATA, NNO_FILE_SCAN_DATA
)

# Tenta importar a biblioteca de interpretação. Se falhar, usa um mock.
try:
    from app.hardware.spectrum_library import scan_interpret
except (ImportError, ModuleNotFoundError):
    print("AVISO: Wrapper 'spectrum_library.py' não encontrado. Usando uma função mock.")
    def scan_interpret(raw_data):
        num_points = 228
        mock_wavelengths = [900 + i * 3.5 for i in range(num_points)]
        mock_intensity = [10000 * (1 - (i - 114)**2 / 114**2) + np.random.rand() * 500 for i in range(num_points)]
        return json.dumps({"wavelength": mock_wavelengths, "intensity": mock_intensity})


def _send_hid_command(device, group, command, data=b'', read=True, sequence=0, timeout_ms=5000):
    """
    (Função interna) Envia um comando para o dispositivo HID e lê a resposta,
    lidando com múltiplos pacotes.
    """
    packet = bytearray(64)
    packet[0] = 0x00
    packet[1] = 0xC0 if read else 0x40
    packet[2] = sequence
    length = 2 + len(data)
    packet[3] = length & 0xFF
    packet[4] = (length >> 8) & 0xFF
    packet[5] = command
    packet[6] = group
    packet[7:7 + len(data)] = data

    try:
        device.write(packet)

        if not read:
            # Para comandos de escrita, aguarda uma resposta de ACK simples.
            ack_resp = device.read(64, timeout_ms=timeout_ms)
            if not ack_resp or ack_resp[5] != command:
                print(f"Aviso: ACK para o comando {command} pode não ter sido recebido corretamente.")
            return ack_resp

        # Lógica de Leitura para Múltiplos Pacotes
        resp = device.read(64, timeout_ms=timeout_ms)
        if not resp:
            raise HTTPException(status_code=408, detail="Timeout na leitura do primeiro pacote de resposta HID.")

        total_data_size = int.from_bytes(resp[3:5], "little")
        payload = bytearray(resp[7:7 + total_data_size])

        while len(payload) < total_data_size:
            chunk = device.read(64, timeout_ms=timeout_ms)
            if not chunk: break
            payload.extend(chunk)

        return payload[:total_data_size]

    except hid.HIDException as e:
        raise HTTPException(status_code=500, detail=f"Erro de comunicação HID: {e}")


def perform_scan_and_read_data(conversion: str | None):
    """
    (Função principal) Executa o fluxo completo de comunicação HID com polling de status
    para realizar uma varredura e retornar os dados interpretados.
    """
    device = None
    try:
        # Abre o dispositivo
        device = hid.device()
        device.open(VENDOR_ID, PRODUCT_ID)
        device.set_nonblocking(0) # Modo bloqueante simplifica a lógica
        print("Dispositivo aberto com sucesso.")

        # ETAPA 1: Definir a configuração de varredura ativa (índice 1)
        print("Definindo a configuração de varredura ativa...")
        _send_hid_command(device, *CMD_SET_ACTIVE_SCAN_CFG, data=bytes([0x01]), read=False)
        print("Configuração de varredura definida.")

        # ETAPA 2: Iniciar a varredura
        print("Iniciando varredura...")
        _send_hid_command(device, *CMD_PERFORM_SCAN, data=NNO_FILE_SCAN_DATA, read=False)
        print("Comando de varredura enviado.")

        # ETAPA 3: Aguardar a conclusão da varredura (poll de status)
        print("Aguardando conclusão da varredura...")
        for i in range(30): # Timeout de ~30 segundos
            time.sleep(1.0)
            status_payload = _send_hid_command(device, *CMD_GET_STATUS, read=True)
            # O status 'scan in progress' é o bit 1 do byte 0 do payload
            if status_payload and (status_payload[0] & 0x02 == 0):
                print(f"Varredura concluída após {i+1} segundos.")
                break
        else:
            raise HTTPException(status_code=504, detail="Timeout aguardando término da varredura.")

        # ETAPA 4: Obter o tamanho dos dados da varredura
        print("Obtendo o tamanho dos dados da varredura...")
        size_payload = _send_hid_command(device, *CMD_FILE_GET_READSIZE, data=NNO_FILE_SCAN_DATA, read=True)
        data_size = int.from_bytes(size_payload, "little")
        print(f"Tamanho esperado dos dados do espectro: {data_size} bytes.")
        if data_size == 0:
            raise HTTPException(status_code=500, detail="Dispositivo reportou 0 bytes para os dados da varredura.")

        # ETAPA 5: Ler os dados completos da varredura
        print("Lendo os dados da varredura...")
        full_data = _send_hid_command(device, *CMD_FILE_GET_DATA, read=True)
        print(f"Total de bytes recebidos: {len(full_data)}.")
        if len(full_data) < data_size:
            print(f"AVISO: Foram recebidos {len(full_data)} bytes, mas esperava-se {data_size}.")

        # ETAPA 6: Interpretar os dados
        interpreted_json = scan_interpret(full_data)
        data_dict = json.loads(interpreted_json)
        wavelengths = data_dict.get("wavelength", [])
        values = data_dict.get("intensity", [])
        
        if conversion == "absorbance":
            arr = np.array(values, dtype=np.float64)
            values = (-np.log10(arr.clip(min=1e-10))).tolist()

        return wavelengths, values

    finally:
        if device:
            print("Fechando dispositivo.")
            device.close()