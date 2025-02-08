from sklearn.linear_model import LinearRegression
from sklearn.decomposition import PCA
from sklearn.neural_network import MLPRegressor
from .services import apply_msc, apply_snv, apply_sg, plot_filtered_data, calculate_metrics, save_image_from_base64, save_regression_comparison_plot, plot_test_predictions
from .models import SpectraData, ModelData, ModelResponse, SpectrumResponse, SpectrumData, TargetData, TargetResponse, XResponse, YResponse, ApplyModelRequest, SavePredictionRequest, PredictionResponse
from sklearn.svm import SVR
from sklearn.cross_decomposition import PLSRegression
from collections import Counter
import pickle
import time
import json
import logging
from datetime import datetime, timezone
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import cross_val_predict
from pathlib import Path
from typing import List
from fastapi import File, HTTPException,FastAPI, Query, UploadFile
from prisma import Prisma

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
        print("Buscando predições...")
        predictions = await prisma.predictions.find_many()
        if not predictions:
            raise HTTPException(status_code=404, detail="Nenhuma predição encontrada")
        
        # Converta as predições para um formato serializável
        predictions_data = [dict(prediction) for prediction in predictions]
        
        # Converta os campos datetime para string
        for prediction in predictions_data:
            for key, value in prediction.items():
                if isinstance(value, datetime):
                    prediction[key] = value.isoformat()

        predictions_per_day = Counter(
        datetime.fromisoformat(pred["createdAt"]).date().isoformat() for pred in predictions_data
        )

        report_data = {
            "total_predictions": len(predictions_data),
            "predictions_by_day": predictions_per_day,
            "last_prediction": predictions_data[-1] if predictions_data else None,
        }
        
        print("Buscando modelos preditivos...")
        models = await prisma.predictivemodel.find_many()
        varieties = await prisma.variety.find_many()

        # Criando um dicionário {id: nome} para facilitar a busca
        variety_dict = {variety.id: variety.name for variety in varieties}

        models_data = []  # Vai armazenar os modelos associados a variedades
        models_varieties = {}  # {variety_name: [lista de modelos]}

        for model in models:
            variety_name = variety_dict.get(model.variety, "Desconhecido")

            models_data.append({
                "id": model.id,
                "model_name": model.model_name,
                "attribute": model.attribute,
                "metrics": model.metrics,
                "variety_name": variety_name
            })

            # Agrupando modelos por variedade
            if variety_name not in models_varieties:
                models_varieties[variety_name] = []
            models_varieties[variety_name].append(model.model_name)

        # Se precisar retornar no formato de lista para o frontend:
        models_varieties_list = [{"variety_name": k, "models": v} for k, v in models_varieties.items()]

        print("Variedades e modelos treinados:", models_varieties_list)


        print("Buscando dados espectrais...")
        spectra = await prisma.spectrumdata.find_many()

        # Criar lista de espectros com caminho salvo
        spectral_data = []
        for s in spectra:
            image_path = save_image_from_base64(s.dataset, s.image)  # Chamando a função do service
            if image_path:
                spectral_data.append({"name": s.dataset, "image": image_path})
        
        print("Buscando modelos preditivos...")
        models = await prisma.predictivemodel.find_many()
        images_train = []
        images_test = []
        
        for s in models:
            image_path_1 = f"{s.attribute}_{s.model_name}_regression_comparison_plot.png"  # Ajuste conforme necessário
            image_path_2 = f"{s.attribute}_{s.model_name}_plot_test_predictions.png"
            images_train.append(image_path_1)
            images_test.append(image_path_2)
        
        print("Buscando gráficos de predições...")
        graphs = await prisma.spectra.find_many()
        pred_graphs = [{"name": p.name, "variety": p.variety, "filter": p.filter, "graph": p.graph} for p in graphs]
        
        return {
            "spectral_images_data": spectral_data,
            "report": report_data,
            "train_images": images_train,
            "test_images": images_test,
            "predicted_specs": pred_graphs,
            "models_metrics": models_data,
            "models_varieties": models_varieties,
        }

    except Exception as e:
        print(f"Erro inesperado: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno ao carregar dashboard: {str(e)}")
