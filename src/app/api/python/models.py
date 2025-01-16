from pydantic import BaseModel, Json
from typing import Optional

class SpectraData(BaseModel):
    name: str
    content: list[list[float]]  # Alterado de dict para list[list[float]]
    variety: str
    datetime: str  # String que será convertida para DateTime
    local: str
    filter: str
    sgParams: dict | None  # Opcional