from .services import apply_msc, apply_snv, apply_sg, plot_filtered_data, calculate_metrics, save_regression_comparison_plot, plot_test_predictions
from .models import SpectraData, ModelData, SpectrumResponse, SpectrumData, TargetData, TargetResponse
import json
from datetime import datetime, timezone
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import cross_val_predict
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi import Request, HTTPException,FastAPI
from fastapi.responses import JSONResponse
from prisma import Prisma
import sys

app = FastAPI()
prisma = Prisma()

@app.on_event("startup")
async def startup():
    await prisma.connect()

@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()

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

@app.middleware("http")
async def limit_payload_size(request: Request, call_next):
    max_payload_size = 10 * 1024 * 1024  # 10 MB
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > max_payload_size:
        return JSONResponse(
            {"detail": "Payload too large"},
            status_code=413,
        )
    return await call_next(request)

@app.post("/api/save-data")
async def save_data(data: SpectraData):
    # Aplicação do filtro
    filter_type = data.filter or "none"
    data_values = np.array(data.content, dtype=float)

    if filter_type == "MSC":
        filtered_data = apply_msc(data_values)
    elif filter_type == "SNV":
        filtered_data = apply_snv(data_values)
    elif filter_type == "SG":
        sg_params = data.model_dump().get("sgParams", {})
        filtered_data = apply_sg(data_values, sg_params)
    else:
        filtered_data = data.content

    # Se filtered_data não for um objeto JSON válido, converta para JSON
    if isinstance(filtered_data, np.ndarray):
        filtered_data = filtered_data.tolist()  # Converte o array NumPy para uma lista Python

    # Gerando o gráfico
    wl = np.linspace(350, 2500, data_values.shape[1])
    img_str = plot_filtered_data(filtered_data, wl)
    datetime_obj = datetime.strptime(data.datetime, "%Y-%m-%d")

    # Salvando no banco de dados usando Prisma
    saved_spectra = await prisma.spectra.create(
        data={
            "name": data.name,
            "content": json.dumps(filtered_data),  # Convertendo para JSON
            "variety": data.variety,
            "datetime": datetime_obj,
            "local": data.local,
            "filter": data.filter,
            "graph": img_str,  # Substitua pelo valor correto
            "createdAt": datetime.now(timezone.utc),
        }
    )

    return {"message": "Dados e gráfico salvos com sucesso!", "id": saved_spectra.id}

@app.post("/api/save-wavelengths/", response_model=SpectrumResponse)
async def save_wavelengths(data: SpectrumData):
    # Verificar e ajustar os tipos antes de salvar
    wavelengths = (
        json.dumps(data.wavelengths)
        if isinstance(data.wavelengths, list)
        else data.wavelengths
    )
    X = (
        json.dumps(data.X)
        if isinstance(data.X, list)
        else data.X
    )

    try:
        # Salva os dados no banco
        db_entry = await prisma.spectrumdata.create(
            data={
                "dataset": data.dataset,
                "wavelengths": wavelengths,
                "X": X,
            }
        )
        # print("Dados salvos no banco com sucesso:", db_entry)

        # Formatar a resposta corretamente
        response = SpectrumResponse(
            id=db_entry.id,
            dataset=db_entry.dataset,
            wavelengths=json.loads(db_entry.wavelengths)
            if isinstance(db_entry.wavelengths, str)
            else db_entry.wavelengths,
            X=json.loads(db_entry.X)
            if isinstance(db_entry.X, str)
            else db_entry.X,
            createdAt=db_entry.createdAt,
            updatedAt=db_entry.updatedAt,
        )
        # print("Resposta formatada com sucesso:", response)
        return response

    except Exception as e:
        print(f"Erro ao salvar no banco: {e}")
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")
    
@app.post("/api/save-targets/", response_model=TargetResponse)
async def save_targets(data: TargetData):
    # Garantir que 'y' seja sempre uma lista antes de serializar
    y_data = (
        json.dumps(data.y) if isinstance(data.y, list) else json.dumps([data.y])
    )

    try:
        # Salva os dados no banco com 'y' convertido para string JSON
        db_entry = await prisma.targetdata.create(
            data={
                "attribute": data.attribute,
                "y": y_data,  # Salvando 'y' como string JSON
            }
        )

        # Formatar a resposta corretamente, convertendo 'y' de volta para lista
        response = TargetResponse(
            id=db_entry.id,
            attribute=db_entry.attribute,
            y=json.loads(db_entry.y) if isinstance(db_entry.y, str) else db_entry.y,  # Convertendo de volta para lista
            createdAt=db_entry.createdAt,
            updatedAt=db_entry.updatedAt,
        )

        return response

    except Exception as e:
        print(f"Erro ao salvar no banco: {e}")
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

   
# @app.post("/api/train-model/")
# async def train_model_rfr(data: ModelData):
#     X_train, y_train = ...  # Carregar ou gerar os dados de treino aqui
#     X_test, y_test = ...  # Carregar ou gerar os dados de teste aqui
#     pipeline = make_pipeline(
#         StandardScaler(),
#         RandomForestRegressor(**data.hyperparameters)
#     )
#     pipeline.fit(X_train, y_train)

#     # Calcular as métricas
#     y_train_pred = pipeline.predict(X_train)
#     y_train_cv = cross_val_predict(pipeline, X_train, y_train, cv=5)
#     y_pred_val = pipeline.predict(X_test)

#     metrics = calculate_metrics(y_train, y_train_pred)

#     # Gerar gráficos e salvar no diretório
#     image_path_1 = f"static/images/{data.attribute}_regression_comparison_plot.png"
#     save_regression_comparison_plot(y_train, y_train_pred, y_train_cv, image_path_1)

#     image_path_2 = f"static/images/{data.attribute}_plot_test_predictions.png"
#     plot_test_predictions(y_test, y_pred_val, image_path_2)

#     # Criar um dicionário com os caminhos das imagens
#     images_paths = {
#         "regression_comparison_plot": image_path_1,
#         "test_predictions_plot": image_path_2
#     }

#     # Salvar o modelo e as métricas no banco de dados
#     db_entry = await prisma.predictivemodel.create(
#         data={
#             "attribute": data.attribute,
#             "X_features": json.dumps(data.X_features),
#             "hyperparameters": json.dumps(data.hyperparameters),
#             "metrics": json.dumps(metrics),
#             "image": json.dumps(images_paths)
#         }
#     )

#     return {"message": "Modelo treinado e salvo!", "metrics": metrics}
