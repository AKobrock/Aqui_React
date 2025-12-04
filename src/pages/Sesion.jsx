import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext"; // Hook de login
import { loginUserService } from "../services/AuthService";

function Sesion() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useLogin(); // contexto del usuario

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 🔵 Llamar al backend
      const data = await loginUserService(form);

      // 🔵 Guardar en contexto global
      loginUser(data.user, data.token);

      alert("¡Bienvenido!");

      // Redirigir
      navigate("/perfil");
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Iniciar sesión</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="mt-3">Contraseña:</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary w-100 mt-4">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Sesion;
