import time
import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_predict
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.cross_decomposition import PLSRegression
from sklearn.decomposition import PCA
from sklearn.linear_model import LinearRegression
from sklearn.neural_network import MLPRegressor

from app.schemas.model import ModelData
from app.services.data_science_service import calculate_metrics, save_regression_comparison_plot, plot_test_predictions
from app.services.file_service import save_model_to_disk
from app.core.config import IMAGES_DIR, MODELS_DIR, logger

def train_model(data: ModelData, model_instance):
    """Função genérica para treinar diferentes tipos de modelos."""
    start_time = time.time()
    
    X_train = np.array(data.X_train)
    y_train = np.array(data.y_train)
    X_test = np.array(data.X_test)
    y_test = np.array(data.y_test)
    logger.info(f"Training {data.model_name}. X_train: {X_train.shape}, X_test: {X_test.shape}")
    
    # Cria o pipeline
    pipeline = make_pipeline(StandardScaler(), model_instance)
    pipeline.fit(X_train, y_train)

    # Predições e métricas
    y_train_pred = pipeline.predict(X_train)
    y_train_cv = cross_val_predict(pipeline, X_train, y_train, cv=5)
    y_pred_val = pipeline.predict(X_test)

    metrics_train = calculate_metrics(y_train, y_train_pred)
    metrics_cv = calculate_metrics(y_train, y_train_cv)
    metrics_pred = calculate_metrics(y_test, y_pred_val)

    # Salva gráficos
    img_filename_1 = f"{data.attribute}_{data.model_name}_regression_comparison.png"
    img_path_1 = IMAGES_DIR / img_filename_1
    save_regression_comparison_plot(y_train, y_train_pred, y_train_cv, img_path_1)

    img_filename_2 = f"{data.attribute}_{data.model_name}_test_predictions.png"
    img_path_2 = IMAGES_DIR / img_filename_2
    plot_test_predictions(y_test, y_pred_val, img_path_2)

    images_paths = {
        "regression_comparison_plot": str(img_path_1),
        "test_predictions_plot": str(img_path_2)
    }
    
    execution_time = time.time() - start_time
    metrics = {
        "train": metrics_train, "cv": metrics_cv, "test": metrics_pred,
        "time": {"execution_time": execution_time}
    }

    # Salva modelo
    model_filename = f"{data.attribute}_{data.model_name}_model.pkl"
    model_path = MODELS_DIR / model_filename
    save_model_to_disk(pipeline, model_path)
    
    return str(model_path), metrics, images_paths

def train_rfr_model(data: ModelData):
    model = RandomForestRegressor(**data.hyperparameters)
    return train_model(data, model)

def train_svr_model(data: ModelData):
    model = SVR(**data.hyperparameters)
    return train_model(data, model)

def train_plsr_model(data: ModelData):
    model = PLSRegression(**data.hyperparameters)
    return train_model(data, model)

def train_pcr_model(data: ModelData):
    # PCR é um pipeline de PCA + Regressão Linear
    pipeline = make_pipeline(
        StandardScaler(),
        PCA(**data.hyperparameters),
        LinearRegression()
    )
    # A função genérica não se encaixa perfeitamente aqui, então adaptamos
    # A lógica de treinamento, métricas e salvamento é a mesma
    # Esta parte poderia ser refatorada para maior elegância, mas funciona
    start_time = time.time()
    
    X_train, y_train, X_test, y_test = map(np.array, [data.X_train, data.y_train, data.X_test, data.y_test])
    pipeline.fit(X_train, y_train)

    y_train_pred = pipeline.predict(X_train)
    y_train_cv = cross_val_predict(pipeline, X_train, y_train, cv=5)
    y_pred_val = pipeline.predict(X_test)

    metrics_train = calculate_metrics(y_train, y_train_pred)
    metrics_cv = calculate_metrics(y_train, y_train_cv)
    metrics_pred = calculate_metrics(y_test, y_pred_val)

    img_filename_1 = f"{data.attribute}_{data.model_name}_regression_comparison.png"
    img_path_1 = IMAGES_DIR / img_filename_1
    save_regression_comparison_plot(y_train, y_train_pred, y_train_cv, img_path_1)

    img_filename_2 = f"{data.attribute}_{data.model_name}_test_predictions.png"
    img_path_2 = IMAGES_DIR / img_filename_2
    plot_test_predictions(y_test, y_pred_val, img_path_2)

    images_paths = { "regression_comparison_plot": str(img_path_1), "test_predictions_plot": str(img_path_2) }
    execution_time = time.time() - start_time
    metrics = { "train": metrics_train, "cv": metrics_cv, "test": metrics_pred, "time": {"execution_time": execution_time} }

    model_filename = f"{data.attribute}_{data.model_name}_model.pkl"
    model_path = MODELS_DIR / model_filename
    save_model_to_disk(pipeline, model_path)
    
    return str(model_path), metrics, images_paths

def train_mlpr_model(data: ModelData):
    # Trata os hiperparâmetros que podem vir como string do frontend
    hyperparams = data.hyperparameters.copy()
    for key, value in hyperparams.items():
        if value == "false": hyperparams[key] = False
        elif value == "true": hyperparams[key] = True
        elif isinstance(value, str) and value.startswith("[") and value.endswith("]"):
            try: hyperparams[key] = eval(value)
            except: pass
    
    model = MLPRegressor(**hyperparams)
    return train_model(data, model)