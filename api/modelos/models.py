from pydantic import BaseModel

class Materias(BaseModel):
    nombre: str
    codigo: str
    creditos: int
    semestre_id: int

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

class Semestres(BaseModel):
    numero: int