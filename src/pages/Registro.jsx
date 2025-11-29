import { useState } from "react";
import papahijo from "../assets/papahijopayment.webp"; // Se importa la imagen

export default function Registro() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", newsletter: true });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Requerido";
    if (!form.lastName.trim()) e.lastName = "Requerido";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Correo inválido";
    if (form.password.length < 6) e.password = "La contraseña debe tener al menos 6 caracteres";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length === 0) {
      // simulated submit
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <>
      <section id="section-11" className="container py-5">
        <div className="row g-0 align-items-center justify-content-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: "blur(30px)" }}>
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Regístrate ahora</h2>
                {submitted && <div className="alert alert-success">Registro simulado con éxito</div>}
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input name="firstName" value={form.firstName} onChange={handleChange} type="text" id="firstName" className={`form-control ${errors.firstName ? "is-invalid" : ""}`} placeholder="Primer nombre" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input name="lastName" value={form.lastName} onChange={handleChange} type="text" id="lastName" className={`form-control ${errors.lastName ? "is-invalid" : ""}`} placeholder="Apellidos" />
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input name="email" value={form.email} onChange={handleChange} type="email" id="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Correo electrónico"/>
                  </div>

                  <div className="form-outline mb-4">
                    <input name="password" value={form.password} onChange={handleChange} type="password" id="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} placeholder="Contraseña" />
                  </div>

                  <div className="form-check d-flex justify-content-center mb-4">
                    <input name="newsletter" checked={form.newsletter} onChange={handleChange} className="form-check-input me-2" type="checkbox" id="newsletter" />
                    <label className="form-check-label" htmlFor="newsletter">
                      Suscríbete para recibir promociones y noticias
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Registrarse</button>

                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 d-none d-lg-block">
            <img src={papahijo} className="w-100 rounded-4 shadow-4" alt="Hombre e hijo sentados en un sofá" />
          </div>
        </div>
      </section>
    </>
  );
}