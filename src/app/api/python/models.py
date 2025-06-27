# pylint: disable=missing-module-docstring,missing-class-docstring
from typing import List, Dict, Any, Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime
from datetime import date

class SpectraData(BaseModel):
    name: str                  # Nome do registro
    content: List[List[float]] # Dados espectrais (lista de [wavelength, intensidade])
    variety: int               # ID da variedade selecionada
    datetime: str              # Data da coleta (YYYY-MM-DD)
    local: str                 # Local da coleta
    filter: Optional[str]      # Tipo de filtro escolhido (e.g., "MSC", "SNV", "SG" ou "none")
    sgParams: Optional[Dict]   # Parâmetros do filtro Savitzky-Golay (se aplicável)

class ModelResponse(BaseModel):
    id: int
    model_name: str
    variety: str  # Adicionando o campo da variedade
    attribute: str
    hyperparameters: Dict[str, Any]
    metrics: Dict[str, Dict[str, float]]
    model: str
    graph: Dict[str, str]
    createdAt: datetime
    updatedAt: datetime
    
class ModelData(BaseModel):
    model_name: str
    attribute: str
    variety: str
    hyperparameters: Dict[str, Any]
    X_train: List[List[float]]
    X_test: List[List[float]]
    y_train: List[float]
    y_test: List[float]

class SpectrumData(BaseModel):
    dataset: str  # Nome do atributo
    wavelengths: List[int]  # Comprimentos de onda (ex: [350, 400, 450, ...])
    X: List[List[float]]  # Matriz de features (amostras x comprimentos de onda)
    filter: str  # Nome do filtro aplicado
    sgParams: dict | None  # Opcional

class SpectrumResponse(BaseModel):
    id: int
    dataset: str
    wavelengths: List[float]  # Comprimentos de onda
    X: List[List[float]]      # Matriz de features (amostras x comprimentos de onda)
    createdAt: datetime
    updatedAt: datetime
    image: Dict[str, str]  # String Base64, não JSON
    
class TargetData(BaseModel):
    attribute: str  # Nome do atributo
    y: List[float]  # Lista de valores target (ex: [1.2, 2.3, 3.4, ...])

class TargetResponse(BaseModel):
    id: int
    attribute: str
    y: List[float]  # Lista de valores target
    createdAt: datetime
    updatedAt: datetime
    
class XResponse(BaseModel):
    X: List[List[float]]
    
class YResponse(BaseModel):
    y: List[float]
    
class ApplyModelRequest(BaseModel):
    model_name: str
    spectral_data_id: int = Field(..., gt=0)
 
class SavePredictionRequest(BaseModel):
    model_name: str
    name: str
    spectral_data_id: int = Field(..., gt=0)
    prediction: float  # Mudando de `float` para `list[float]`
    attribute: str
    
class PredictionResponse(BaseModel):
    id: int
    model_name: str
    name: str
    spectral_data_id: int
    prediction: float
    createdAt: datetime
    attribute: str

class User(BaseModel):
    id: int
    username: str
    password: str
    userType: str