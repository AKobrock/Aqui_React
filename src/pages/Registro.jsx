import { useState } from "react";
import papahijo from "./assets/papahijopayment.webp";

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
      <section id="section-11" className="pb-4">
        <h2 className="mb-4">Regístrate con nosotros</h2>

        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: "blur(30px)" }}>
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">Registrate ahora</h2>
                  {submitted && <div className="alert alert-success">Registro simulado con éxito</div>}
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input name="firstName" value={form.firstName} onChange={handleChange} type="text" id="firstName" className={`form-control ${errors.firstName ? "is-invalid" : ""}`} />
                          <label className="form-label" htmlFor="firstName">Primer nombre</label>
                          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input name="lastName" value={form.lastName} onChange={handleChange} type="text" id="lastName" className={`form-control ${errors.lastName ? "is-invalid" : ""}`} />
                          <label className="form-label" htmlFor="lastName">Apellidos</label>
                          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input name="email" value={form.email} onChange={handleChange} type="email" id="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} />
                      <label className="form-label" htmlFor="email">Correo electrónico</label>
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="form-outline mb-4">
                      <input name="password" value={form.password} onChange={handleChange} type="password" id="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} />
                      <label className="form-label" htmlFor="password">Contraseña</label>
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                      <input name="newsletter" checked={form.newsletter} onChange={handleChange} className="form-check-input me-2" type="checkbox" id="newsletter" />
                      <label className="form-check-label" htmlFor="newsletter">
                        Suscríbete a para promociones y noticias
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Registrarse</button>

                    
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <img src={papahijo} className="w-100 rounded-4 shadow-4" alt="Registration illustration" />
            </div>
          </div>
        </div>

        <div className="border rounded-5">
          <section className="w-100 p-4">
            <section className="text-center text-lg-start">
              {/* Los estilos deben ir en un archivo CSS */}
            </section>
          </section>
        </div>
      </section>
    </>
  );
}