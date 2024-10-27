from pydantic import BaseModel
from typing import List

# Modelo de datos para el login
class Usuarios(BaseModel):
    name: str
    correo: str
    password: str

class LoginUser(BaseModel):
    correo: str
    password: str

class User(BaseModel):
    id: int
    name: str
    correo: str

class Token(BaseModel):
    access_token: str
    token_type: str
    name: str
    id: str 

class MateriaCreate(BaseModel):
    nombre: str

class SemestreCreate(BaseModel):
    numero: int
    materias: List[MateriaCreate]