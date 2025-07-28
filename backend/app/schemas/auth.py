from pydantic import BaseModel
from typing import Optional

class LoginRequest(BaseModel):
    username: str
    password: str

class SignupRequest(BaseModel):
    username: str
    password: str
    userType: Optional[str] = "prod"

class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    username: str
    userType: str 