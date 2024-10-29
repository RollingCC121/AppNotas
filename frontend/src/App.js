import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Home from './home';
import VerPensum from './VerPensum';
import VerSemestre from './VerSemestre';
import CrearPensum from './CrearPensum';
import MainLayout from './MainLayout';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {token ? (
          <Route path="/" element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/crear-pensum" element={<CrearPensum />} />
            <Route path="/ver-pensum" element={<VerPensum />} />
            <Route path="/ver-semestre" element={<VerSemestre />} />
          </Route>
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;