import base64
import json
import pickle
from typing import Any
from app.core.config import SPECTRA_DIR

def save_image_from_base64(name: str, image_obj: dict) -> str:
    """Salva uma imagem Base64 na pasta static/spectra e retorna o caminho."""
    try:
        base64_str = image_obj["data"]
        
        if base64_str.startswith("data:image/png;base64,"):
            base64_str = base64_str.split(",", 1)[1]
        
        image_data = base64.b64decode(base64_str)
        file_path = SPECTRA_DIR / f"{name}.png"
        
        with open(file_path, "wb") as f:
            f.write(image_data)
        
        return f"/static/spectra/{name}.png"
    
    except Exception as e:
        print(f"Erro ao salvar imagem: {e}")
        return None

def get_image_url(unique_id: str, db_data: str | dict, prefix: str) -> str | None:
    """
    Verifica se um ficheiro de imagem existe. Se não, cria. Retorna o URL.
    """
    filename_with_ext = f"{prefix}_{unique_id}.png"
    filename_without_ext = f"{prefix}_{unique_id}"
    file_path = SPECTRA_DIR / filename_with_ext
    url_path = f"/static/spectra/{filename_with_ext}"

    if file_path.exists():
        return url_path

    image_obj_for_saving = {}
    if isinstance(db_data, str):
        try:
            data_dict = json.loads(db_data)
            image_obj_for_saving["data"] = data_dict.get("data", db_data)
        except (json.JSONDecodeError, TypeError):
            image_obj_for_saving["data"] = db_data
    elif isinstance(db_data, dict):
        image_obj_for_saving = db_data
    else:
        return None

    return save_image_from_base64(filename_without_ext, image_obj_for_saving)

def save_model_to_disk(pipeline: Any, model_path: str) -> None:
    """Salva um pipeline de modelo no disco usando pickle."""
    with open(model_path, "wb") as model_file:
        pickle.dump(pipeline, model_file)

def load_model_from_disk(model_path: str) -> Any:
    """Carrega um pipeline de modelo do disco."""
    with open(model_path, "rb") as model_file:
        model = pickle.load(model_file)
    return model