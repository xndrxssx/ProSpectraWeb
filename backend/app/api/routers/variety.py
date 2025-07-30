from fastapi import APIRouter, HTTPException
from app.schemas.variety import VarietyCreate, VarietyUpdate, VarietyResponse
from app.crud import crud_variety

router = APIRouter()

@router.get("/edit-variety", response_model=list[dict])
async def get_varieties():
    """Retorna todas as variedades cadastradas"""
    try:
        varieties = await crud_variety.get_all_varieties()
        return varieties
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar variedades: {str(e)}")

@router.post("/edit-variety")
async def create_variety(variety: VarietyCreate):
    """Cria uma nova variedade"""
    try:
        created_variety = await crud_variety.create_variety(variety)
        return {
            "id": created_variety.id,
            "name": created_variety.name,
            "description": created_variety.description,
            "attributes": variety.attributes
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar variedade: {str(e)}")

@router.put("/edit-variety")
async def update_variety(variety_data: dict):
    """Atualiza uma variedade existente"""
    try:
        variety_id = variety_data.get("id")
        if not variety_id:
            raise HTTPException(status_code=400, detail="ID da variedade é obrigatório")
        
        variety_update = VarietyUpdate(
            name=variety_data["name"],
            description=variety_data["description"],
            attributes=variety_data["attributes"]
        )
        
        updated_variety = await crud_variety.update_variety(variety_id, variety_update)
        return {
            "id": updated_variety.id,
            "name": updated_variety.name,
            "description": updated_variety.description,
            "attributes": variety_data["attributes"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar variedade: {str(e)}")

@router.delete("/edit-variety")
async def delete_variety(variety_data: dict):
    """Deleta uma variedade"""
    try:
        variety_id = variety_data.get("id")
        if not variety_id:
            raise HTTPException(status_code=400, detail="ID da variedade é obrigatório")
        
        await crud_variety.delete_variety(variety_id)
        return {"message": "Variedade deletada com sucesso"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao deletar variedade: {str(e)}") 