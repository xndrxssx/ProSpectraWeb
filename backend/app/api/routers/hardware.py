import os
import time
import json
import hid
from fastapi import APIRouter, HTTPException, Body

from app.schemas.spectrum import RawSpectrumRequest, RawSpectrumResponse
from app.hardware.hid_interface import perform_scan_and_read_data
from app.core.config import VENDOR_ID, PRODUCT_ID

router = APIRouter()

@router.get("/connect/")
async def connect_test():
    """Verifica se o dispositivo pode ser encontrado e aberto."""
    try:
        dev = hid.device()
        dev.open(VENDOR_ID, PRODUCT_ID)
        dev.close()
        return {"ok": True, "message": "Dispositivo conectado com sucesso."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Falha ao conectar: {e}")

@router.post("/read_data", response_model=RawSpectrumResponse)
async def read_data(req: RawSpectrumRequest = Body(...)):
    """
    Endpoint principal que executa o fluxo de varredura com polling,
    interpreta os dados e os retorna.
    """
    try:
        # Delega toda a complexa comunicação com o hardware para o serviço
        wavelengths, values = perform_scan_and_read_data(req.conversion)
        
        # Lógica de salvamento (pode ser expandida para usar o Prisma)
        raw_id_mock = f"scan_{int(time.time())}"
        save_dir = "src/data/tellspec"
        os.makedirs(save_dir, exist_ok=True)
        save_path = f"{save_dir}/{raw_id_mock}.json"
        with open(save_path, "w") as f:
            json.dump({"wavelengths": wavelengths, "intensity": values}, f)
        print(f"Dados salvos localmente em: {save_path}")

        return RawSpectrumResponse(
            ok=True, rawId=raw_id_mock, wavelengths=wavelengths, values=values
        )
    except HTTPException as e:
        # Re-levanta exceções HTTP para que o FastAPI as retorne corretamente
        raise e
    except Exception as e:
        # Captura outras exceções inesperadas
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))