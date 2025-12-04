import { createContext, useContext, useEffect, useState } from "react";

// ============================================
// 🔐 Función para verificar si un JWT expiró
// ============================================
function isTokenExpired(token) {
  try {
    const [, payload] = token.split(".");
    const data = JSON.parse(atob(payload)); // decodifica el JWT
    const now = Date.now() / 1000;

    return data.exp < now; // true → expiró
  } catch (e) {
    return true; // si falla, tratamos como expirado
  }
}

export const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);

  // ============================================
  // 🔄 Verificar expiración del token al cargar app
  // ============================================
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logoutAdmin();
    }
  }, []);

  // ============================================
  // 🟢 LOGIN ADMIN
  // ============================================
  const loginAdmin = (adminData, tokenData) => {
    setAdmin(adminData);
    setToken(tokenData);

    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("adminToken", tokenData);
  };

  // ============================================
  // 🔴 LOGOUT ADMIN
  // ============================================
  const logoutAdmin = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);


//Guarda al administrador en localStorage