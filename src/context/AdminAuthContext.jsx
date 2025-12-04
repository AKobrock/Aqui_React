import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  // Cargar admin desde localStorage cuando inicia la app
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminData");
    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
  }, []);

  // Login Admin
  const loginAdmin = (adminData, token) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminData", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  // Logout admin
  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

//Guarda al administrador en localStorage