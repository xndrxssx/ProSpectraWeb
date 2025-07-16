from datetime import datetime, timezone
from app.db.session import prisma
from app.schemas.prediction import SavePredictionRequest

async def create_prediction(request: SavePredictionRequest):
    return await prisma.predictions.create(
        data={
            "name": request.name,
            "model_name": request.model_name,
            "spectral_data_id": request.spectral_data_id,
            "prediction": request.prediction,
            "createdAt": datetime.now(timezone.utc),
            "attribute": request.attribute,
        }
    )

async def get_all_predictions():
    return await prisma.predictions.find_many()