import numpy as np
import pandas as pd
from scipy.signal import savgol_filter
import base64
from io import BytesIO
from datetime import datetime, timezone
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.linear_model import LinearRegression

def create_spectra(data):
    return {
        "nome": data["name"],
        "conteudo": data["content"],
        "variedade": data["variety"],
        "data": data["datetime"],
        "local": data["local"],
        "criadoEm": datetime.now(timezone.utc),
        "filtro": data.get("filter", []),
        "grafico": data.get("grafico", "")
    }

def apply_msc(data):
    if not isinstance(data, np.ndarray):
        raise ValueError("Os dados de entrada devem ser um numpy.ndarray.")
    
    # Calcula o espectro médio
    mean_spectrum = np.mean(data, axis=0)
    
    # Aloca a matriz para os dados corrigidos
    corrected_data = np.zeros_like(data)
    
    # Itera sobre as linhas do dado
    for i in range(data.shape[0]):
        spectrum = data[i, :]  # Acessa diretamente as linhas como numpy array
        fit = np.polyfit(mean_spectrum, spectrum, 1, full=False)
        corrected_data[i, :] = (spectrum - fit[1]) / fit[0]
    
    return corrected_data

def apply_snv(data):
    mean = np.mean(data, axis=1, keepdims=True)
    std_dev = np.std(data, axis=1, keepdims=True)
    snv_data = (data - mean) / std_dev
    return snv_data

def apply_sg(data, params):
    return savgol_filter(data, window_length=params['window_length'], polyorder=params['polyorder'], deriv=params['deriv'], delta=params['delta'], axis=params['axis'], mode=params['mode'],cval=params['cval'])

def plot_filtered_data(filtered_data, wl):
    filtered_data = np.array(filtered_data)
    
    plt.figure(figsize=(9, 5))
    plt.plot(wl, filtered_data.T)
    plt.xlabel("Comprimento de onda (nm)", size=14)
    plt.ylabel("Absorbância", size=14)
    plt.title("Correção SNV para o FieldSpec", size=18)
    plt.axhline(y=0, color='k', linewidth=1.5)
    plt.grid(True)
    
    plt.tight_layout()

    img_buf = BytesIO()
    plt.savefig(img_buf, format='png')
    img_buf.seek(0)
    img_str = base64.b64encode(img_buf.read()).decode('utf-8')

    return img_str

def calculate_metrics(y_true, y_pred):
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    r2 = r2_score(y_true, y_pred)
    return {"MAE": mae, "RMSE": rmse, "R²": r2}

def save_regression_comparison_plot(y_train, y_pred_train, y_pred_cv, file_path):
    slope_pred, offset_pred = np.polyfit(y_train, y_pred_train, 1)
    rmse_pred = np.sqrt(mean_squared_error(y_train, y_pred_train))
    r2_pred = r2_score(y_train, y_pred_train)

    slope_opt, offset_opt = np.polyfit(y_train, y_pred_cv, 1)
    rmse_opt = np.sqrt(mean_squared_error(y_train, y_pred_cv))
    r2_opt = r2_score(y_train, y_pred_cv)

    plt.figure(figsize=(10, 6))
    plt.scatter(y_train, y_pred_train, color='blue', label='Reference', marker='o', alpha=0.7)
    plt.scatter(y_train, y_pred_cv, color='red', label='Predicted', marker='o', alpha=0.7)

    plt.xlabel("Reference")
    plt.ylabel("Predicted")
    plt.title(f"Reference vs. Predicted")
    plt.grid(True)
    plt.legend(loc='lower right')

    plt.text(0.05, 0.95, f'Predicted - Slope: {slope_opt:.2f}, Offset: {offset_opt:.2f}, RMSE: {rmse_opt:.2f}, R²: {r2_opt:.2f}\nReference - Slope: {slope_pred:.2f}, Offset: {offset_pred:.2f}, RMSE: {rmse_pred:.2f}, R²: {r2_pred:.2f}',
             transform=plt.gca().transAxes, fontsize=12, verticalalignment='top', horizontalalignment='left')

    # Salvar gráfico como arquivo
    img_buf = BytesIO()
    plt.savefig(img_buf, format='png')
    img_buf.seek(0)
    img_str = base64.b64encode(img_buf.read()).decode('utf-8')

    return img_str
    
def plot_test_predictions(y_true_test, y_pred_test, file_path):
    # Calcular slope, offset, R² e RMSE
    model = LinearRegression().fit(y_pred_test.reshape(-1, 1), y_true_test)
    slope = model.coef_[0]
    offset = model.intercept_
    y_pred_line = model.predict(np.array([y_true_test.min(), y_true_test.max()]).reshape(-1, 1))
    r2 = r2_score(y_true_test, y_pred_test)
    rmse = np.sqrt(mean_squared_error(y_true_test, y_pred_test))

    # Plotando o gráfico
    plt.figure(figsize=(10, 6))
    plt.scatter(y_pred_test, y_true_test, color='green', label='Dados')
    plt.plot([y_true_test.min(), y_true_test.max()], y_pred_line, color='blue', linestyle='--', label='Linha de Regressão')
    plt.xlabel('Predito')
    plt.ylabel('Real')
    plt.title('Predições no Conjunto de Teste')
    plt.legend()
    plt.text(0.05, 0.95, f'Slope: {slope:.2f}\nOffset: {offset:.2f}\nR²: {r2:.2f}\nRMSE: {rmse:.2f}', 
             transform=plt.gca().transAxes, verticalalignment='top')
    img_buf = BytesIO()
    plt.savefig(img_buf, format='png')
    img_buf.seek(0)
    img_str = base64.b64encode(img_buf.read()).decode('utf-8')

    return img_str