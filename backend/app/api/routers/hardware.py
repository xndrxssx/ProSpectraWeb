# app/api/routes/hardware.py

import os
import time
import json
import hid
import numpy as np
from fastapi import APIRouter, HTTPException, Body
from app.core import config
from app.schemas.spectrum import RawSpectrumRequest, RawSpectrumResponse, ScanAndSaveRequest, ScanAndSaveResponse
from app.hardware.hid_interface import (
    perform_full_scan,
    DeviceConnectionError,
    ScanFailedError,
    HIDCommandError,
)
from app.hardware.spectrum_library import SpectrumLibraryError

router = APIRouter()

@router.get("/connect/", summary="Testa a conexão com o espectrômetro")
async def connect_test():
    """Verifica se o dispositivo HID pode ser encontrado e aberto."""
    device = None
    try:
        device = hid.device()
        device.open(config.DEVICE_VENDOR_ID, config.DEVICE_PRODUCT_ID)
        return {"ok": True, "message": "Dispositivo conectado com sucesso."}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Falha ao conectar: {e}")
    finally:
        if device:
            device.close()

@router.post("/read_data", response_model=RawSpectrumResponse, summary="Realiza uma varredura espectral")
async def read_data(req: RawSpectrumRequest = Body(...)):
    """Executa o fluxo de varredura e retorna os dados."""
    try:
        # Delega todo o trabalho pesado para a função de interface
        scan_result = perform_full_scan()

        wavelengths = scan_result.get("wavelength", [])
        values = scan_result.get("intensity", [])

        if not wavelengths or not values:
            raise ScanFailedError("A interpretação dos dados não retornou comprimentos de onda ou intensidades.")

        raw_id = f"scan_{int(time.time())}"
        
        # Lógica de salvamento
        save_path = config.SPECTRA_DIR / f"{raw_id}.csv"
        with open(save_path, "w", newline='') as f:
            f.write("wavelength,value\n")
            for w, v in zip(wavelengths, values):
                f.write(f"{w},{v}\n")
        config.logger.info(f"Dados da varredura salvos em: {save_path}")
        
        return RawSpectrumResponse(ok=True, rawId=raw_id, wavelengths=wavelengths, values=values)

    # Captura os erros específicos da camada de hardware e os traduz para erros HTTP
    except (DeviceConnectionError, ScanFailedError, HIDCommandError, SpectrumLibraryError) as e:
        config.logger.error(f"Falha na varredura: {e}", exc_info=True)
        raise HTTPException(status_code=503, detail=f"Falha de hardware ou varredura: {e}")
    except Exception as e:
        config.logger.error(f"Erro inesperado no endpoint /read_data: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Erro inesperado no servidor: {e}")

@router.post("/scan_and_save", response_model=ScanAndSaveResponse, summary="Realiza uma varredura espectral com conversão")
async def scan_and_save(req: ScanAndSaveRequest = Body(...)):
    """Executa o fluxo de varredura, aplica conversão (absorbância/reflectância) e retorna os dados."""
    try:
        # Delega todo o trabalho pesado para a função de interface
        scan_result = perform_full_scan()

        wavelengths = scan_result.get("wavelength", [])
        values = scan_result.get("intensity", [])

        if not wavelengths or not values:
            raise ScanFailedError("A interpretação dos dados não retornou comprimentos de onda ou intensidades.")

        # Aplicar conversão conforme o modo selecionado
        if req.conversion.lower() == "absorbancia":
            # Para absorbância, precisamos de uma referência (I0)
            if not req.conversionParam:
                raise HTTPException(status_code=400, detail="Parâmetro de referência necessário para cálculo de absorbância")
            try:
                reference_value = float(req.conversionParam)
                # Fórmula de absorbância: A = -log10(I/I0)
                # Evitar divisão por zero e valores negativos
                values = [-np.log10(max(v, 0.0001) / max(reference_value, 0.0001)) for v in values]
            except ValueError:
                raise HTTPException(status_code=400, detail="Valor de referência para absorbância deve ser um número")
        
        elif req.conversion.lower() == "reflectancia":
            # Para reflectância, precisamos de uma referência (I0)
            if not req.conversionParam:
                raise HTTPException(status_code=400, detail="Parâmetro de referência necessário para cálculo de reflectância")
            try:
                reference_value = float(req.conversionParam)
                # Fórmula de reflectância: R = I/I0
                # Evitar divisão por zero
                values = [v / max(reference_value, 0.0001) for v in values]
            except ValueError:
                raise HTTPException(status_code=400, detail="Valor de referência para reflectância deve ser um número")
        
        # Para intensidade, mantemos os valores originais

        raw_id = f"scan_{int(time.time())}"
        
        # Lógica de salvamento
        save_path = config.SPECTRA_DIR / f"{raw_id}.csv"
        with open(save_path, "w", newline='') as f:
            f.write("wavelength,value\n")
            for w, v in zip(wavelengths, values):
                f.write(f"{w},{v}\n")
        config.logger.info(f"Dados da varredura salvos em: {save_path}")
        
        # Salvar metadados adicionais
        metadata_path = config.SPECTRA_DIR / f"{raw_id}_metadata.json"
        metadata = {
            "name": req.name,
            "local": req.local,
            "varietyId": req.varietyId,
            "data": req.data,
            "conversion": req.conversion,
            "conversionParam": req.conversionParam
        }
        with open(metadata_path, "w") as f:
            json.dump(metadata, f)
        
        return ScanAndSaveResponse(ok=True, rawId=raw_id, wavelengths=wavelengths, values=values)

    # Captura os erros específicos da camada de hardware e os traduz para erros HTTP
    except (DeviceConnectionError, ScanFailedError, HIDCommandError, SpectrumLibraryError) as e:
        config.logger.error(f"Falha na varredura: {e}", exc_info=True)
        raise HTTPException(status_code=503, detail=f"Falha de hardware ou varredura: {e}")
    except Exception as e:
        config.logger.error(f"Erro inesperado no endpoint /scan_and_save: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Erro inesperado no servidor: {e}")