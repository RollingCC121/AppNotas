from fastapi import FastAPI, Response 
from fastapi import HTTPException
from modelos.models import Usuarios,LoginUser
from servicios.validar_usuaio import validar_usuario
from servicios.crear_usuario import crear_usuario
from fastapi.middleware.cors import CORSMiddleware

# Crear la aplicación FastAPI
app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite cualquier origen. Puedes especificar solo el dominio de tu frontend.
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Permite todos los headers
)


# Endpoint para el login
@app.post("/api/login")
def login(usuario: LoginUser):
    success, message = validar_usuario(usuario.correo, usuario.password)
    
    if not success:
        raise HTTPException(status_code=400, detail=message)
    
    return {"message": message}


# Endpoint para registrar un nuevo usuario
@app.post("/api/register")
def registrar_usuario(usuario_data: Usuarios):
    name = usuario_data.name
    correo = usuario_data.correo
    password = usuario_data.password

    try:
        crear_usuario(correo, password)
        return {"message": "Usuario registrado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    