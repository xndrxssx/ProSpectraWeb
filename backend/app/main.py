from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import PROJECT_NAME, API_PREFIX, ORIGINS
from app.db.session import connect_db, disconnect_db
from app.api.routers import spectra, models, predictions, hardware, dashboard

# Cria a instância da aplicação FastAPI
app = FastAPI(title=PROJECT_NAME)

# --- Eventos de Ciclo de Vida ---
@app.on_event("startup")
async def startup_event():
    """Ações a serem executadas na inicialização da aplicação."""
    await connect_db()

@app.on_event("shutdown")
async def shutdown_event():
    """Ações a serem executadas no encerramento da aplicação."""
    await disconnect_db()

# --- Middlewares ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Inclusão dos Roteadores ---
# Inclui todos os endpoints modulares na aplicação principal
app.include_router(hardware.router, prefix=API_PREFIX, tags=["Hardware"])
app.include_router(spectra.router, prefix=API_PREFIX, tags=["Spectra & Targets"])
app.include_router(models.router, prefix=API_PREFIX, tags=["Model Training"])
app.include_router(predictions.router, prefix=API_PREFIX, tags=["Predictions"])
app.include_router(dashboard.router, prefix=API_PREFIX, tags=["Dashboard"])

# Endpoint raiz para teste
@app.get("/")
async def root():
    return {"message": f"Welcome to {PROJECT_NAME}"}