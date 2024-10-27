import React, { useState, useEffect } from 'react';

const Home = () => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    // Aquí puedes cargar los semestres desde tu API si es necesario
  }, []);

  const handleSubjectChange = (semesterIndex, subjectIndex, value) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].materias[subjectIndex].nombre = value;
    setSemesters(updatedSemesters);
  };

  const addSubject = (semesterIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].materias.push({ nombre: '' });
    setSemesters(updatedSemesters);
  };

  const addSemester = () => {
    const newSemesterNumber = semesters.length + 1;
    setSemesters([...semesters, { numero: newSemesterNumber, materias: [{ nombre: '' }] }]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');  // Obtener el token del localStorage
      const response = await fetch('http://localhost:8001/api/semestre', {  // Asegúrate de que la URL coincida con el backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(semesters),
      });

      if (response.ok) {
        alert('Semestres y materias guardados exitosamente');
      } else {
        alert('Error al guardar semestres y materias');
      }
    } catch (error) {
      console.error('Error al enviar semestres y materias:', error);
      alert('Hubo un error al guardar los datos');
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={addSemester}>Añadir Semestre</button>
      {semesters.map((semester, semesterIndex) => (
        <div key={semesterIndex} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Semestre {semester.numero}</h3>
          {semester.materias.map((subject, subjectIndex) => (
            <div key={subjectIndex} style={{ marginTop: '10px' }}>
              <input
                type="text"
                value={subject.nombre}
                onChange={(e) => handleSubjectChange(semesterIndex, subjectIndex, e.target.value)}
                placeholder="Nombre de la materia"
              />
            </div>
          ))}
          <button onClick={() => addSubject(semesterIndex)}>Añadir Materia</button>
        </div>
      ))}
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default Home;
