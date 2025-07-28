import bcrypt
from datetime import datetime
from app.db.session import prisma
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from typing import List, Optional

async def get_all_users() -> List[UserResponse]:
    """Busca todos os usuários"""
    try:
        users = await prisma.user.find_many()
        return [UserResponse(
            id=user.id,
            username=user.username,
            userType=user.userType
        ) for user in users]
    except Exception as e:
        raise Exception(f"Erro ao buscar usuários: {str(e)}")

async def get_user_by_id(user_id: int) -> Optional[UserResponse]:
    """Busca um usuário pelo ID"""
    try:
        user = await prisma.user.find_unique(where={"id": user_id})
        if user:
            return UserResponse(
                id=user.id,
                username=user.username,
                userType=user.userType
            )
        return None
    except Exception as e:
        raise Exception(f"Erro ao buscar usuário: {str(e)}")

async def get_user_by_username(username: str) -> Optional[dict]:
    """Busca um usuário pelo nome de usuário (retorna dict para compatibilidade com auth)"""
    try:
        user = await prisma.user.find_unique(where={"username": username})
        if user:
            return {
                "id": user.id,
                "username": user.username,
                "password": user.password,
                "userType": user.userType
            }
        return None
    except Exception as e:
        raise Exception(f"Erro ao buscar usuário: {str(e)}")

async def create_user(user_data: UserCreate) -> UserResponse:
    """Cria um novo usuário"""
    try:
        # Criptografar a senha
        hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())
        
        user = await prisma.user.create(
            data={
                "username": user_data.username,
                "password": hashed_password.decode('utf-8'),
                "userType": user_data.userType
            }
        )
        return UserResponse(
            id=user.id,
            username=user.username,
            userType=user.userType,
            createdAt=getattr(user, 'createdAt', None)  # Usar o campo se existir, senão None
        )
    except Exception as e:
        raise Exception(f"Erro ao criar usuário: {str(e)}")

async def update_user(user_id: int, user_data: UserUpdate) -> Optional[UserResponse]:
    """Atualiza um usuário existente"""
    try:
        update_data = {}
        
        if user_data.username is not None:
            update_data["username"] = user_data.username
        if user_data.password is not None:
            hashed_password = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt())
            update_data["password"] = hashed_password.decode('utf-8')
        if user_data.userType is not None:
            update_data["userType"] = user_data.userType
        
        if not update_data:
            return await get_user_by_id(user_id)
        
        user = await prisma.user.update(
            where={"id": user_id},
            data=update_data
        )
        return UserResponse(
            id=user.id,
            username=user.username,
            userType=user.userType,
            createdAt=getattr(user, 'createdAt', None)  # Usar o campo se existir, senão None
        )
    except Exception as e:
        raise Exception(f"Erro ao atualizar usuário: {str(e)}")

async def delete_user(user_id: int) -> bool:
    """Deleta um usuário"""
    try:
        await prisma.user.delete(where={"id": user_id})
        return True
    except Exception as e:
        raise Exception(f"Erro ao deletar usuário: {str(e)}") 