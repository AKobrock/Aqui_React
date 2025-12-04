import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdminService } from "../../services/AdminService";
import { useAdminAuth } from "../../context/AdminAuthContext";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();  // contexto admin

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Llama a tu backend
      const data = await loginAdminService(form);

      /** 
       * Esperamos estructura:
       * {
       *    token: "...",
       *    admin: { id, email, username, rol }
       * }
       */
      const { token, admin } = data;

      // Validar rol
      if (!admin || admin.rol !== "ADMIN") {
        setError("No tienes permisos de administrador.");
        return;
      }

      // Guardar en contexto global
      loginAdmin(admin, token);

      // Redirigir al dashboard
      navigate("/admin");

    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas o servidor no responde.");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Ingreso Administrador</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="col-md-4 mx-auto">

        <label className="form-label">Correo</label>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="form-label">Contraseña</label>
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
