import React from 'react';
import { Container, Typography } from '@mui/material';

const Home = () => {
  const userName = localStorage.getItem('name'); // Obtener el nombre del usuario desde localStorage

  return (
    <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Typography variant="h4">
        Bienvenido, {userName}!
      </Typography>
    </Container>
  );
};

export default Home;