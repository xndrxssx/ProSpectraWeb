import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

from app.db.session import prisma
from app.services.file_service import get_image_url
from app.services import dashboard_service # Importamos o nosso novo serviço

router = APIRouter()

@router.get("/dashboard/")
async def get_dashboard_data():
    try:
        # --- ETAPA 1: BUSCAR DADOS BRUTOS (Responsabilidade do Router) ---
        all_models = await prisma.predictivemodel.find_many(order={"createdAt": "asc"})
        all_predictions = await prisma.predictions.find_many(order={"createdAt": "asc"})
        
        # --- ETAPA 2: DELEGAR O PROCESSAMENTO (Responsabilidade do Serviço) ---
        admin_view, producer_view = dashboard_service.get_processed_dashboard_views(
            all_models=all_models,
            all_predictions=all_predictions
        )

        # --- ETAPA 3: BUSCAR DADOS ADICIONAIS E MONTAR RESPOSTA FINAL (Responsabilidade do Router) ---
        spectra_list_metadata = await prisma.spectra.find_many()
        spectrum_data_list_metadata = await prisma.spectrumdata.find_many()
        
        common_data = {
            "predicted_spectra_options": [{"id": s.id, "name": f"{s.name} ({s.variety})"} for s in spectra_list_metadata],
            "original_spectra_options": [{"id": s.id, "name": s.dataset} for s in spectrum_data_list_metadata]
        }
        
        return {
            "admin_view": admin_view,
            "producer_view": producer_view,
            "common_data": common_data
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Erro interno ao carregar dashboard: {str(e)}")


@router.get("/spectra/{spectrum_id}")
async def get_predicted_spectrum_image(spectrum_id: int):
    # (Este endpoint permanece o mesmo)
    spectrum = await prisma.spectra.find_unique(where={"id": spectrum_id}, select={"id": True, "graph": True})
    if not spectrum or not spectrum.graph:
        raise HTTPException(status_code=404, detail="Espectro predito não encontrado.")
    
    image_url = get_image_url(unique_id=str(spectrum.id), db_data=spectrum.graph, prefix="predicted")
    if not image_url:
        raise HTTPException(status_code=500, detail="Erro ao processar imagem.")
    return {"image_url": image_url}

@router.get("/spectrum-data/{spectrum_data_id}")
async def get_original_spectrum_image(spectrum_data_id: int):
    # (Este endpoint permanece o mesmo)
    spectrum_data = await prisma.spectrumdata.find_unique(where={"id": spectrum_data_id}, select={"id": True, "image": True})
    if not spectrum_data or not spectrum_data.image:
        raise HTTPException(status_code=404, detail="Espectro original não encontrado.")

    image_url = get_image_url(unique_id=str(spectrum_data.id), db_data=spectrum_data.image, prefix="original")
    if not image_url:
        raise HTTPException(status_code=500, detail="Erro ao processar imagem.")
    return {"image_url": image_url}

@router.get("/model-graphs/{model_id}")
async def get_model_training_graphs(model_id: int):
    """Retorna os gráficos de treinamento de um modelo específico."""
    try:
        model = await prisma.predictivemodel.find_unique(where={"id": model_id})
        if not model or not model.graph:
            raise HTTPException(status_code=404, detail="Modelo ou gráficos não encontrados.")
        
        # Deserializar os dados do gráfico
        graph_data = model.graph if isinstance(model.graph, dict) else json.loads(model.graph)
        
        # Gerar URLs para os gráficos - usando caminhos diretos dos arquivos
        regression_path = graph_data.get("regression_comparison_plot", "")
        test_predictions_path = graph_data.get("test_predictions_plot", "")
        
        # Converter caminhos de arquivo para URLs
        regression_url = f"/static/images/{Path(regression_path).name}" if regression_path else None
        test_predictions_url = f"/static/images/{Path(test_predictions_path).name}" if test_predictions_path else None
        
        return {
            "model_name": model.model_name,
            "attribute": model.attribute,
            "regression_comparison_url": regression_url,
            "test_predictions_url": test_predictions_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar gráficos do modelo: {str(e)}")

@router.get("/available-models")
async def get_available_models():
    """Retorna lista de modelos disponíveis para visualização de gráficos."""
    try:
        models = await prisma.predictivemodel.find_many(
            select={"id": True, "model_name": True, "attribute": True, "variety": True, "createdAt": True}
        )
        return {
            "models": [
                {
                    "id": model.id,
                    "name": f"{model.model_name} ({model.attribute})",
                    "model_name": model.model_name,
                    "attribute": model.attribute,
                    "variety": model.variety,
                    "created_at": model.createdAt.isoformat()
                }
                for model in models
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar modelos: {str(e)}")