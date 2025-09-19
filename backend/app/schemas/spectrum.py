from typing import List, Dict, Optional
from pydantic import BaseModel, Field
from datetime import datetime

class SpectraData(BaseModel):
    name: str
    content: List[List[float]]
    variety: str
    datetime: str
    local: str
    filter: Optional[str] = None
    sgParams: Optional[Dict] = None

class SpectrumData(BaseModel):
    dataset: str
    wavelengths: List[int]
    X: List[List[float]]
    filter: str
    sgParams: Optional[dict] = None

class SpectrumResponse(BaseModel):
    id: int
    dataset: str
    wavelengths: List[float]
    X: List[List[float]]
    createdAt: datetime
    updatedAt: datetime
    image: Dict[str, str]

class TargetData(BaseModel):
    attribute: str
    y: List[float]
    
    class Config:
        json_encoders = {
            float: lambda v: float(v) if v is not None else None
        }

class TargetResponse(BaseModel):
    id: int
    attribute: str
    y: List[float]
    createdAt: datetime
    updatedAt: datetime

class XResponse(BaseModel):
    X: List[List[float]]

class YResponse(BaseModel):
    y: List[float]

class RawSpectrumRequest(BaseModel):
    name: str
    local: str
    varietyId: int
    data: str
    conversion: Optional[str] = None
    conversionParam: Optional[str] = None

class RawSpectrumResponse(BaseModel):
    ok: bool
    rawId: str
    wavelengths: list[float]
    values: list[float]

class ScanAndSaveRequest(BaseModel):
    name: str
    local: str
    varietyId: int
    data: str
    conversion: str  # 'absorbancia', 'reflectancia', 'intensidade'
    conversionParam: Optional[str] = None  # Parâmetro de referência para absorbância/reflectância

class ScanAndSaveResponse(BaseModel):
    ok: bool
    rawId: str
    wavelengths: list[float]
    values: list[float]

class ReadRequest(BaseModel):
    name: str
    local: str
    varietyId: int
    data: str

class SaveRequest(BaseModel):
    name: str
    content: list[list[float]]
    variety: str
    datetime: str
    local: str
    filter: str
    sgParams: dict