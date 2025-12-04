
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginProvider } from "./context/LoginContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { PapasProvider } from "./context/PapasProvider";

import Navbar from "./components/navbar";

// Páginas públicas
import Inicio from "./pages/Inicio";
import Papas from "./pages/Papas";
import PapaDetail from "./pages/PapaDetail";
import Sesion from "./pages/Sesion";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Payment from "./pages/Payment";

// Admin – Papás
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPapas from "./pages/admin/AdminPapas";
import CrearPapa from "./pages/admin/CrearPapa";
import EditarPapa from "./pages/admin/EditarPapa";

// Admin – Usuarios
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import EditarUsuario from "./pages/admin/EditarUsuario";
import AdminUsuariosDashboard from "./pages/admin/AdminUsuariosDashboard";

// Rutas protegidas
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

import "./styles/App.css";

function App() {
  return (
    <PapasProvider>
      <LoginProvider>
        <AdminAuthProvider>
          <Router>
            <Navbar />

            <Routes>

              {/* ============================
                  RUTAS PÚBLICAS
              ============================ */}
              <Route path="/" element={<Inicio />} />
              <Route path="/papas" element={<Papas />} />
              <Route path="/papadetail/:id" element={<PapaDetail />} />
              <Route path="/sesion" element={<Sesion />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/perfil" element={
                <UserRoute>
                  <Perfil />
                </UserRoute>
              } />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/payment" element={<Payment />} />

              {/* ============================
                  RUTAS ADMIN PROTEGIDAS
              ============================ */}

              {/* Dashboard general */}
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />

              {/* Papás */}
              <Route 
                path="/admin/papas" 
                element={
                  <AdminRoute>
                    <AdminPapas />
                  </AdminRoute>
                } 
              />

              <Route 
                path="/admin/papas/crear" 
                element={
                  <AdminRoute>
                    <CrearPapa />
                  </AdminRoute>
                } 
              />

              <Route 
                path="/admin/papas/editar/:id" 
                element={
                  <AdminRoute>
                    <EditarPapa />
                  </AdminRoute>
                } 
              />

              {/* Usuarios */}
              <Route 
                path="/admin/usuarios" 
                element={
                  <AdminRoute>
                    <AdminUsuarios />
                  </AdminRoute>
                } 
              />

              <Route 
                path="/admin/usuarios/editar/:id" 
                element={
                  <AdminRoute>
                    <EditarUsuario />
                  </AdminRoute>
                } 
              />

              <Route 
                path="/admin/usuarios/dashboard" 
                element={
                  <AdminRoute>
                    <AdminUsuariosDashboard />
                  </AdminRoute>
                } 
              />

            </Routes>
          </Router>
        </AdminAuthProvider>
      </LoginProvider>
    </PapasProvider>
  );
}

export default App;
