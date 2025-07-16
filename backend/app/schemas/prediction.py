from pydantic import BaseModel, Field
from datetime import datetime

class ApplyModelRequest(BaseModel):
    model_name: str
    spectral_data_id: int = Field(..., gt=0)

class SavePredictionRequest(BaseModel):
    model_name: str
    name: str
    spectral_data_id: int = Field(..., gt=0)
    prediction: float
    attribute: str

class PredictionResponse(BaseModel):
    id: int
    model_name: str
    name: str
    spectral_data_id: int
    prediction: float
    createdAt: datetime
    attribute: str