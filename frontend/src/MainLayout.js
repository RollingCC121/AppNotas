import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem('name'); // Obtener el nombre del usuario desde localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AppGenda
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate('/crear-pensum')}>
              Crear Pensum
            </Button>
            <Button color="inherit" onClick={() => navigate('/ver-pensum')}>
              Ver Pensum
            </Button>
            <Button color="inherit" onClick={() => navigate('/ver-semestre')}>
              Ver Semestre
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {location.pathname === '/' && (
        <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Typography variant="h4">
            Bienvenido, {userName}!
          </Typography>
        </Container>
      )}
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;