import { createContext, useContext, useState, useEffect } from "react";

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState(null);

  // Mantener sesión al recargar
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Login usuario normal
  const loginUser = (userData, token) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}

