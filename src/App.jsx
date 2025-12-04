import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginProvider } from './context/LoginContext';
import Navbar from './components/navbar';
import Inicio from './pages/Inicio';
import Papas from './pages/Papas';
import PapaDetail from './pages/PapaDetail';
import Sesion from './pages/Sesion';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Payment from './pages/Payment';
import './styles/App.css';
import { PapasProvider } from "./context/PapasProvider";


function App() {
  return (
    <PapasProvider>
    <LoginProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/papas" element={<Papas />} />
            <Route path="/papa/:id" element={<PapaDetail />} />
            <Route path="/sesion" element={<Sesion />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </Router>
    </LoginProvider>
    </PapasProvider>
  );
}

export default App;
