from conexion import Connection
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

# Función para validar el login
# Función para validar el login
def validar_usuario(correo: str, password: str):
    conn = Connection()  # Instanciar la clase de conexión
    try:
        # Ejecutar consulta para verificar si el usuario existe y si la contraseña es correcta
        conn.cur.execute(
            "SELECT id, name, password FROM usuarios WHERE correo = %s", (correo,)
        )
        result = conn.cur.fetchone()
        
        if result is None:
            return False, None, None
        
        user_id, stored_name, stored_password = result
        
        if stored_password != password:
            return False, None, None
        
        return True, stored_name, user_id
    
    except Exception as e:
        print(f"Error al consultar la base de datos: {e}")
        return False, None, None
    
    finally:
        del conn  # Cerrar la conexión cuando termine la operación

        
# Configuración de JWT
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt