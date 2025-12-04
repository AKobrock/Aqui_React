import { useState } from "react";
import papahijo from "../assets/papahijopayment.webp";
import { registerUserService } from "../services/UserService";

export default function Registro() {
  const [form, setForm] = useState({
    username: "",
    lastname: "",
    rut: "",
    address: "",
    email: "",
    password: "",
    active: true
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Requerido";
    if (!form.lastname.trim()) e.lastname = "Requerido";
    if (!form.rut.trim()) e.rut = "Requerido";
    if (!form.address.trim()) e.address = "Requerido";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Correo inválido";
    if (form.password.length < 6) e.password = "La contraseña debe tener al menos 6 caracteres";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);

    if (Object.keys(eObj).length > 0) return;

    console.log("📤 ENVIANDO AL BACKEND:", form);

    try {
      const response = await registerUserService(form);
      console.log("✅ Registrado correctamente:", response);

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);

    } catch (err) {
      console.error("❌ Error al registrar:", err);
      alert("Error al registrar usuario: " + err.message);
    }
  };

  return (
    <section className="container py-5">
      <div className="row g-0 justify-content-center align-items-center">

        <div className="col-lg-6 card p-5 shadow-5 bg-body-tertiary">
          <h2 className="fw-bold mb-4 text-center">Regístrate ahora</h2>

          {submitted && <div className="alert alert-success">Registro completado con éxito</div>}

          <form onSubmit={handleSubmit} noValidate>

            {/* Nombre */}
            <input
              name="username"
              placeholder="Nombre"
              className={`form-control mb-3 ${errors.username ? "is-invalid" : ""}`}
              value={form.username}
              onChange={handleChange}
            />

            {/* Apellido */}
            <input
              name="lastname"
              placeholder="Apellido"
              className={`form-control mb-3 ${errors.lastname ? "is-invalid" : ""}`}
              value={form.lastname}
              onChange={handleChange}
            />

            {/* RUT */}
            <input
              name="rut"
              placeholder="RUT (ej: 12345678-9)"
              className={`form-control mb-3 ${errors.rut ? "is-invalid" : ""}`}
              value={form.rut}
              onChange={handleChange}
            />

            {/* Dirección */}
            <input
              name="address"
              placeholder="Dirección"
              className={`form-control mb-3 ${errors.address ? "is-invalid" : ""}`}
              value={form.address}
              onChange={handleChange}
            />

            {/* Email */}
            <input
              name="email"
              placeholder="Correo electrónico"
              type="email"
              className={`form-control mb-3 ${errors.email ? "is-invalid" : ""}`}
              value={form.email}
              onChange={handleChange}
            />

            {/* Contraseña */}
            <input
              name="password"
              placeholder="Contraseña"
              type="password"
              className={`form-control mb-3 ${errors.password ? "is-invalid" : ""}`}
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Registrarse
            </button>
          </form>
        </div>

        <div className="col-lg-6 d-none d-lg-block">
          <img src={papahijo} className="w-100 rounded-4 shadow-4" />
        </div>

      </div>
    </section>
  );
}
