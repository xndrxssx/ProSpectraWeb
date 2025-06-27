import os
import hid
import time
import json
import struct
import pickle
import logging
import numpy as np
from typing import List
from pathlib import Path
from prisma import Prisma
from sklearn.svm import SVR
from sklearn.decomposition import PCA
from typing import List
from sklearn.pipeline import make_pipeline
from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from datetime import datetime, timezone, timedelta
from fastapi.middleware.cors import CORSMiddleware
from sklearn.ensemble import RandomForestRegressor
from sklearn.cross_decomposition import PLSRegression
from sklearn.model_selection import cross_val_predict
from fastapi import File, HTTPException,FastAPI, Query, UploadFile, Body
from .services import apply_msc, apply_snv, apply_sg, plot_filtered_data, calculate_metrics, get_image_url, save_regression_comparison_plot, plot_test_predictions
from .models import SpectraData, ModelData, ModelResponse, SpectrumResponse, SpectrumData, TargetData, TargetResponse, XResponse, YResponse, ApplyModelRequest, SavePredictionRequest, PredictionResponse, RawSpectrumRequest

app = FastAPI()
prisma = Prisma()

# IDs do dispositivo HID
tellspec_vendor_id = None
tellspec_product_id = None

# === Constantes de protocolo (exemplo, ajuste conforme seu espectrômetro) ===
CMD_SCAN_GET_STATUS    = [0x02, 0x19]
CMD_FILE_LIST_SIZE     = [0x00, 0x2B]
CMD_FILE_LIST          = [0x00, 0x2C]
CMD_EEPROM_TEST        = [0x00, 0x01]          # Requires 0 input, returns 1 byte
CMD_TMP_TEST           = [0x01, 0x06]             # Requires 0 input, returns 1 byte
TELLSPEC_VENDOR_ID     = 0x0451  # 1105
TELLSPEC_PRODUCT_ID    = 0x4200  # 16896
TELLSPEC_MANUFACTURER  = "inno-spectra"

CMD_PERFORM_SCAN = (0x02, 0x18)
CMD_GET_STATUS = (0x04, 0x04)
CMD_FILE_GET_READSIZE = (0x00, 0x2D)
CMD_FILE_GET_DATA = (0x00, 0x2E)
NNO_FILE_SCAN_DATA = 4  # Verificar valor oficial conforme firmware

VENDOR_ID = 0x0451
PRODUCT_ID = 0x4200

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

MODELS_DIR = Path("static/models")
MODELS_DIR.mkdir(parents=True, exist_ok=True)
IMAGES_DIR = Path("static/images")
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
SPECTRA_DIR = Path("static/spectra")
SPECTRA_DIR.mkdir(parents=True, exist_ok=True)

# Configurando o logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.post("/api/save-wavelengths/")
async def save_wavelengths(data: SpectrumData):
    try:
        # Convertendo os dados para numpy
        X = np.array(data.X)

        # Aplicando filtro se houver um selecionado
        if data.filter == "MSC":
            filtered_data = apply_msc(X)
        elif data.filter == "SNV":
            filtered_data = apply_snv(X)
        elif data.filter == "SG":
            filtered_data = apply_sg(X, data.sgParams)
        else:
            filtered_data = X

        # Gerando imagem do gráfico processado
        image_str = plot_filtered_data(filtered_data, data.wavelengths)  # Imagem em Base64

        # Depuração: verificar o tipo antes de chamar json.loads()
        print("Tipo de data.wavelengths:", type(data.wavelengths))

        # Garantindo que os dados sejam serializáveis
        if isinstance(data.wavelengths, str):
            wavelengths_data = json.loads(data.wavelengths)
        else:
            wavelengths_data = data.wavelengths  # Já é uma lista ou dicionário, não precisa converter

        X_data = filtered_data.tolist()  # Convertendo NumPy para lista

        # Salvando no banco com imagem em Base64
        db_entry = await prisma.spectrumdata.create(
            data={
                "dataset": data.dataset,
                "wavelengths": json.dumps(wavelengths_data),  # Sempre armazenamos como string JSON
                "X": json.dumps(X_data),  # Sempre armazenamos como string JSON
                "createdAt": datetime.now(),
                "updatedAt": datetime.now(),
                "image": json.dumps({"data": image_str}),  # Passando a imagem como string Base64
            }
        )

        # Depuração: verificar o tipo antes de chamar json.loads()
        print("Tipo de db_entry.wavelengths:", type(db_entry.wavelengths))
        print("Tipo de db_entry.X:", type(db_entry.X))

        # Garantindo que `json.loads()` só seja chamado para strings
        # wavelengths_result = db_entry.wavelengths  # Já é uma lista, não precisa de json.loads()
        # X_result = db_entry.X  # Já é uma lista, não precisa de json.loads()

        # img = db_entry.image if isinstance(db_entry.image, str) else db_entry.image["data"]
        # print("Imagem gerada:", image_str[:30] + "...")  # Log para verificar

        return {"message": "Dados e gráfico salvos com sucesso!", "id": db_entry.id}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro: {str(e)}")

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

@app.post("/api/train-model-rfr/", response_model=ModelResponse)
async def train_model_rfr(data: ModelData):
    try:
        start_time = time.time()
        # Carregar ou gerar os dados de treino e teste
        X_train = np.array(data.X_train)
        y_train = np.array(data.y_train)
        X_test = np.array(data.X_test)
        y_test = np.array(data.y_test)
        logger.info(f"X_train shape: {X_train.shape}, y_train shape: {y_train.shape}")
        logger.info(f"X_test shape: {X_test.shape}, y_test shape: {y_test.shape}")

        # Criar o pipeline
        pipeline = make_pipeline(
            StandardScaler(),
            RandomForestRegressor(**data.hyperparameters)
        )
        pipeline.fit(X_train, y_train)

        # Calcular as métricas
        y_train_pred = pipeline.predict(X_train)
        y_train_cv = cross_val_predict(pipeline, X_train, y_train, cv=5)
        y_pred_val = pipeline.predict(X_test)

        metrics_train = calculate_metrics(y_train, y_train_pred)
        metrics_cv = calculate_metrics(y_train, y_train_cv)
        metrics_pred = calculate_metrics(y_test, y_pred_val)

        # Verificar se o diretório existe, senão, criar
        image_filename_1 = f"{data.attribute}_{data.model_name}_regression_comparison_plot.png"
        image_path_1 = IMAGES_DIR.resolve() / image_filename_1
        save_regression_comparison_plot(y_train, y_train_pred, y_train_cv, image_path_1)

        image_filename_2 = f"{data.attribute}_{data.model_name}_plot_test_predictions.png"
        image_path_2 = IMAGES_DIR.resolve() / image_filename_2
        plot_test_predictions(y_test, y_pred_val, image_path_2)

        # Agora, os caminhos das imagens são salvos no banco de dados, como antes
        images_paths = {
            "regression_comparison_plot": str(image_path_1),
            "test_predictions_plot": str(image_path_2)
        }
        
        execution_time = time.time() - start_time  # Calcule o tempo de execução
        
        metrics = {
            "train": metrics_train,
            "cv": metrics_cv,
            "test": metrics_pred,
            "time": {"execution_time": execution_time}  # Correto: mantém a estrutura Dict[str, float]
        }

        
        # Salvar o modelo em um arquivo
        model_filename = f"{data.attribute}_{data.model_name}_model.pkl"
        model_path = MODELS_DIR / model_filename
        with open(model_path, "wb") as model_file:
            pickle.dump(pipeline, model_file)
        
        # Salvar o modelo e as métricas no banco de dados
        db_entry = await prisma.predictivemodel.create(
            data={
                "model_name": data.model_name,
                "attribute": data.attribute,
                "variety": data.variety,
                "metrics": json.dumps(metrics) if not isinstance(metrics, str) else metrics,
                "graph": json.dumps(images_paths) if not isinstance(images_paths, str) else images_paths,
                "hyperparameters": json.dumps(data.hyperparameters) if not isinstance(data.hyperparameters, str) else data.hyperparameters,
                "model": str(model_path)  # Caminho do modelo salvo
            }
        )
        
        response = ModelResponse(
            id=db_entry.id,
            model_name=db_entry.model_name,
            attribute=db_entry.attribute,
            variety=db_entry.variety,
            hyperparameters=json.loads(db_entry.hyperparameters) if isinstance(db_entry.hyperparameters, str) else db_entry.hyperparameters,
            metrics=json.loads(db_entry.metrics) if isinstance(db_entry.metrics, str) else db_entry.metrics,
            model=db_entry.model,
            graph=json.loads(db_entry.graph) if isinstance(db_entry.graph, str) else db_entry.graph,
            createdAt=db_entry.createdAt,
            updatedAt=db_entry.updatedAt,
        )

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao treinar o modelo: {str(e)}")

@app.post("/api/train-model-svr/", response_model=ModelResponse)
async def train_model_svr(data: ModelData):
    try:
        start_time = time.time()
        # Carregar ou gerar os dados de treino e teste
        X_train = np.array(data.X_train)
        y_train = np.array(data.y_train)
        X_test = np.array(data.X_test)
        y_test = np.array(data.y_test)
        logger.info(f"X_train shape: {X_train.shape}, y_train shape: {y_train.shape}")
        logger.info(f"X_test shape: {X_test.shape}, y_test shape: {y_test.shape}")

        # Criar o pipeline
        pipeline = make_pipeline(
            StandardScaler(),
            SVR(**data.hyperparameters)  # Alterado para SVR
        )
        pipeline.fit(X_train, y_train)

        # Calcular as métricas
        y_train_pred = pipeline.predict(X_train)
        y_train_cv = cross_val_predict(pipeline, X_train, y_train, cv=5)
        y_pred_val = pipeline.predict(X_test)

        metrics_train = calculate_metrics(y_train, y_train_pred)
        metrics_cv = calculate_metrics(y_train, y_train_cv)
        metrics_pred = calculate_metrics(y_test, y_pred_val)

        # Gerar e salvar os gráficos (como antes)
        image_filename_1 = f"{data.attribute}_{data.model_name}_regression_comparison_plot.png"
        image_path_1 = IMAGES_DIR.resolve() / image_filename_1
        save_regression_comparison_plot(y_train, y_train_pred, y_train_cv, image_path_1)

        image_filename_2 = f"{data.attribute}_{data.model_name}_plot_test_predictions.png"
        image_path_2 = IMAGES_DIR.resolve() / image_filename_2
        plot_test_predictions(y_test, y_pred_val, image_path_2)

        # Caminhos dos gráficos
        images_paths = {
            "regression_comparison_plot": str(image_path_1),
            "test_predictions_plot": str(image_path_2)
        }

        execution_time = time.time() - start_time  # Calcule o tempo de execução

        metrics = {
            "train": metrics_train,
            "cv": metrics_cv,
            "test": metrics_pred,
            "time": {"execution_time": execution_time}
        }

        # Salvar o modelo em um arquivo
        model_filename = f"{data.attribute}_{data.model_name}_model.pkl"
        model_path = MODELS_DIR / model_filename
        with open(model_path, "wb") as model_file:
            pickle.dump(pipeline, model_file)

        # Salvar o modelo e as métricas no banco de dados
        db_entry = await prisma.predictivemodel.create(
            data={
                "model_name": data.model_name,
                "attribute": data.attribute,
                "variety": data.variety,
                "metrics": json.dumps(metrics),
                "graph": json.dumps(images_paths),
                "hyperparameters": json.dumps(data.hyperparameters),
                "model": str(model_path)
            }
        )

        response = ModelResponse(
            id=db_entry.id,
            model_name=db_entry.model_name,
            attribute=db_entry.attribute,
            variety=db_entry.variety,
            hyperparameters=db_entry.hyperparameters,  # Remova json.loads()
            metrics=db_entry.metrics,  # Remova json.loads()
            model=db_entry.model,
            graph=db_entry.graph,  # Remova json.loads()
            createdAt=db_entry.createdAt,
            updatedAt=db_entry.updatedAt,
        )


        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao treinar o modelo: {str(e)}")

@app.post("/api/train-model-plsr/", response_model=ModelResponse)
async def train_model_plsr(data: ModelData):
    try:
        start_time = time.time()
        # Carregar ou gerar os dados de treino e teste
        X_train = np.array(data.X_train)
        y_train = np.array(data.y_train)
        X_test = np.array(data.X_test)
        y_test = np.array(data.y_test)
        logger.info(f"X_train shape: {X_train.shape}, y_train shape: {y_train.shape}")
        logger.info(f"X_test shape: {X_test.shape}, y_test shape: {y_test.shape}")

        # Criar o pipeline
        pipeline = make_pipeline(
            StandardScaler(),
            PLSRegression(**data.hyperparameters)  
        )
        pipeline.fit(X_train, y_train)

        # Calcular as métricas
        y_train_pred = pipeline.predict(X_train)
        y_train_cv = cross_val_predict(pipeline, X_train, y_train, cv=5)
        y_pred_val = pipeline.predict(X_test)

        metrics_train = calculate_metrics(y_train, y_train_pred)
        metrics_cv = calculate_metrics(y_train, y_train_cv)
        metrics_pred = calculate_metrics(y_test, y_pred_val)

        # Gerar e salvar os gráficos (como antes)
        image_filename_1 = f"{data.attribute}_{data.model_name}_regression_comparison_plot.png"
        image_path_1 = IMAGES_DIR.resolve() / image_filename_1
        save_regression_comparison_plot(y_train, y_train_pred, y_train_cv, image_path_1)

        image_filename_2 = f"{data.attribute}_{data.model_name}_plot_test_predictions.png"
        image_path_2 = IMAGES_DIR.resolve() / image_filename_2
        plot_test_predictions(y_test, y_pred_val, image_path_2)

        # Caminhos dos gráficos
        images_paths = {
            "regression_comparison_plot": str(image_path_1),
            "test_predictions_plot": str(image_path_2)
        }

        execution_time = time.time() - start_time  # Calcule o tempo de execução

        metrics = {
            "train": metrics_train,
            "cv": metrics_cv,
            "test": metrics_pred,
            "time": {"execution_time": execution_time}
        }

        # Salvar o modelo em um arquivo
        model_filename = f"{data.attribute}_{data.model_name}_model.pkl"
        model_path = MODELS_DIR / model_filename
        with open(model_path, "wb") as model_file:
            pickle.dump(pipeline, model_file)

        # Salvar o modelo e as métricas no banco de dados
        db_entry = await prisma.predictivemodel.create(
            data={
                "model_name": data.model_name,
                "attribute": data.attribute,
                "variety": data.variety,
                "metrics": json.dumps(metrics),
                "graph": json.dumps(images_paths),
                "hyperparameters": json.dumps(data.hyperparameters),
                "model": str(model_path)
            }
        )

        response = ModelResponse(
            id=db_entry.id,
            model_name=db_entry.model_name,
            attribute=db_entry.attribute,
            variety=db_entry.variety,
            hyperparameters=db_entry.hyperparameters,  # Remova json.loads()
            metrics=db_entry.metrics,  # Remova json.loads()
            model=db_entry.model,
            graph=db_entry.graph,  # Remova json.loads()
            createdAt=db_entry.createdAt,
            updatedAt=db_entry.updatedAt,
        )


        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao treinar o modelo: {str(e)}")

@app.post("/api/train-model-pcr/", response_model=ModelResponse)
async def train_model_pcr(data: ModelData):
    try:
        start_time = time.time()
        # Carregar ou gerar os dados de treino e teste
        X_train = np.array(data.X_train)
        y_train = np.array(data.y_train)
        X_test = np.array(data.X_test)
        y_test = np.array(data.y_test)
        logger.info(f"X_train shape: {X_train.shape}, y_train shape: {y_train.shape}")
        logger.info(f"X_test shape: {X_test.shape}, y_test shape: {y_test.shape}")

        # Criar o pipeline
        pipeline = make_pipeline(
            StandardScaler(),
            PCA(**data.hyperparameters),
            LinearRegression()
        )
        pipeline.fit(X_train, y_train)

        # Calcular as métricas
        y_train_pred = pipeline.predict(X_train)
        y_train_cv = cross_val_predict(pipeline, X_train, y_train, cv=5)
        y_pred_val = pipeline.predict(X_test)

        metrics_train = calculate_metrics(y_train, y_train_pred)
        metrics_cv = calculate_metrics(y_train, y_train_cv)
        metrics_pred = calculate_metrics(y_test, y_pred_val)

        # Gerar e salvar os gráficos (como antes)
        image_filename_1 = f"{data.attribute}_{data.model_name}_regression_comparison_plot.png"
        image_path_1 = IMAGES_DIR.resolve() / image_filename_1
        save_regression_comparison_plot(y_train, y_train_pred, y_train_cv, image_path_1)

        image_filename_2 = f"{data.attribute}_{data.model_name}_plot_test_predictions.png"
        image_path_2 = IMAGES_DIR.resolve() / image_filename_2
        plot_test_predictions(y_test, y_pred_val, image_path_2)

        # Caminhos dos gráficos
        images_paths = {
            "regression_comparison_plot": str(image_path_1),
            "test_predictions_plot": str(image_path_2)
        }

        execution_time = time.time() - start_time  # Calcule o tempo de execução

        metrics = {
            "train": metrics_train,
            "cv": metrics_cv,
            "test": metrics_pred,
            "time": {"execution_time": execution_time}
        }

        # Salvar o modelo em um arquivo
        model_filename = f"{data.attribute}_{data.model_name}_model.pkl"
        model_path = MODELS_DIR / model_filename
        with open(model_path, "wb") as model_file:
            pickle.dump(pipeline, model_file)

        # Salvar o modelo e as métricas no banco de dados
        db_entry = await prisma.predictivemodel.create(
            data={
                "model_name": data.model_name,
                "attribute": data.attribute,
                "variety": data.variety,
                "metrics": json.dumps(metrics),
                "graph": json.dumps(images_paths),
                "hyperparameters": json.dumps(data.hyperparameters),
                "model": str(model_path)
            }
        )

        response = ModelResponse(
            id=db_entry.id,
            model_name=db_entry.model_name,
            attribute=db_entry.attribute,
            variety=db_entry.variety,
            hyperparameters=db_entry.hyperparameters,  # Remova json.loads()
            metrics=db_entry.metrics,  # Remova json.loads()
            model=db_entry.model,
            graph=db_entry.graph,  # Remova json.loads()
            createdAt=db_entry.createdAt,
            updatedAt=db_entry.updatedAt,
        )

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao treinar o modelo: {str(e)}")
    
@app.post("/api/train-model-mlpr/", response_model=ModelResponse)
async def train_model_svr(data: ModelData):
    try:
        start_time = time.time()
        # Carregar ou gerar os dados de treino e teste
        X_train = np.array(data.X_train)
        y_train = np.array(data.y_train)
        X_test = np.array(data.X_test)
        y_test = np.array(data.y_test)
        logger.info(f"X_train shape: {X_train.shape}, y_train shape: {y_train.shape}")
        logger.info(f"X_test shape: {X_test.shape}, y_test shape: {y_test.shape}")
        
        hyperparams = data.hyperparameters.copy()
        for key, value in hyperparams.items():
            if value == "false":
                hyperparams[key] = False
            elif value == "true":
                hyperparams[key] = True
            elif isinstance(value, str) and value.startswith("[") and value.endswith("]"):
                try:
                    hyperparams[key] = eval(value)  # Converte "[100]" para [100]
                except:
                    pass  # Evita erro caso eval não funcione corretamente

        # Criar o pipeline
        pipeline = make_pipeline(
            StandardScaler(),
            MLPRegressor(**hyperparams)  
        )
        pipeline.fit(X_train, y_train)

        # Calcular as métricas
        y_train_pred = pipeline.predict(X_train)
        y_train_cv = cross_val_predict(pipeline, X_train, y_train, cv=5)
        y_pred_val = pipeline.predict(X_test)

        metrics_train = calculate_metrics(y_train, y_train_pred)
        metrics_cv = calculate_metrics(y_train, y_train_cv)
        metrics_pred = calculate_metrics(y_test, y_pred_val)

        # Gerar e salvar os gráficos (como antes)
        image_filename_1 = f"{data.attribute}_{data.model_name}_regression_comparison_plot.png"
        image_path_1 = IMAGES_DIR.resolve() / image_filename_1
        save_regression_comparison_plot(y_train, y_train_pred, y_train_cv, image_path_1)

        image_filename_2 = f"{data.attribute}_{data.model_name}_plot_test_predictions.png"
        image_path_2 = IMAGES_DIR.resolve() / image_filename_2
        plot_test_predictions(y_test, y_pred_val, image_path_2)

        # Caminhos dos gráficos
        images_paths = {
            "regression_comparison_plot": str(image_path_1),
            "test_predictions_plot": str(image_path_2)
        }

        execution_time = time.time() - start_time  # Calcule o tempo de execução

        metrics = {
            "train": metrics_train,
            "cv": metrics_cv,
            "test": metrics_pred,
            "time": {"execution_time": execution_time}
        }

        # Salvar o modelo em um arquivo
        model_filename = f"{data.attribute}_{data.model_name}_model.pkl"
        model_path = MODELS_DIR / model_filename
        with open(model_path, "wb") as model_file:
            pickle.dump(pipeline, model_file)

        # Salvar o modelo e as métricas no banco de dados
        db_entry = await prisma.predictivemodel.create(
            data={
                "model_name": data.model_name,
                "attribute": data.attribute,
                "variety": data.variety,
                "metrics": json.dumps(metrics),
                "graph": json.dumps(images_paths),
                "hyperparameters": json.dumps(hyperparams),
                "model": str(model_path)
            }
        )

        response = ModelResponse(
            id=db_entry.id,
            model_name=db_entry.model_name,
            attribute=db_entry.attribute,
            variety=db_entry.variety,
            hyperparameters=db_entry.hyperparameters,  # Remova json.loads()
            metrics=db_entry.metrics,  # Remova json.loads()
            model=db_entry.model,
            graph=db_entry.graph,  # Remova json.loads()
            createdAt=db_entry.createdAt,
            updatedAt=db_entry.updatedAt,
        )


        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao treinar o modelo: {str(e)}")

@app.post("/api/upload-data/")
async def upload_data(file: UploadFile = File(...)):
    try:
        # Processar o arquivo em partes
        contents = await file.read()
        data = json.loads(contents)
        # Aqui você pode salvar ou processar os dados
        return {"message": "Dados recebidos com sucesso!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao processar os dados: {str(e)}")

@app.get("/api/get-wavelengths/", response_model=List[SpectrumResponse])
async def get_wavelengths(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1)):
    """Retorna todos os dados espectrais armazenados no banco, sem o campo de imagem."""
    try:
        db_entries = await prisma.spectrumdata.find_many(skip=skip, take=limit)
        return [
            {
                **SpectrumResponse(
                    id=entry.id,
                    dataset=entry.dataset,
                    wavelengths=json.loads(entry.wavelengths) if isinstance(entry.wavelengths, str) else entry.wavelengths,
                    X=json.loads(entry.X) if isinstance(entry.X, str) else entry.X,
                    createdAt=entry.createdAt,
                    updatedAt=entry.updatedAt,
                    image=json.loads(entry.image) if isinstance(entry.image, str) else entry.image or {}  # Garante um dicionário vazio
                ).dict()
            }
            for entry in db_entries
        ]
    except Exception as e:
        print(f"Erro ao buscar dados do banco: {e}")
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

@app.get("/api/get-targets/", response_model=List[TargetResponse])
async def get_targets(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1)):
    """Retorna todos os alvos armazenados no banco."""
    try:
        db_entries = await prisma.targetdata.find_many(skip=skip, take=limit)
        return [
            TargetResponse(
                id=entry.id,
                attribute=entry.attribute,
                y=json.loads(entry.y) if isinstance(entry.y, str) else entry.y,
                createdAt=entry.createdAt,
                updatedAt=entry.updatedAt,
            )
            for entry in db_entries
        ]
    except Exception as e:
        print(f"Erro ao buscar dados do banco: {e}")
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

@app.get("/api/get-wavelengths/{id}", response_model=XResponse)
async def get_wavelength_by_id(id: int):
    if id <= 0:
        raise HTTPException(status_code=400, detail="ID deve ser maior que 0")

    try:
        print(f"Buscando dado espectral com ID: {id}")
        entry = await prisma.spectrumdata.find_unique(where={"id": id})

        if not entry:
            raise HTTPException(status_code=404, detail="Dado espectral não encontrado")

        # Garantir que entry.X seja carregado corretamente
        X_data = json.loads(entry.X) if isinstance(entry.X, str) else entry.X

        return XResponse(X=X_data)

    except Exception as e:
        print(f"Erro ao buscar dado espectral: {e}")
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

@app.get("/api/get-targets/{id}", response_model=YResponse)
async def get_target_by_id(id: int):
    if id <= 0:
        raise HTTPException(status_code=400, detail="ID deve ser maior que 0")

    try:
        print(f"Buscando alvo com ID: {id}")
        entry = await prisma.targetdata.find_unique(where={"id": id})
        
        if not entry:
            raise HTTPException(status_code=404, detail="Alvo não encontrado")
        
        # Retorna apenas o campo y
        return YResponse(
            y=json.loads(entry.y) if isinstance(entry.y, str) else entry.y,
        )
    
    except Exception as e:
        print(f"Erro ao buscar alvo: {e}")
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")
    
@app.get("/api/list-models/")
async def list_models():
    try:
        model_files = [f.name for f in MODELS_DIR.iterdir() if f.is_file()]
        return {"models": model_files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao listar modelos: {str(e)}")

@app.post("/api/apply-model/")
async def apply_model(request: ApplyModelRequest):
    try:
        # Carregar o modelo
        model_path = MODELS_DIR / request.model_name
        if not model_path.exists():
            raise HTTPException(status_code=404, detail="Modelo não encontrado")

        with open(model_path, "rb") as model_file:
            model = pickle.load(model_file)

        # Buscar os dados espectrais no banco
        print(f"Received spectral_data_id: {request.spectral_data_id}")  # Log do ID
        spectral_data = await prisma.spectra.find_unique(where={"id": request.spectral_data_id})  # Alterar para 'spectra'
        if not spectral_data:
            raise HTTPException(status_code=404, detail="Dados espectrais não encontrados.")

        # Converter os dados para array NumPy
        if isinstance(spectral_data.content, str):
            X = np.array(json.loads(spectral_data.content))  # Se for uma string JSON
        elif isinstance(spectral_data.content, (list, np.ndarray)):
            X = np.array(spectral_data.content)  # Se for uma lista ou array
        else:
            raise HTTPException(status_code=400, detail="Formato inválido para spectral_data.content")

        # Fazer a predição
        prediction = model.predict(X)  # Pode ser um array ou um valor único

        # Se for um array de um único valor, converter para float
        if isinstance(prediction, (list, np.ndarray)) and len(prediction) == 1:
            prediction = float(prediction[0])

        return {"prediction": prediction}  # Retorna apenas um float
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao aplicar o modelo: {str(e)}")

@app.post("/api/save-prediction/")
async def save_prediction(request: SavePredictionRequest):
    print(f"Recebido: {request}")

    # Verificar se spectral_data_id é válido
    if not request.spectral_data_id:
        raise HTTPException(status_code=400, detail="spectral_data_id é obrigatório.")

    # Buscar os dados espectrais no banco
    spectral_data = await prisma.spectra.find_unique(where={"id": request.spectral_data_id})
    if not spectral_data:
        raise HTTPException(status_code=404, detail="Dados espectrais não encontrados.")

    # Salvar a predição no banco
    saved_prediction = await prisma.predictions.create(
        data={
            "name": request.name,
            "model_name": request.model_name,
            "spectral_data_id": request.spectral_data_id,
            "prediction": request.prediction,  # Corrigido para Float diretamente
            "createdAt": datetime.now(timezone.utc),
            "attribute": request.str
        }
    )

    return {"message": "Predição salva com sucesso!", "id": saved_prediction.id}

@app.get("/api/get-spectral-data/")
async def list_spectral_data():
    try:
        spectral_data_list = await prisma.spectra.find_many()
        return [
            {
                "id": data.id,
                "name": data.name,
                "variety": data.variety,
                "datetime": data.datetime.isoformat(),
                "local": data.local,
                "filter": data.filter,
                "graph": data.graph,
            }
            for data in spectral_data_list
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao listar dados espectrais: {str(e)}")

@app.get("/api/get-spectral-data/{id}")
async def get_spectral_data(id: int):
    try:
        spectral_data = await prisma.spectra.find_unique(where={"id": id})
        if not spectral_data:
            raise HTTPException(status_code=404, detail="Dado espectral não encontrado")
        return {
            "id": spectral_data.id,
            "name": spectral_data.name,
            "variety": spectral_data.variety,
            "content": spectral_data.content,
            "datetime": spectral_data.datetime.isoformat(),
            "local": spectral_data.local,
            "filter": spectral_data.filter,
            "graph": spectral_data.graph,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados espectrais: {str(e)}")

@app.get("/api/predictions/", response_model=list[PredictionResponse])
async def list_predictions():
    try:
        predictions = await prisma.predictions.find_many()
        return [
            {
                "id": data.id,
                "name": data.name,  # Campo retornado pelo banco de dados
                "model_name": data.model_name,
                "spectral_data_id": data.spectral_data_id,
                "prediction": data.prediction,
                "createdAt": data.createdAt,
            }
            for data in predictions
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao listar dados: {str(e)}")

@app.get("/api/dashboard/")
async def get_dashboard_data():
    try:
        now = datetime.now(timezone.utc)
        thirty_days_ago = now - timedelta(days=30)
        sixty_days_ago = now - timedelta(days=60)
        
        # --- BUSCA DE DADOS PRIMÁRIOS ---
        all_models = await prisma.predictivemodel.find_many(order={"createdAt": "asc"})
        all_predictions = await prisma.predictions.find_many(
            order={"createdAt": "asc"}
        )

        # --- PROCESSAMENTO DOS DADOS ---
        models_in_last_month = [m for m in all_models if m.createdAt > thirty_days_ago]
        predictions_in_last_month = [p for p in all_predictions if p.createdAt > thirty_days_ago]
        
        # --- LÓGICA PARA VISÃO DO ADMIN ---
        admin_view = {
            "stats": {
                "trained_models": {"value": "0", "description": "Nenhum modelo treinado", "trend": "+0 no último mês"},
                "average_accuracy": {"value": "N/A", "description": "Sem dados de modelo", "trend": ""},
                "average_execution_time": {"value": "N/A", "description": "Sem dados de modelo", "trend": ""}
            },
            "charts": {"model_performance": [], "execution_time": []},
            "tables": {"model_metrics": []}
        }
        if all_models:
            test_metrics = [m.metrics.get('test') for m in all_models if m.metrics and m.metrics.get('test')]
            
            # 1. Stats Cards
            total_models_trained = len(all_models)
            last_trained_model = all_models[-1]
            
            r2_scores = [m.get('R²', 0) for m in test_metrics if m.get('R²')]
            avg_r2 = np.mean(r2_scores) if r2_scores else 0
            best_r2_model_data = max(all_models, key=lambda m: m.metrics.get('test', {}).get('R²', -1))
            
            exec_times = [m.metrics.get('time', {}).get('execution_time') for m in all_models if m.metrics.get('time', {}).get('execution_time') is not None]
            avg_exec_time = np.mean(exec_times) if exec_times else 0
            fastest_model_data = min(all_models, key=lambda m: m.metrics.get('time', {}).get('execution_time', float('inf')))

            models_current_period = [m for m in all_models if m.createdAt> thirty_days_ago]
            models_previous_period = [m for m in all_models if sixty_days_ago< m.createdAt]

            r2_current = [m.metrics.get('test', {}).get('R²', 0) for m in models_current_period]
            avg_r2_current = np.mean(r2_current) if r2_current else 0

            r2_previous = [m.metrics.get('test', {}).get('R²', 0) for m in models_previous_period]
            avg_r2_previous = np.mean(r2_previous) if r2_previous else 0

            trend_str_r2 = ""
            if avg_r2_current > 0 and avg_r2_previous>0:
                difference = ((avg_r2_current-avg_r2_previous) /avg_r2_previous)
                trend_str_r2=f"{'+' if difference>0 else ''}{difference:.1%}"
            
            time_current = [m.metrics.get('execution_time', 0) for m in models_current_period]
            avg_time_current = np.mean(time_current) if time_current else 0

            time_previous = [m.metrics.get('execution_time', 0) for m in models_previous_period]
            avg_time_previous = np.mean(time_previous) if time_previous else 0

            trend_str_time = ""
            if avg_time_current > 0 and avg_time_previous>0:
                difference = ((avg_time_current-avg_time_previous) /avg_time_previous)
                trend_str_time=f"{'+' if difference>0 else ''}{difference:.1%}"

            admin_view["stats"] = {
                "trained_models": {
                    "value": str(total_models_trained),
                    "description": f"Último: {last_trained_model.model_name} ({last_trained_model.createdAt.strftime('%d/%m/%Y')})",
                    "trend": f"+{len(models_in_last_month)} no último mês"
                },
                "average_accuracy": {
                    "value": f"{avg_r2:.1%}",
                    "description": f"Melhor: {best_r2_model_data.model_name} ({best_r2_model_data.metrics.get('test', {}).get('R²', 0):.2f})",
                    "trend": f"{trend_str_r2} nos últimos 30 dias" if trend_str_r2 else ""
                },
                "average_execution_time": {
                    "value": f"{avg_exec_time:.2f}s",
                    "description": f"Mais rápido: {fastest_model_data.model_name} ({fastest_model_data.metrics.get('time', {}).get('execution_time', 0):.2f}s)",
                    "trend": f"{trend_str_time} nos últimos 30 dias" if trend_str_time else "" 
                }
            }
            
            # 2. Dados para Gráficos e Tabelas
            admin_view["charts"] = {
                "model_performance": [{
                    "model": f"{m.model_name} ({m.attribute})",
                    "r2": m.metrics.get('test', {}).get('R²', 0),
                    "mae": m.metrics.get('test', {}).get('MAE', 0),
                    "rmse": m.metrics.get('test', {}).get('RMSE', 0),
                } for m in all_models],
                "execution_time": [{
                    "model": f"{m.model_name} ({m.attribute})",
                    "time": m.metrics.get('time', {}).get('execution_time', 0)
                } for m in all_models]
            }
            admin_view["tables"] = {
                "model_metrics": [{
                    "model": m.model_name,
                    "attribute": m.attribute,
                    "train": m.metrics.get('train', {}),
                    "validation": m.metrics.get('cv', {}),
                    "test": m.metrics.get('test', {})
                } for m in all_models]
            }

        # --- LÓGICA PARA VISÃO DO PRODUTOR ---
        producer_view = {
            "stats": {
                "total_predictions": {"value": "0", "description": "Nenhuma predição ainda", "trend": "+0 no último mês"},
                "average_precision": {"value": "N/A", "description": "Aguardando predições", "trend": ""},
                "average_error": {"value": "N/A", "description": "Aguardando predições", "trend": ""}
            },
            "tables": {
                "prediction_history": []
            },
            "charts": {
                "prediction_trend": []
            }
        }
        if all_predictions:
            # 1. Stats Cards
            predictions_in_last_month = [p for p in all_predictions if p.createdAt > thirty_days_ago]
            total_predictions = len(all_predictions)
            last_prediction = all_predictions[-1]

            # Usando métricas dos modelos como proxy para precisão e erro
            avg_precision_proxy = np.mean([m.metrics.get('test', {}).get('R²', 0) for m in all_models]) if all_models else 0
            avg_error_proxy = np.mean([m.metrics.get('test', {}).get('MAE', 0) for m in all_models]) if all_models else 0
            best_precision_model_proxy = max(all_models, key=lambda m: m.metrics.get('test', {}).get('R²', -1)) if all_models else None

            r2_current = [m.metrics.get('test', {}).get('R²', 0) for m in models_current_period]
            avg_r2_current = np.mean(r2_current) if r2_current else 0

            r2_previous = [m.metrics.get('test', {}).get('R²', 0) for m in models_previous_period]
            avg_r2_previous = np.mean(r2_previous) if r2_previous else 0

            trend_str_r2 = ""
            if avg_r2_current > 0 and avg_r2_previous>0:
                difference = ((avg_r2_current-avg_r2_previous) /avg_r2_previous)
                trend_str_r2=f"{'+' if difference>0 else ''}{difference:.1%}"
            
            mae_current = [m.metrics.get('test', {}).get('MAE', 0) for m in models_current_period]
            avg_mae_current = np.mean(mae_current) if mae_current else 0

            mae_previous = [m.metrics.get('test', {}).get('MAE', 0) for m in models_previous_period]
            avg_mae_previous = np.mean(mae_previous) if mae_previous else 0

            lowest_error_model_proxy = min(all_models, key=lambda m: m.metrics.get('test', {}).get('MAE', float('inf')), default=None)

            trend_str_mae = ""
            if avg_mae_current > 0 and avg_mae_previous > 0:
                difference_mae = ((avg_mae_current - avg_mae_previous) / avg_mae_previous)
                trend_str_mae = f"{'+' if difference_mae > 0 else ''}{difference_mae:.1%}"

            producer_view["stats"] = {
                "total_predictions": {
                    "value": str(total_predictions),
                    "description": f"Última: {last_prediction.prediction:.2f} ({last_prediction.createdAt.strftime('%d/%m/%y %H:%M')})",
                    "trend": f"+{len(predictions_in_last_month)} no último mês"
                },
                "average_precision": {
                    "value": f"{avg_precision_proxy:.1%}",
                    "description": (
                        f"Melhor modelo: {best_precision_model_proxy.model_name} ({best_precision_model_proxy.metrics.get('test', {}).get('R²', 0):.2f})" 
                        if best_precision_model_proxy 
                        else "Melhor modelo: N/A"
                    ),
                    "trend": f"{trend_str_r2} nos últimos 30 dias" if trend_str_r2 else ""
                },
                "average_error": {
                    "value": f"{avg_error_proxy:.2f}",
                    "description": (
                        f"Menor erro: {lowest_error_model_proxy.model_name} ({lowest_error_model_proxy.metrics.get('test', {}).get('MAE', 0):.2f})"
                        if lowest_error_model_proxy
                        else "Menor erro: N/A"
                    ),
                    "trend": f"{trend_str_mae} desde o último mês" if trend_str_mae else ""
                }
            }

            # 2. Dados para Tabelas e Gráficos
            producer_view["tables"] = {
                "prediction_history": [{
                    "id": p.id,
                    "name": p.name,
                    "model": p.model_name,
                    "value": p.prediction,
                    "timestamp": p.createdAt.isoformat(),
                } for p in reversed(all_predictions[-10:])] # 10 mais recentes
            }

            models_metrics_map = {m.model_name: m.metrics.get('test', {}) for m in all_models}

            predictions_by_day = {}
            for p in all_predictions:
                date_str = p.createdAt.strftime('%Y-%m-%d')
                if date_str not in predictions_by_day:
                    predictions_by_day[date_str] = []
                predictions_by_day[date_str].append(p)

            prediction_trend_data = []
            for date, preds in sorted(predictions_by_day.items()):
                # Calcula a precisão média (R²) para as predições daquele dia
                daily_accuracies = [models_metrics_map.get(p.model_name, {}).get('R²', 0) for p in preds]
                avg_daily_accuracy = np.mean(daily_accuracies) if daily_accuracies else 0
                
                prediction_trend_data.append({
                    "date": date,
                    "predictions": len(preds),
                    "r2": avg_daily_accuracy * 100 # Enviando como porcentagem (ex: 92.5) para o gráfico
                })

            producer_view["charts"]["prediction_trend"] = prediction_trend_data

            predictions_by_day = {}
            for p in all_predictions:
                date_str = p.createdAt.strftime('%Y-%m-%d')
                if date_str not in predictions_by_day:
                    predictions_by_day[date_str] = []
                predictions_by_day[date_str].append(p)

            prediction_trend_data = []
            for date, preds in sorted(predictions_by_day.items()):
                # Calcula a precisão média (R²) para as predições daquele dia
                daily_accuracies = [models_metrics_map.get(p.model_name, {}).get('R²', 0) for p in preds]
                avg_daily_accuracy = np.mean(daily_accuracies) if daily_accuracies else 0
                
                prediction_trend_data.append({
                    "date": date,
                    "predictions": len(preds),
                    "r2": avg_daily_accuracy * 100 # Enviando como porcentagem (ex: 92.5)
                })
        
        # --- DADOS COMUNS (Ex: Visualização de espectros) ---
        spectra_list_metadata = await prisma.spectra.find_many()
        spectrum_data_list_metadata = await prisma.spectrumdata.find_many()
        
        common_data = {
            "predicted_spectra_options": [{"id": s.id, "name": f"{s.name} ({s.variety})"} for s in spectra_list_metadata],
            "original_spectra_options": [{"id": s.id, "name": s.dataset} for s in spectrum_data_list_metadata]
        }
        
        return {
            "admin_view": admin_view,
            "producer_view": producer_view,
            "common_data": common_data
        }

    except Exception as e:
        # Em produção, use um logger mais robusto
        print(f"Erro inesperado no dashboard: {str(e)}")
        # Para depuração, o traceback é útil
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Erro interno ao carregar dashboard: {str(e)}")

@app.get("/api/spectra/{spectrum_id}")
async def get_predicted_spectrum_image(spectrum_id: int):
    spectrum = await prisma.spectra.find_unique(where={"id": spectrum_id}, select={"id": True, "graph": True})
    if not spectrum or not spectrum.graph:
        raise HTTPException(status_code=404, detail="Espectro predito não encontrado.")
    
    image_url = get_image_url(
        unique_id=str(spectrum.id),
        db_data=spectrum.graph,
        prefix="predicted"
    )
    if not image_url:
        raise HTTPException(status_code=500, detail="Erro ao processar imagem do espectro predito.")
    return {"image_url": image_url}


@app.get("/api/spectrum-data/{spectrum_data_id}")
async def get_original_spectrum_image(spectrum_data_id: int):
    spectrum_data = await prisma.spectrumdata.find_unique(where={"id": spectrum_data_id}, select={"id": True, "image": True})
    if not spectrum_data or not spectrum_data.image:
        raise HTTPException(status_code=404, detail="Espectro original não encontrado.")

    image_url = get_image_url(
        unique_id=str(spectrum_data.id),
        db_data=spectrum_data.image,
        prefix="original"
    )
    if not image_url:
        raise HTTPException(status_code=500, detail="Erro ao processar imagem do espectro original.")
    return {"image_url": image_url}

# Função de conexão
def open_device():
    try:
        device = hid.device()
        device.open(VENDOR_ID, PRODUCT_ID)
        return device
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao abrir o dispositivo: {e}")


def send_hid_command(device, group, command, data=b'', read=True, sequence=0):
    packet = bytearray(64)
    packet[0] = 0x00  # ID Byte
    packet[1] = 0xC0 if read else 0x40
    packet[2] = sequence
    length = 2 + len(data)
    packet[3] = length & 0xFF
    packet[4] = (length >> 8) & 0xFF
    packet[5] = command
    packet[6] = group
    packet[7:7 + len(data)] = data
    device.write(packet)
    if read:
        resp = device.read(64, timeout_ms=2000)
        if not resp:
            raise HTTPException(status_code=408, detail="Timeout na leitura da resposta HID.")
        return resp


@app.post("/api/read_data")
async def read_data(req: RawSpectrumRequest = Body(...)):
    device = open_device()

    # Inicia varredura
    send_hid_command(device, *CMD_PERFORM_SCAN, data=bytes([0x00]), read=False)
    time.sleep(0.5)

    if req.conversion == "absorbance":
        # O dispositivo SEMPRE retorna reflectância.
        # A=−log 10(R)
        arr = np.array(values)
        values = (-np.log10(arr.clip(min=1e-10))).tolist()


    # Aguardar término (poll de status)
    for _ in range(50):
        time.sleep(1.0)
        status = send_hid_command(device, *CMD_GET_STATUS)
        if status[7] & 0x02 == 0:
            break
    else:
        device.close()
        raise HTTPException(status_code=504, detail="Timeout aguardando término da varredura.")

    # CMD_FILE_LIST_SIZE (grupo 0x00, comando 0x2B)
    size_resp = send_hid_command(device, 0x00, 0x2B, data=bytes([0x00]))
    n_files = int.from_bytes(size_resp[7:11], "little")

    # CMD_FILE_LIST (grupo 0x00, comando 0x2C)
    list_resp = send_hid_command(device, 0x00, 0x2C, data=bytes([0x00]))
    file_ids = list_resp[7:7 + n_files]

    NNO_FILE_SCAN_DATA = file_ids[-1:]

    # Pega tamanho dos dados espectrais
    size_resp = send_hid_command(device, *CMD_FILE_GET_READSIZE, data=bytes(NNO_FILE_SCAN_DATA))
    data_size = int.from_bytes(size_resp[7:11], "little")

    print("Tamanho esperado do espectro:", data_size)
    
    # Lê os dados em blocos
    full_data = bytearray()
    while len(full_data) < data_size:
        chunk = send_hid_command(device, *CMD_FILE_GET_DATA)
        full_data.extend(chunk[7:])
        print("Chunk recebido:", chunk)

    print("Bytes recebidos:", len(full_data))

    print("Status final:", status)
    print("Tamanho do espectro:", data_size)
    print("Pacotes lidos:", len(full_data))
    print("Primeiros 16 bytes:", full_data[:16])


    device.close()

    # Interpreta os dados como pares float32
    num_points = len(full_data) // 8
    wavelengths = []
    values = []
    for i in range(num_points):
        offset = i * 8
        wl, val = struct.unpack_from('<ff', full_data, offset)
        wavelengths.append(wl)
        values.append(val)

    # Salva no banco como RawSpectrum
    raw = await prisma.rawspectrum.create(data={
        "data": datetime.fromisoformat(req.data),
        "wavelengths": json.dumps(wavelengths),
        "intensity": json.dumps(values),
        "name": req.name,
        "local": req.local,
        "varietyId": req.varietyId,
        "conversion": req.conversion,
    })
    raw_id = raw.id

    # Salva no disco
    os.makedirs("src/data/tellspec", exist_ok=True)
    with open(f"src/data/tellspec/{raw_id}.json", "w") as f:
        json.dump({"wavelengths": wavelengths, "intensity": values}, f)

    return {
        "ok": True,
        "rawId": raw_id,
        "wavelengths": wavelengths,
        "values": values
    }
