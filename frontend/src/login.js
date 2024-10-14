import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Llamada a la API para autenticar al usuario
      const response = await fetch('http://localhost:8001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Manejar el éxito del login, por ejemplo, guardar el token y el nombre del usuario en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user); // Asumiendo que el nombre del usuario viene en data.user
        // Redirigir al usuario al panel
        navigate('/panel');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate('/register')}>Register</button>
    </form>
  );
};

export default Login;