import json
from typing import List, Optional
from app.db.session import prisma
from app.schemas.variety import VarietyCreate, VarietyUpdate

async def create_variety(variety: VarietyCreate):
    """Cria uma nova variedade no banco de dados"""
    return await prisma.variety.create(
        data={
            "name": variety.name,
            "description": variety.description,
            "attributes": json.dumps(variety.attributes)
        }
    )

async def get_all_varieties() -> List[dict]:
    """Retorna todas as variedades do banco de dados"""
    varieties = await prisma.variety.find_many()
    result = []
    for variety in varieties:
        # Verifica se attributes já é uma lista ou precisa ser convertido
        if isinstance(variety.attributes, list):
            attributes = variety.attributes
        elif isinstance(variety.attributes, str):
            try:
                attributes = json.loads(variety.attributes)
            except (json.JSONDecodeError, TypeError):
                attributes = []
        else:
            attributes = []
            
        result.append({
            "id": variety.id,
            "name": variety.name,
            "description": variety.description,
            "attributes": attributes
        })
    return result

async def get_variety_by_id(variety_id: int) -> Optional[dict]:
    """Retorna uma variedade específica pelo ID"""
    variety = await prisma.variety.find_unique(where={"id": variety_id})
    if variety:
        # Verifica se attributes já é uma lista ou precisa ser convertido
        if isinstance(variety.attributes, list):
            attributes = variety.attributes
        elif isinstance(variety.attributes, str):
            try:
                attributes = json.loads(variety.attributes)
            except (json.JSONDecodeError, TypeError):
                attributes = []
        else:
            attributes = []
            
        return {
            "id": variety.id,
            "name": variety.name,
            "description": variety.description,
            "attributes": attributes
        }
    return None

async def update_variety(variety_id: int, variety: VarietyUpdate):
    """Atualiza uma variedade existente"""
    return await prisma.variety.update(
        where={"id": variety_id},
        data={
            "name": variety.name,
            "description": variety.description,
            "attributes": json.dumps(variety.attributes)
        }
    )

async def delete_variety(variety_id: int):
    """Deleta uma variedade do banco de dados"""
    return await prisma.variety.delete(where={"id": variety_id})

async def get_variety_name_by_id(variety_id: int) -> Optional[str]:
    """Retorna apenas o nome da variedade pelo ID"""
    variety = await prisma.variety.find_unique(
        where={"id": variety_id},
        select={"name": True}
    )
    return variety.name if variety else None 