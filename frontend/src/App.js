import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Panel from './panel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
