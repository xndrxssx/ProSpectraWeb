import json
from app.db.session import prisma
from app.schemas.model import ModelData

async def create_predictive_model(data: ModelData, model_path: str, metrics: dict, graph_paths: dict):
    return await prisma.predictivemodel.create(
        data={
            "model_name": data.model_name,
            "attribute": data.attribute,
            "variety": data.variety,
            "metrics": json.dumps(metrics),
            "graph": json.dumps(graph_paths),
            "hyperparameters": json.dumps(data.hyperparameters),
            "model": model_path,
        }
    )