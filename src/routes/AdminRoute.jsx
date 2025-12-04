import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminRoute({ children }) {
  const { admin, token } = useAdminAuth();

  // Si no hay token o admin → redirigir
  if (!token || !admin) return <Navigate to="/admin/login" replace />;

  return children;
}

