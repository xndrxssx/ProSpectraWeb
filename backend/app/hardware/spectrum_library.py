# app/hardware/spectrum_library.py

import ctypes
import json
import os
from app.core import config

# --- Exceções Customizadas ---
class SpectrumLibraryError(Exception):
    """Exceção base para erros na biblioteca de espectro."""
    pass

# --- Carregamento da Biblioteca DLL ---
try:
    _here = os.path.dirname(os.path.abspath(__file__))
    _lib_path = os.path.join(_here, "DLPSpectrumLibrary.dll")
    _lib = ctypes.CDLL(_lib_path)
except (OSError, ImportError) as e:
    raise RuntimeError(f"CRÍTICO: Não foi possível carregar a DLPSpectrumLibrary.dll. Verifique o caminho. Erro: {e}")

# --- Definições de Estruturas ctypes (CORRIGIDAS) ---
# Estas estruturas agora espelham a implementação funcional do repositório de referência.

class SlewScanSection(ctypes.Structure):
    _fields_ = [
        ("section_scan_type", ctypes.c_uint8),
        ("width_px", ctypes.c_uint8),
        ("wavelength_start_nm", ctypes.c_uint16),
        ("wavelength_end_nm", ctypes.c_uint16),
        ("num_patterns", ctypes.c_uint16),
        ("exposure_time", ctypes.c_uint16), # CORRIGIDO: Deve ser uint16.
    ]

class SlewScanConfigHead(ctypes.Structure):
    _fields_ = [
        ("scan_type", ctypes.c_uint8),
        ("scanConfigIndex", ctypes.c_uint16),
        ("ScanConfig_serial_number", ctypes.c_char * 8), # CORRIGIDO: Tamanho 8
        ("config_name", ctypes.c_char * 40),             # CORRIGIDO: Tamanho 40
        ("num_repeats", ctypes.c_uint16),
        ("num_sections", ctypes.c_uint8),
    ]

class SlewScanConfig(ctypes.Structure):
    _fields_ = [
        ("head", SlewScanConfigHead),
        ("section", SlewScanSection * 5),
    ]

class ScanResults(ctypes.Structure):
    # Esta estrutura complexa define como os dados de resultado são decodificados.
    _fields_ = [
        ('header_version', ctypes.c_uint32),
        ('scan_name', ctypes.c_char * 20),
        ('year', ctypes.c_uint8),
        ('month', ctypes.c_uint8),
        ('day', ctypes.c_uint8),
        ('day_of_week', ctypes.c_uint8),
        ('hour', ctypes.c_uint8),
        ('minute', ctypes.c_uint8),
        ('second', ctypes.c_uint8),
        ('system_temp_hundredths', ctypes.c_int16),
        ('detector_temp_hundredths', ctypes.c_int16),
        ('humidity_hundredths', ctypes.c_uint16),
        ('lamp_pd', ctypes.c_uint16),
        ('scanDataIndex', ctypes.c_uint32),
        ('ShiftVectorCoeffs', ctypes.c_double * 3),
        ('PixelToWavelengthCoeffs', ctypes.c_double * 3),
        ('serial_number', ctypes.c_char * 8),
        ('adc_data_length', ctypes.c_uint16),
        ('black_pattern_first', ctypes.c_uint8),
        ('black_pattern_period', ctypes.c_uint8),
        ('pga', ctypes.c_uint8),
        ('cfg', SlewScanConfig),
        ('wavelength', ctypes.c_double * 228),
        ('intensity', ctypes.c_int * 228),
        ('length', ctypes.c_int),
    ]

# --- Prototipagem das Funções da DLL ---
_lib.dlpspec_scan_write_configuration.argtypes = [
    ctypes.POINTER(SlewScanConfig),
    ctypes.POINTER(ctypes.c_uint8),
    ctypes.POINTER(ctypes.c_uint32),
]
_lib.dlpspec_scan_write_configuration.restype = ctypes.c_int

_lib.dlpspec_scan_interpret.argtypes = [
    ctypes.c_void_p,
    ctypes.c_size_t,
    ctypes.POINTER(ScanResults),
]
_lib.dlpspec_scan_interpret.restype = ctypes.c_int

# --- Funções Wrapper em Python ---
def scan_interpret(raw_bytes: bytes) -> dict:
    """Interpreta o blob de dados brutos da varredura usando a biblioteca C."""
    if not raw_bytes:
        raise SpectrumLibraryError("Dados brutos para interpretação estão vazios.")
        
    raw_bytes = bytes(raw_bytes)  # Converte bytearray para bytes
    config.logger.info(f"Preparando buffer para DLL: tamanho {len(raw_bytes)} bytes")
    buffer = ctypes.create_string_buffer(raw_bytes, len(raw_bytes))
    config.logger.info("Buffer criado com sucesso")

    results = ScanResults()
    config.logger.info("Estrutura ScanResults inicializada")
    
    try:
        config.logger.info("Chamando dlpspec_scan_interpret...")
        status = _lib.dlpspec_scan_interpret(ctypes.byref(buffer), len(raw_bytes), ctypes.byref(results))
        config.logger.info(f"DLL retornou status: {status}")
        if status != 0:
            raise SpectrumLibraryError(f"A função C dlpspec_scan_interpret falhou com o código de erro: {status}")
    except Exception as e:
        import traceback
        traceback.print_exc()
        config.logger.error(f"Exceção capturada na chamada da DLL: {e}")
        raise

    config.logger.info(f"Dados interpretados: length={results.length}, pga={results.pga}")
    if results.length <= 0 or results.length > 500:
        raise SpectrumLibraryError(f"Comprimento de dados inválido após interpretação: {results.length}")
    
    wavelengths = [results.wavelength[i] for i in range(results.length)]
    intensities = [results.intensity[i] for i in range(results.length)]

    return {"wavelength": wavelengths, "intensity": intensities}