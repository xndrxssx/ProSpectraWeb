import logging
from pathlib import Path

# --- Configurações da Aplicação ---
API_PREFIX = "/api"
PROJECT_NAME = "SpectraAPI"

# --- Configuração do Logger ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Configurações de Diretórios Estáticos ---
# Garante que os diretórios existam ao iniciar a aplicação
BASE_DIR = Path(__file__).resolve().parent.parent.parent
STATIC_DIR = BASE_DIR / "static"
MODELS_DIR = STATIC_DIR / "models"
IMAGES_DIR = STATIC_DIR / "images"
SPECTRA_DIR = STATIC_DIR / "spectra"

MODELS_DIR.mkdir(parents=True, exist_ok=True)
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
SPECTRA_DIR.mkdir(parents=True, exist_ok=True)

# --- Configurações de CORS ---
ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# --- Constantes do Dispositivo e Comandos HID ---
VENDOR_ID = 0x0451
PRODUCT_ID = 0x4200

# Comandos HID (Grupo, Comando)
CMD_SET_ACTIVE_SCAN_CFG = (0x02, 0x24)
CMD_PERFORM_SCAN = (0x02, 0x18)
CMD_GET_STATUS = (0x04, 0x03)
CMD_READ_ERROR_STATUS = (0x04, 0x04)
CMD_FILE_GET_READSIZE = (0x00, 0x2D)
CMD_FILE_GET_DATA = (0x00, 0x2E)

# Parâmetros de Comando
NNO_FILE_SCAN_DATA = bytes([0x00])