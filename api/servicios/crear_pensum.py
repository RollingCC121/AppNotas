from conexion import Connection
from fastapi import Depends,status,HTTPException
from modelos.schema import SemestreCreate
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

# Configuración JWT
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Configurar el esquema de autenticación Bearer para extraer el token del encabezado Authorization
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

# Función para obtener el user_id desde el token
def get_user_id_from_token(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="No se pudo validar el token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("id")
        if user_id is None:
            raise credentials_exception
        return int(user_id)  # Convertimos a int para la BD
    except JWTError:
        raise credentials_exception

# Función para agregar un semestre y sus materias en la BD
def add_semester(user_id: int, semester_data: SemestreCreate, db: Connection):
    try:
        # Insertar semestre
        db.cur.execute(
            "INSERT INTO semestres (usuario_id, numero) VALUES (%s, %s) RETURNING id",
            (user_id, semester_data.numero)
        )
        semestre_id = db.cur.fetchone()[0]

        # Insertar materias asociadas al semestre
        for materia in semester_data.materias:
            db.cur.execute(
                "INSERT INTO materias (semestre_id, nombre) VALUES (%s, %s)",
                (semestre_id, materia.nombre)
            )

        db.conn.commit()
    except Exception as e:
        db.conn.rollback()
        print(f"Error al agregar el semestre: {e}")
        raise HTTPException(status_code=500, detail="Error al registrar el semestre y sus materias")
