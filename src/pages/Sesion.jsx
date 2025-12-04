import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import { loginUserService } from "../services/AuthService";

function Sesion() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { loginUser } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUserService(form);

      const { token, user } = data;

      loginUser(user, token);

      navigate("/perfil");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-3 text-center">Iniciar sesión</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="col-md-4 mx-auto">
        <label className="form-label">Email</label>
        <input 
          type="email"
          name="email"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <label className="form-label">Contraseña</label>
        <input 
          type="password"
          name="password"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
}

export default Sesion;
