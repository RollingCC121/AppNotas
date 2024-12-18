import psycopg2
from fastapi import FastAPI, HTTPException

# Clase de conexión (manteniendo tu implementación)
class Connection:
    def __init__(self):
        try:
            self.conn = psycopg2.connect(
                "dbname=dbappnotas user=pollito password=pollito host=54.205.43.57 port=5432"
            )
            self.cur = self.conn.cursor()
        except psycopg2.OperationalError as err:
            print(err)
            if self.conn:
                self.conn.close()

    def __del__(self):
        if self.conn:
            self.conn.close()