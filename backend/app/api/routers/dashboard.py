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
        spectra_list_metadata = await prisma.spectra.find_many(select={"id": True, "name": True, "variety": True})
        spectrum_data_list_metadata = await prisma.spectrumdata.find_many(select={"id": True, "dataset": True})
        
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