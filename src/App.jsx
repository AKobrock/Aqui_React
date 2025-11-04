import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginProvider } from './context/LoginContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Papas from './pages/Papas';
import PapaDetail from './pages/PapaDetail';
import Sesion from './pages/Sesion';
import Registro from './pages/Registro';
import './App.css';

function App() {
  return (
    <LoginProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/papas" element={<Papas />} />
            <Route path="/PapaDetail/:id" element={<PapaDetail />} />
            <Route path="/sesion" element={<Sesion />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </div>
      </Router>
    </LoginProvider>
  );
}

export default App;
