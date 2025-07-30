from typing import List, Dict, Any
from pydantic import BaseModel
from datetime import datetime

class ModelData(BaseModel):
    model_name: str
    attribute: str
    variety: str
    hyperparameters: Dict[str, Any]
    X_train: List[List[float]]
    X_test: List[List[float]]
    y_train: List[float]
    y_test: List[float]

class ModelResponse(BaseModel):
    id: int
    model_name: str
    variety: str
    attribute: str
    hyperparameters: Dict[str, Any]
    metrics: Dict[str, Dict[str, float]]
    model: str
    graph: Dict[str, str]
    createdAt: datetime
    updatedAt: datetime