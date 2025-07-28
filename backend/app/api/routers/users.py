from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from app.crud import crud_user
from typing import List

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
async def get_users():
    """Lista todos os usuários"""
    try:
        users = await crud_user.get_all_users()
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar usuários: {str(e)}")

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate):
    """Cria um novo usuário"""
    try:
        # Verificar se o usuário já existe
        existing_user = await crud_user.get_user_by_username(user.username)
        if existing_user:
            raise HTTPException(status_code=400, detail="Nome de usuário já existe")
        
        new_user = await crud_user.create_user(user)
        return new_user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar usuário: {str(e)}")

@router.put("/{user_id}")
async def update_user(user_id: int, user_update: UserUpdate):
    """Atualiza um usuário existente"""
    try:
        updated_user = await crud_user.update_user(user_id, user_update)
        if not updated_user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        return updated_user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar usuário: {str(e)}")

@router.delete("/{user_id}")
async def delete_user(user_id: int):
    """Deleta um usuário"""
    try:
        success = await crud_user.delete_user(user_id)
        if not success:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        return {"message": "Usuário deletado com sucesso"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao deletar usuário: {str(e)}") 