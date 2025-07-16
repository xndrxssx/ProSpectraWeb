import json
import numpy as np
from fastapi import APIRouter, HTTPException

from app.schemas.prediction import ApplyModelRequest, SavePredictionRequest, PredictionResponse
from app.crud import crud_spectrum, crud_prediction
from app.services.file_service import load_model_from_disk
from app.core.config import MODELS_DIR

router = APIRouter()

@router.post("/apply-model/")
async def apply_model(request: ApplyModelRequest):
    try:
        model_path = MODELS_DIR / request.model_name
        if not model_path.exists():
            raise HTTPException(status_code=404, detail="Modelo não encontrado")
        
        model = load_model_from_disk(model_path)
        
        spectral_data = await crud_spectrum.get_spectra_by_id(request.spectral_data_id)
        if not spectral_data:
            raise HTTPException(status_code=404, detail="Dados espectrais não encontrados.")

        content = spectral_data.content
        X = np.array(json.loads(content) if isinstance(content, str) else content)
        
        prediction = model.predict(X)
        
        result = float(prediction[0]) if isinstance(prediction, (list, np.ndarray)) else float(prediction)
        
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao aplicar o modelo: {str(e)}")

@router.post("/save-prediction/")
async def save_prediction(request: SavePredictionRequest):
    spectral_data = await crud_spectrum.get_spectra_by_id(request.spectral_data_id)
    if not spectral_data:
        raise HTTPException(status_code=404, detail="Dados espectrais não encontrados.")

    saved_prediction = await crud_prediction.create_prediction(request)
    return {"message": "Predição salva com sucesso!", "id": saved_prediction.id}

@router.get("/get-spectral-data/")
async def list_spectral_data():
    spectral_data_list = await crud_spectrum.get_all_spectra()
    return [
        {
            "id": data.id, "name": data.name, "variety": data.variety,
            "datetime": data.datetime.isoformat(), "local": data.local,
            "filter": data.filter, "graph": data.graph,
        } for data in spectral_data_list
    ]

@router.get("/get-spectral-data/{id}")
async def get_spectral_data(id: int):
    spectral_data = await crud_spectrum.get_spectra_by_id(id)
    if not spectral_data:
        raise HTTPException(status_code=404, detail="Dado espectral não encontrado")
    return spectral_data

@router.get("/predictions/", response_model=list[PredictionResponse])
async def list_predictions():
    predictions = await crud_prediction.get_all_predictions()
    return [
        PredictionResponse(
            id=p.id, model_name=p.model_name, name=p.name,
            spectral_data_id=p.spectral_data_id, prediction=p.prediction,
            createdAt=p.createdAt, attribute=p.attribute
        ) for p in predictions
    ]