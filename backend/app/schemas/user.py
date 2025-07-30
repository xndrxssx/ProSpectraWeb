from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username: str
    userType: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    userType: Optional[str] = None

class UserResponse(UserBase):
    id: int
    
    class Config:
        from_attributes = True 