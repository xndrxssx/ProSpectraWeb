# pylint: disable=missing-module-docstring,missing-class-docstring
from typing import List, Dict, Any
from pydantic import BaseModel
from datetime import datetime

class SpectraData(BaseModel):
    name: str
    content: list[list[float]]  # Alterado de dict para list[list[float]]
    variety: str
    datetime: str  # String que será convertida para DateTime
    local: str
    filter: str
    sgParams: dict | None  # Opcional

class ModelResponse(BaseModel):
    id: int
    model_name: str
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
    hyperparameters: Dict[str, Any]
    X_train: List[List[float]]
    X_test: List[List[float]]
    y_train: List[float]
    y_test: List[float]

class SpectrumData(BaseModel):
    dataset: str  # Nome do atributo
    wavelengths: List[int]  # Comprimentos de onda (ex: [350, 400, 450, ...])
    X: List[List[float]]  # Matriz de features (amostras x comprimentos de onda)

class SpectrumResponse(BaseModel):
    id: int
    dataset: str
    wavelengths: List[int]  # Comprimentos de onda
    X: List[List[float]]  # Matriz de features (amostras x comprimentos de onda)
    createdAt: datetime
    updatedAt: datetime
    
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