# app/core/config.py

import logging
from pathlib import Path

# --- Configurações da Aplicação ---
API_PREFIX = "/api"
PROJECT_NAME = "SpectraAPI"
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Configurações de Diretórios ---
BASE_DIR = Path(__file__).resolve().parent.parent.parent
STATIC_DIR = BASE_DIR / "static"
SPECTRA_DIR = STATIC_DIR / "spectra"

# ADICIONE ESTAS LINHAS DE VOLTA
MODELS_DIR = STATIC_DIR / "models"
IMAGES_DIR = STATIC_DIR / "images"
MODELS_DIR.mkdir(parents=True, exist_ok=True)
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
# FIM DAS LINHAS ADICIONADAS

SPECTRA_DIR.mkdir(parents=True, exist_ok=True)

# --- Configurações de CORS ---
ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]

# --- Constantes do Dispositivo HID ---
DEVICE_VENDOR_ID = 0x0451
DEVICE_PRODUCT_ID = 0x4200

# --- Comandos HID (Grupo, Comando) ---
CMD_SCAN_CFG_APPLY = (0x02, 0x1E)
CMD_READ_SCAN_TIME = (0x02, 0x37)
CMD_PERFORM_SCAN = (0x02, 0x18)
CMD_GET_STATUS = (0x04, 0x03)
CMD_FILE_GET_READSIZE = (0x00, 0x2D)
CMD_FILE_GET_DATA = (0x00, 0x2E)
CMD_SET_ACTIVE_SCAN_CFG = (0x02, 0x24)
CMD_READ_ERROR_STATUS = (0x04, 0x04)
CMD_READ_HIBERNATE_STATUS = (0x03, 0x0F)
CMD_SET_HIBERNATE_STATUS = (0x03, 0x0E)

# --- Parâmetros de Comando ---
NNO_FILE_SCAN_DATA = bytes([0x00])
