from typing import List, Optional
from pydantic import BaseModel

class VarietyBase(BaseModel):
    name: str
    description: str
    attributes: List[str]

class VarietyCreate(VarietyBase):
    pass

class VarietyUpdate(VarietyBase):
    pass

class VarietyResponse(VarietyBase):
    id: int

    class Config:
        from_attributes = True 