from typing import List
from modelos.schema import VerSemestre, VerMateria
from conexion import Connection

def get_pensum(user_id: int) -> List[VerSemestre]:
    db = Connection()
    pensum = db.cur.execute(
        """
        SELECT s.id, s.numero, s.usuario_id, m.id as materia_id, m.nombre, m.semestre_id
        FROM semestres s
        LEFT JOIN materias m ON s.id = m.semestre_id
        WHERE s.usuario_id = %s
        """,
        (user_id,)
    )
    rows = db.cur.fetchall()

    pensum_dict = {}
    for row in rows:
        semestre_id, numero, usuario_id, materia_id, nombre, semestre_id_materia = row
        if semestre_id not in pensum_dict:
            pensum_dict[semestre_id] = VerSemestre(
                id=semestre_id,
                numero=numero,
                usuario_id=usuario_id,
                materias=[]
            )
        if materia_id:
            materia = VerMateria(
                id=materia_id,
                nombre=nombre,
                semestre_id=semestre_id_materia
            )
            pensum_dict[semestre_id].materias.append(materia)

    return list(pensum_dict.values())