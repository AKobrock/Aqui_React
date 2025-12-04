import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPapa } from "../../services/PapaService";
import { usePapas } from "../../context/PapasProvider";

const initialForm = {
  nombre: "",
  apellido: "",
  rut: "",
  fechaNacimiento: "",
  nacionalidad: "",
  ocupacion: "",
  estadoCivil: "",
  numeroHijos: 1,
  hobbies: "",
  tipoPapa: "",
  lema: "",
  descripcion: "",
  precio: 0,
  imagenURL: "",
};

function CrearPapa() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { addPapa } = usePapas(); // 🟩 << NECESARIO

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "numeroHijos" || name === "precio" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const nuevoPapa = await createPapa(form);

      // Añadir al contexto sin recargar
      addPapa(nuevoPapa.data || nuevoPapa);

      alert("Papá creado correctamente");

      // Enviar directo a /Papas para ver inmediatamente el nuevo papá
      navigate("/Papas");

    } catch (err) {
      console.error(err);
      setError(
        "Ocurrió un error al crear el papá. Revisa los datos (edad ≥ 30, al menos 1 hijo, RUT único, etc.)"
      );
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-center">Agregar nuevo Papá</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="row g-3">

        {/* Nombre */}
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Apellido */}
        <div className="col-md-6">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            name="apellido"
            className="form-control"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </div>

        {/* RUT */}
        <div className="col-md-6">
          <label className="form-label">RUT</label>
          <input
            type="text"
            name="rut"
            className="form-control"
            value={form.rut}
            onChange={handleChange}
            required
          />
        </div>

        {/* Fecha de nacimiento */}
        <div className="col-md-6">
          <label className="form-label">Fecha de nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            className="form-control"
            value={form.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nacionalidad */}
        <div className="col-md-6">
          <label className="form-label">Nacionalidad</label>
          <input
            type="text"
            name="nacionalidad"
            className="form-control"
            value={form.nacionalidad}
            onChange={handleChange}
            required
          />
        </div>

        {/* Ocupación */}
        <div className="col-md-6">
          <label className="form-label">Ocupación</label>
          <input
            type="text"
            name="ocupacion"
            className="form-control"
            value={form.ocupacion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Estado civil */}
        <div className="col-md-6">
          <label className="form-label">Estado civil</label>
          <input
            type="text"
            name="estadoCivil"
            className="form-control"
            value={form.estadoCivil}
            onChange={handleChange}
            required
          />
        </div>

        {/* Número de hijos */}
        <div className="col-md-6">
          <label className="form-label">Número de hijos</label>
          <input
            type="number"
            min={1}
            name="numeroHijos"
            className="form-control"
            value={form.numeroHijos}
            onChange={handleChange}
            required
          />
        </div>

        {/* Hobbies */}
        <div className="col-12">
          <label className="form-label">Hobbies</label>
          <input
            type="text"
            name="hobbies"
            className="form-control"
            value={form.hobbies}
            onChange={handleChange}
          />
        </div>

        {/* Tipo de papá */}
        <div className="col-md-6">
          <label className="form-label">Tipo de papá</label>
          <input
            type="text"
            name="tipoPapa"
            className="form-control"
            value={form.tipoPapa}
            onChange={handleChange}
            required
          />
        </div>

        {/* Lema */}
        <div className="col-md-6">
          <label className="form-label">Lema</label>
          <input
            type="text"
            name="lema"
            className="form-control"
            value={form.lema}
            onChange={handleChange}
          />
        </div>

        {/* Descripción */}
        <div className="col-12">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        {/* Precio */}
        <div className="col-md-6">
          <label className="form-label">Precio</label>
          <input
            type="number"
            min={0}
            name="precio"
            className="form-control"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        {/* Imagen URL */}
        <div className="col-md-6">
          <label className="form-label">URL de la imagen</label>
          <input
            type="text"
            name="imagenURL"
            className="form-control"
            value={form.imagenURL}
            onChange={handleChange}
            placeholder="/assets/papa_nuevo.jpg"
            required
          />
        </div>

        {/* Botones */}
        <div className="col-12 d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Volver
          </button>
          <button type="submit" className="btn btn-success">
            Agregar papá
          </button>
        </div>

      </form>
    </div>
  );
}

export default CrearPapa;
