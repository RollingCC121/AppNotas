CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE semestres (
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL,
    usuario_id INTEGER REFERENCES usuarios(id)
);

CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    semestre_id INTEGER REFERENCES semestres(id)
);