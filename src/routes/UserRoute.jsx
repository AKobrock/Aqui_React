import { Navigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

export default function UserRoute({ children }) {
  const { user } = useLogin();

  if (!user) return <Navigate to="/sesion" replace />;

  return children;
}

//protección de usuarios