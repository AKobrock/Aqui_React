import { createContext, useContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ================================
  // 🔐 FUNCIÓN PARA DETECTAR EXPIRACIÓN DEL TOKEN JWT
  // ================================
  function isTokenExpired(token) {
    try {
      const [, payload] = token.split(".");
      const data = JSON.parse(atob(payload)); // decodifica
      const now = Date.now() / 1000;

      return data.exp < now; // exp es timestamp UNIX
    } catch (e) {
      return true; // si falla → tratamos token como inválido
    }
  }

  // ====================================
  // 🔐 EFECTO PARA VALIDAR TOKEN AL CARGAR LA APP
  // ====================================
    useEffect(() => {
        if (token && isTokenExpired(token)) {
            logoutUser();
        }
    }, [token]);


  // ================================
  // 🔐 LOGIN DEL USUARIO
  // ================================
  const loginUser = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("token", tokenData);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  // ================================
  // 🔐 LOGOUT DEL USUARIO
  // ================================
  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  return (
    <LoginContext.Provider
      value={{ user, token, loginUser, logoutUser }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => useContext(LoginContext);
