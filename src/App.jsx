// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";
import { PapasProvider } from "./context/PapasProvider";

import Navbar from "./components/navbar";
import Inicio from "./pages/Inicio";
import Papas from "./pages/Papas";
import PapaDetail from "./pages/PapaDetail";
import Sesion from "./pages/Sesion";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Payment from "./pages/Payment";

// 🔹 Admin
import AdminPapas from "./pages/admin/AdminPapas";
import CrearPapa from "./pages/admin/CrearPapa";
import EditarPapa from "./pages/admin/EditarPapa";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import EditarUsuario from "./pages/admin/EditarUsuario";
import AdminDashboard from "./pages/admin/AdminDashboard";


import "./styles/App.css";

function App() {
  return (
    <PapasProvider>
      <LoginProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Papas" element={<Papas />} />
            <Route path="/PapaDetail/:id" element={<PapaDetail />} />
            <Route path="/Sesion" element={<Sesion />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/Payment" element={<Payment />} />

            {/* 🔹 Rutas admin */}
           <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/papas" element={<AdminPapas />} />
            <Route path="/admin/papas/crear" element={<CrearPapa />} />
            <Route path="/admin/papas/editar/:id" element={<EditarPapa />} />
            <Route path="/admin/usuarios" element={<AdminUsuarios />} />
            <Route path="/admin/usuarios/editar/:id" element={<EditarUsuario />} />
          </Routes>
        </Router>
      </LoginProvider>
    </PapasProvider>
  );
}

export default App;
