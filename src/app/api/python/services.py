from pathlib import Path
import numpy as np
from scipy.signal import savgol_filter
import base64
import io
import json
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
    return savgol_filter(data, window_length=params['window_length'], polyorder=params['polyorder'], deriv=params['deriv'])

def plot_filtered_data(filtered_data, wl):
    filtered_data = np.array(filtered_data)
    
    plt.figure(figsize=(9, 5))
    plt.plot(wl, filtered_data.T)
    plt.xlabel("Comprimento de onda (nm)", size=14)
    plt.ylabel("Absorbância", size=14)
    plt.title("Filtro para o FieldSpec", size=18)
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
    plt.savefig(str(file_path), format='png')
    plt.close()
  
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
    plt.savefig(str(file_path), format='png')
    plt.close()

def generate_plot(datasets, wavelengths):
    if not datasets or not wavelengths:
        raise ValueError("Dados inválidos para gerar o gráfico")
    
    plt.figure(figsize=(6, 4))
    
    # Converter os dados em um array NumPy para evitar problemas de formato
    datasets = np.array(datasets)  # Converte lista de listas para array 2D
    
    for i in range(datasets.shape[0]):  # Itera sobre cada amostra individualmente
        plt.plot(wavelengths, datasets[i, :])  # Garante que cada linha é 1D
    
    plt.title("Espectro de Dados")
    plt.xlabel("Comprimento de Onda")
    plt.ylabel("Intensidade")
    
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    
    return img_str

# Diretório onde as imagens serão armazenadas
STATIC_DIR = Path("static")
SPECTRA_DIR = STATIC_DIR / "spectra"
SPECTRA_DIR.mkdir(parents=True, exist_ok=True)  # Criar se não existir

def save_image_from_base64(name: str, image_obj: dict) -> str:
    """Salva uma imagem Base64 na pasta static/spectra e retorna o caminho."""
    try:
        # Garantir que o diretório de destino exista
        SPECTRA_DIR.mkdir(parents=True, exist_ok=True)
        
        # Acessar o campo 'data' do objeto image_obj, que contém a string Base64
        base64_str = image_obj["data"]
        
        # Remover o prefixo "data:image/png;base64," se necessário
        if base64_str.startswith("data:image/png;base64,"):
            base64_str = base64_str.split(",", 1)[1]  # Pega somente a parte após o vírgula
        
        # Decodificar a string Base64 para bytes
        image_data = base64.b64decode(base64_str)
        
        # Caminho onde a imagem será salva
        file_path = SPECTRA_DIR / f"{name}.png"
        
        # Salvar a imagem no arquivo
        with open(file_path, "wb") as f:
            f.write(image_data)
        
        # Retornar o caminho relativo para servir a imagem no frontend
        return f"/static/spectra/{name}.png"
    
    except Exception as e:
        print(f"Erro ao salvar imagem: {e}")
        return None
    
def get_image_url(unique_id: str, db_data: str | dict, prefix: str) -> str | None:
    """
    Verifica se um ficheiro de imagem existe. Se não, usa save_image_from_base64 para criá-lo.
    Retorna o URL path para a imagem.
    """
    filename_with_ext = f"{prefix}_{unique_id}.png"
    filename_without_ext = f"{prefix}_{unique_id}"
    file_path = SPECTRA_DIR / filename_with_ext
    url_path = f"/static/spectra/{filename_with_ext}"

    # Se o ficheiro já existe, retorna o caminho diretamente.
    if file_path.exists():
        return url_path

    # Se não existe, prepara os dados para a sua função.
    # Sua função espera um dicionário com a chave "data".
    image_obj_for_saving = {}
    if isinstance(db_data, str):
        try:
            # Tenta carregar se for uma string JSON
            data_dict = json.loads(db_data)
            image_obj_for_saving["data"] = data_dict.get("data", db_data)
        except (json.JSONDecodeError, TypeError):
            # Se não for JSON, assume que é uma string base64 pura
            image_obj_for_saving["data"] = db_data
    elif isinstance(db_data, dict):
        image_obj_for_saving = db_data
    else:
        return None # Tipo de dado não suportado

    # Chama a sua função para criar o ficheiro
    return save_image_from_base64(filename_without_ext, image_obj_for_saving)