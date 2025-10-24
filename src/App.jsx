import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Perfil from './Perfil';
import { LoginProvider } from './LoginContext';
import Navbar from './navbar';
import Inicio from './Inicio.jsx';
import Papas from './Papas';
import Nosotros from './Nosotros.jsx';
import Contacto from './Contacto.jsx';
import './styles.css';
import Sesion from './Sesion.jsx';
import Registro from './Registro.jsx';
import Home from './pages/Home.jsx';
import PapaDetail from './PapaDetail.jsx';
import Payment from './Payment.jsx';

function App() {
  return (
    <LoginProvider>
      <Router>
        <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Papas" element={<Papas/>} />
            <Route path="/Nosotros" element={<Nosotros/>} />
            <Route path="/Contacto" element={<Contacto/>} />
            <Route path="/Sesion" element={<Sesion />} />
            <Route path="/login" element={<Sesion />} />
            <Route path="/Registro" element={<Registro/>}/>
            <Route path="/payment" element={<Payment/>} />
            <Route path="/Home" element={<Home/>}/>
            <Route path="/PapaDetail/:id" element={<PapaDetail />} />
          </Routes>
        </div>
      </Router>
    </LoginProvider>
  );
}

export default App;
