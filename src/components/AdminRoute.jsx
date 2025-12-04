import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminRoute({ children }) {
  const { admin } = useAdminAuth();

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminRoute;
//Si no ta está autenticado, redirige a admin/login
//si ta, deja entrar