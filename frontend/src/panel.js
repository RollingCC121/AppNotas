import React, { useState } from 'react';

const Panel = () => {
  const name = localStorage.getItem('name');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      // Llamada a la API para agregar una materia
      const response = await fetch('http://localhost:8001/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ semester, subject }),
      });

      if (response.ok) {
        const newSubject = await response.json();
        setSubjects([...subjects, newSubject]);
        setSemester('');
        setSubject('');
      } else {
        console.error('Failed to add subject');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Bienvenido, {name}!</h1>
      <p>Has iniciado sesión exitosamente.</p>

      <h2>Agregar Materias</h2>
      <form onSubmit={handleAddSubject}>
        <input
          type="text"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          placeholder="Semestre"
          required
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Materia"
          required
        />
        <button type="submit">Agregar Materia</button>
      </form>

      <h2>Materias por Semestre</h2>
      <ul>
        {subjects.map((subj, index) => (
          <li key={index}>{subj.semester}: {subj.subject}</li>
        ))}
      </ul>
    </div>
  );
};

export default Panel;