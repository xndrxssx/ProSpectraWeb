from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import bcrypt
from datetime import datetime, timedelta
from app.schemas.auth import LoginRequest, SignupRequest, AuthResponse
from app.crud import crud_user
from app.core.config import JWT_SECRET_KEY, JWT_ALGORITHM

router = APIRouter()
security = HTTPBearer()

def create_access_token(data: dict, expires_delta: timedelta = None):
    """Cria um token JWT"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verifica o token JWT"""
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest):
    """Endpoint para login de usuário"""
    try:
        # Buscar usuário pelo username
        user = await crud_user.get_user_by_username(request.username)
        if not user:
            raise HTTPException(status_code=401, detail="Credenciais inválidas")
        
        # Verificar senha
        if not bcrypt.checkpw(request.password.encode('utf-8'), user["password"].encode('utf-8')):
            raise HTTPException(status_code=401, detail="Credenciais inválidas")
        
        # Criar token
        access_token = create_access_token(
            data={"sub": user["username"], "userType": user["userType"]},
            expires_delta=timedelta(hours=24)
        )
        
        return AuthResponse(
            access_token=access_token,
            token_type="bearer",
            username=user["username"],
            userType=user["userType"]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.post("/signup", response_model=AuthResponse)
async def signup(request: SignupRequest):
    """Endpoint para cadastro de usuário"""
    try:
        # Verificar se o usuário já existe
        existing_user = await crud_user.get_user_by_username(request.username)
        if existing_user:
            raise HTTPException(status_code=400, detail="Nome de usuário já existe")
        
        # Criar novo usuário
        from app.schemas.user import UserCreate
        user_data = UserCreate(
            username=request.username,
            password=request.password,
            userType=request.userType or "prod"
        )
        
        new_user = await crud_user.create_user(user_data)
        
        # Criar token
        access_token = create_access_token(
            data={"sub": new_user.username, "userType": new_user.userType},
            expires_delta=timedelta(hours=24)
        )
        
        return AuthResponse(
            access_token=access_token,
            token_type="bearer",
            username=new_user.username,
            userType=new_user.userType
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.get("/me")
async def get_current_user(username: str = Depends(verify_token)):
    """Endpoint para obter informações do usuário atual"""
    try:
        user = await crud_user.get_user_by_username(username)
        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        
        return {
            "username": user["username"],
            "userType": user["userType"],
            "id": user["id"]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}") 