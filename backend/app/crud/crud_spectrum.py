import json
from datetime import datetime, timezone
from app.db.session import prisma
from app.schemas.spectrum import SpectraData, SpectrumData, TargetData

async def create_spectra(data: SpectraData, filtered_content: list, graph_str: str):
    datetime_obj = datetime.strptime(data.datetime, "%Y-%m-%d")
    return await prisma.spectra.create(
        data={
            "name": data.name,
            "content": json.dumps(filtered_content),
            "variety": data.variety,
            "datetime": datetime_obj,
            "local": data.local,
            "filter": data.filter,
            "graph": graph_str,
            "createdAt": datetime.now(timezone.utc),
        }
    )

async def get_spectra_by_id(id: int):
    return await prisma.spectra.find_unique(where={"id": id})

async def get_all_spectra():
    return await prisma.spectra.find_many()

async def get_variety_name_by_id(variety_id: int):
    """Busca o nome da variedade pelo ID"""
    try:
        variety = await prisma.variety.find_unique(where={"id": variety_id})
        return variety.name if variety else None
    except Exception:
        return None

async def create_spectrum_data(data: SpectrumData, filtered_x: list, image_str: str):
    return await prisma.spectrumdata.create(
        data={
            "dataset": data.dataset,
            "wavelengths": json.dumps(data.wavelengths),
            "X": json.dumps(filtered_x),
            "createdAt": datetime.now(),
            "updatedAt": datetime.now(),
            "image": json.dumps({"data": image_str}),
        }
    )

async def get_all_spectrum_data(skip: int, limit: int):
    return await prisma.spectrumdata.find_many(skip=skip, take=limit)

async def get_spectrum_data_by_id(id: int):
    return await prisma.spectrumdata.find_unique(where={"id": id})

async def create_target_data(data: TargetData):
    y_data = json.dumps(data.y) if isinstance(data.y, list) else json.dumps([data.y])
    return await prisma.targetdata.create(
        data={"attribute": data.attribute, "y": y_data}
    )

async def get_all_target_data(skip: int, limit: int):
    return await prisma.targetdata.find_many(skip=skip, take=limit)

async def get_target_data_by_id(id: int):
    return await prisma.targetdata.find_unique(where={"id": id})