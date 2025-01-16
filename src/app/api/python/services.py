import numpy as np
import pandas as pd
from scipy.signal import savgol_filter
import base64
from io import BytesIO
from datetime import datetime, timezone
import matplotlib.pyplot as plt

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
    mean_spectrum = data.mean(axis=0)
    corrected_spectra = []
    
    for i in range(data.shape[0]):
        spectrum = data.iloc[i, :]
        slope, intercept = np.polyfit(mean_spectrum, spectrum, 1)
        corrected_spectrum = (spectrum - intercept) / slope
        corrected_spectra.append(corrected_spectrum)
    
    corrected_df = pd.DataFrame(corrected_spectra, columns=data.columns)
    return corrected_df

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

    img_buf = BytesIO()
    plt.savefig(img_buf, format='png')
    img_buf.seek(0)
    img_str = base64.b64encode(img_buf.read()).decode('utf-8')

    return img_str
