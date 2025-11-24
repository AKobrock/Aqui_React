import { useState } from "react";

export default function Sesion() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Correo inválido";
    if (!form.password || form.password.length < 6) e.password = "Contraseña mínima 6 caracteres";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    }
  };

  return (
    <>
      <section id="section-11" className="pb-4">
        <div className="container py-4">
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="card cascading-right bg-body-tertiary" style={{ backdropFilter: "blur(30px)" }}>
                <div className="card-body p-5 shadow-5 text-center">
                  <h3 className="mb-4">Ingresa a tu cuenta</h3>
                  {submitted && <div className="alert alert-success">Ingreso simulado</div>}
                  <form id="loginForm" onSubmit={handleSubmit} noValidate>
                    <div className="form-outline mb-4">
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        id="typeEmailX-2"
                        className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`}
                        placeholder="Email"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        id="typePasswordX-2"
                        className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Password"
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        name="remember"
                        checked={form.remember}
                        onChange={handleChange}
                        className="form-check-input me-2"
                        type="checkbox"
                        id="form1Example3"
                      />
                      <label className="form-check-label" htmlFor="form1Example3">Recordar la contraseña</label>
                    </div>

                    <button className="btn btn-primary btn-block mb-4 w-100" type="submit">Ingresar</button>
                  </form>

                  <hr className="my-4" />

                  <button className="btn btn-lg btn-block w-100 mb-2 text-white" type="button">
                    <i className="fab fa-google me-2"></i> Ingresa con Google
                  </button>
                  <button className="btn btn-lg btn-block w-100 text-white" type="button">
                    <i className="fab fa-facebook-f me-2"></i> Ingresa con Facebook
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}