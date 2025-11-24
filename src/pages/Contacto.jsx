import { useState } from "react";

function Contacto() {
    const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "mensaje" && value.length > 1000) return; // enforce max client-side
        setForm((s) => ({ ...s, [name]: value }));
    };

    const validate = () => {
        const e = {};
        if (!form.nombre.trim()) e.nombre = "Requerido";
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Correo inválido";
        if (!form.mensaje.trim()) e.mensaje = "Requerido";
        if (form.mensaje.length > 1000) e.mensaje = "Máximo 1000 caracteres";
        return e;
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length === 0) {
            // Simulate submit
            alert("Mensaje enviado (simulado)");
            setForm({ nombre: "", email: "", mensaje: "" });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Contáctanos</h2>

                    <div className="row justify-content-center">
                <div className="col-12" style={{ width: 800, maxWidth: '100%', margin: "0 auto" }}>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input name="nombre" value={form.nombre} onChange={handleChange} type="text" className={`form-control ${errors.nombre ? "is-invalid" : ""}`} id="nombre" required />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo electrónico</label>
                            <input name="email" value={form.email} onChange={handleChange} type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} id="email" required />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mensaje" className="form-label">Mensaje</label>
                            <textarea name="mensaje" value={form.mensaje} onChange={handleChange} className={`form-control ${errors.mensaje ? "is-invalid" : ""}`} id="mensaje" rows="6" required />
                            <div className="form-text text-end">{form.mensaje.length}/1000</div>
                            {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contacto;