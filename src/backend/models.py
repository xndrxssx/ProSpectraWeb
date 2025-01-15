from pydantic import BaseModel, Json
from typing import Optional

class SpectraData(BaseModel):
    name: str
    content: dict  # JSON para armazenar os dados espectrais
    variety: str
    datetime: str  # String que será convertida para DateTime
    local: str
    filter: str
    sgParams: dict | None  # Opcional