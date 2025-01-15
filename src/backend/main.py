from prisma import Prisma
from fastapi import FastAPI
import numpy as np
from datetime import datetime
from .services import create_spectra, apply_msc, apply_snv, apply_sg, plot_filtered_data
from .models import SpectraData
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
prisma = Prisma()

# Configuração do CORS
origins = [
    "http://localhost:3000",  # URL do seu frontend (Next.js)
    "http://127.0.0.1:3000",  # URL alternativa
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/save-data")
async def save_data(data: SpectraData):
    # Conectando ao banco de dados
    await prisma.connect()
    users = await prisma.user.find_many()
    print(users)

    # Criando o objeto spectra (se necessário, utilizando a função create_spectra)
    spectra = create_spectra(data.dict())  # Se você precisar modificar os dados antes de salvar

    # Aplicação do filtro
    filter_type = data.filter or "none"
    data_values = np.array(data.content, dtype=float)

    if filter_type == "MSC":
        filtered_data = apply_msc(data_values)
    elif filter_type == "SNV":
        filtered_data = apply_snv(data_values)
    elif filter_type == "SG":
        sg_params = data.dict().get("sgParams", {})
        filtered_data = apply_sg(data_values, sg_params)

    # Gerando o gráfico
    wl = np.linspace(350, 2500, data_values.shape[1])
    img_str = plot_filtered_data(filtered_data, wl)
    
    datetime_obj = datetime.strptime(data.datetime, "%Y-%m-%d")

    # Salvando no banco de dados usando Prisma
    saved_spectra = await prisma.spectra.create(
        data={
            "name": data.name,
            "content": data.content,
            "variety": data.variety,
            "datetime": datetime_obj,
            "local": data.local,
            "filter": data.filter,
            "graph": "example_graph_string",  # Substitua pelo valor correto
            "createdAt": datetime.utcnow(),
        }
    )

    # Desconectando do Prisma
    await prisma.disconnect()

    return {"message": "Dados e gráfico salvos com sucesso!", "id": saved_spectra.id}
