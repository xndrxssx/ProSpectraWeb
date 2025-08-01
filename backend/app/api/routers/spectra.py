import json
import numpy as np
from typing import List
from fastapi import APIRouter, HTTPException, Query, File, UploadFile

from app.schemas.spectrum import (
    SpectraData, SpectrumData, TargetData, TargetResponse, SpectrumResponse,
    XResponse, YResponse
)
from app.services.data_science_service import (
    apply_msc, apply_snv, apply_sg, plot_filtered_data
)
from app.crud import crud_spectrum

router = APIRouter()

@router.post("/save-data")
async def save_data(data: SpectraData):
    filter_type = data.filter or "none"
    data_values = np.array(data.content, dtype=float)

    if filter_type == "MSC":
        filtered_data = apply_msc(data_values)
    elif filter_type == "SNV":
        filtered_data = apply_snv(data_values)
    elif filter_type == "SG":
        sg_params = data.model_dump().get("sgParams", {})
        filtered_data = apply_sg(data_values, sg_params)
    else:
        filtered_data = data_values

    filtered_list = filtered_data.tolist() if isinstance(filtered_data, np.ndarray) else filtered_data

    wl = np.linspace(350, 2500, data_values.shape[1])
    img_str = plot_filtered_data(filtered_data, wl)
    
    saved_spectra = await crud_spectrum.create_spectra(data, filtered_list, img_str)
    return {"message": "Dados e gráfico salvos com sucesso!", "id": saved_spectra.id}

@router.post("/save-wavelengths/")
async def save_wavelengths(data: SpectrumData):
    try:
        X = np.array(data.X)
        if data.filter == "MSC": filtered_data = apply_msc(X)
        elif data.filter == "SNV": filtered_data = apply_snv(X)
        elif data.filter == "SG": filtered_data = apply_sg(X, data.sgParams)
        else: filtered_data = X
        
        image_str = plot_filtered_data(filtered_data, np.array(data.wavelengths))
        db_entry = await crud_spectrum.create_spectrum_data(data, filtered_data.tolist(), image_str)
        return {"message": "Dados e gráfico salvos com sucesso!", "id": db_entry.id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/save-targets/", response_model=TargetResponse)
async def save_targets(data: TargetData):
    try:
        db_entry = await crud_spectrum.create_target_data(data)
        # Verificar se db_entry.y já é uma lista ou precisa ser deserializado
        y_data = db_entry.y if isinstance(db_entry.y, list) else json.loads(db_entry.y)
        
        return TargetResponse(
            id=db_entry.id,
            attribute=db_entry.attribute,
            y=y_data,
            createdAt=db_entry.createdAt,
            updatedAt=db_entry.updatedAt
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/upload-data/")
async def upload_data(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        json.loads(contents)
        return {"message": "Dados recebidos com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar os dados: {e}")

@router.get("/get-wavelengths/", response_model=List[SpectrumResponse])
async def get_wavelengths(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1)):
    db_entries = await crud_spectrum.get_all_spectrum_data(skip, limit)
    return [
        SpectrumResponse(
            id=entry.id,
            dataset=entry.dataset,
            wavelengths=entry.wavelengths if isinstance(entry.wavelengths, list) else json.loads(entry.wavelengths),
            X=entry.X if isinstance(entry.X, list) else json.loads(entry.X),
            createdAt=entry.createdAt,
            updatedAt=entry.updatedAt,
            image=entry.image if isinstance(entry.image, dict) else json.loads(entry.image or '{}')
        ) for entry in db_entries
    ]

@router.get("/get-targets/", response_model=List[TargetResponse])
async def get_targets(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1)):
    db_entries = await crud_spectrum.get_all_target_data(skip, limit)
    return [
        TargetResponse(
            id=entry.id, attribute=entry.attribute, y=entry.y if isinstance(entry.y, list) else json.loads(entry.y),
            createdAt=entry.createdAt, updatedAt=entry.updatedAt
        ) for entry in db_entries
    ]

@router.get("/get-wavelengths/{id}", response_model=XResponse)
async def get_wavelength_by_id(id: int):
    entry = await crud_spectrum.get_spectrum_data_by_id(id)
    if not entry:
        raise HTTPException(status_code=404, detail="Dado espectral não encontrado")
    return XResponse(X=entry.X if isinstance(entry.X, list) else json.loads(entry.X))

@router.get("/get-targets/{id}", response_model=YResponse)
async def get_target_by_id(id: int):
    entry = await crud_spectrum.get_target_data_by_id(id)
    if not entry:
        raise HTTPException(status_code=404, detail="Alvo não encontrado")
    return YResponse(y=entry.y if isinstance(entry.y, list) else json.loads(entry.y))