import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Perfil from './Perfil';
import { LoginProvider } from './LoginContext';
import Navbar from './navbar';
import Inicio from './inicio';
import Papas from './Papas';
import Nosotros from './Nosotros.jsx';
import Contacto from './Contacto.jsx';
import './styles.css';
import Sesion from './Sesion.jsx';
import Registro from './Registro.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Papas" element={<Papas/>} />
          <Route path="/Nosotros" element={<Nosotros/>} />
          <Route path="/Contacto" element={<Contacto/>} />
          <Route path="/Sesion" element={<Sesion />} />
          <Route path="/Registro" element={<Registro/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Papas/:nombre" element={<></>}/>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
