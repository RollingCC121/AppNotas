from fastapi import FastAPI
from fastapi import HTTPException
from modelos.schema import Usuarios,LoginUser, Token 
from servicios.validar_login import validar_usuario, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from servicios.crear_usuario import crear_usuario
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends
from datetime import timedelta
from typing import List
from modelos.schema import SemestreCreate
from conexion import Connection
from servicios.crear_pensum import add_semester, get_user_id_from_token


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
@app.post("/api/login", response_model=Token)
def login(usuario: LoginUser):
    success, name, user_id = validar_usuario(usuario.correo, usuario.password)
    
    if not success:
        raise HTTPException(status_code=400, detail="Correo o contraseña incorrectos")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": usuario.correo, "id": str(user_id)}, expires_delta=access_token_expires  # Convertir user_id a str
    )
    return {"access_token": access_token, "token_type": "bearer", "name": name, "id": str(user_id)}  # Convertir user_id a str


# Endpoint para registrar un nuevo usuario
@app.post("/api/register")
def registrar_usuario(usuario_data: Usuarios):
    name = usuario_data.name
    correo = usuario_data.correo
    password = usuario_data.password

    try:
        crear_usuario(name, correo, password)
        return {"message": "Usuario registrado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.post("/api/semestre")
async def add_semesters(semesters: List[SemestreCreate], user_id: int = Depends(get_user_id_from_token)):
    db = Connection()
    for semester in semesters:
        add_semester(user_id=user_id, semester_data=semester, db=db)
    
    return {"message": "Semestres y materias registradas correctamente"}