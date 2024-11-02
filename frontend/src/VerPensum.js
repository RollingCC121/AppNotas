import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import './VerPensum.css';

const VerPensum = () => {
  const [pensum, setPensum] = useState([]);
  const userId = localStorage.getItem('user_id'); // Obtener el ID del usuario desde localStorage

  useEffect(() => {
    const fetchPensum = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token del localStorage
        const response = await fetch(`http://localhost:8001/api/pensum/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPensum(data);
        } else {
          console.error('Error al obtener el pensum');
        }
      } catch (error) {
        console.error('Error al obtener el pensum:', error);
      }
    };

    fetchPensum();
  }, [userId]);

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Ver Pensum
      </Typography>
      <div className="semesters">
        {pensum.map((semestre, index) => (
          <div key={index} className="semester">
            <Typography variant="h6">Semestre {semestre.numero}</Typography>
            {semestre.materias.map((materia, idx) => (
              <ListItem key={idx} className="subject">
                <ListItemText primary={materia.nombre} />
              </ListItem>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default VerPensum;