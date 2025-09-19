import json
from fastapi import APIRouter, HTTPException
from app.schemas.model import ModelData, ModelResponse
from app.services import model_training_service
from app.crud import crud_model
from app.core.config import MODELS_DIR

router = APIRouter()

async def train_and_save_model(data: ModelData, training_function):
    """Helper function to reduce code duplication in training endpoints."""
    try:
        model_path, metrics, graph_paths = training_function(data)
        
        db_entry = await crud_model.create_predictive_model(
            data=data,
            model_path=model_path,
            metrics=metrics,
            graph_paths=graph_paths
        )
        
        return ModelResponse(
            id=db_entry.id,
            model_name=db_entry.model_name,
            attribute=db_entry.attribute,
            variety=db_entry.variety,
            hyperparameters=db_entry.hyperparameters if isinstance(db_entry.hyperparameters, dict) else json.loads(db_entry.hyperparameters),
            metrics=db_entry.metrics if isinstance(db_entry.metrics, dict) else json.loads(db_entry.metrics),
            model=db_entry.model,
            graph=db_entry.graph if isinstance(db_entry.graph, dict) else json.loads(db_entry.graph),
            createdAt=db_entry.createdAt,
            updatedAt=db_entry.updatedAt,
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Erro ao treinar o modelo: {str(e)}")

@router.post("/train-model-rfr/", response_model=ModelResponse)
async def train_model_rfr(data: ModelData):
    return await train_and_save_model(data, model_training_service.train_rfr_model)

@router.post("/train-model-svr/", response_model=ModelResponse)
async def train_model_svr(data: ModelData):
    return await train_and_save_model(data, model_training_service.train_svr_model)

@router.post("/train-model-plsr/", response_model=ModelResponse)
async def train_model_plsr(data: ModelData):
    return await train_and_save_model(data, model_training_service.train_plsr_model)

@router.post("/train-model-pcr/", response_model=ModelResponse)
async def train_model_pcr(data: ModelData):
    return await train_and_save_model(data, model_training_service.train_pcr_model)

@router.post("/train-model-mlpr/", response_model=ModelResponse)
async def train_model_mlpr(data: ModelData):
    return await train_and_save_model(data, model_training_service.train_mlpr_model)

@router.get("/list-models/")
async def list_models():
    try:
        model_files = [f.name for f in MODELS_DIR.iterdir() if f.is_file() and f.suffix == '.joblib']
        return {"models": model_files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao listar modelos: {str(e)}")