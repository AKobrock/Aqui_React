import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPapaByIdBackend, updatePapa, deletePapa } from "../../services/PapaService";
import { usePapas } from "../../context/PapasProvider";

function EditarPapa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePapaInList, removePapa } = usePapas(); // 🟩 IMPORTANTE

  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  // =============================
  //    CARGAR PAPÁ DESDE BACKEND
  // =============================
  const cargarPapa = async () => {
    try {
      setError(null);
      const data = await getPapaByIdBackend(id);

      const papa = data.data || data;

      setForm({
        ...papa,
        fechaNacimiento: papa.fechaNacimiento,
      });
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar el papá.");
    }
  };

  useEffect(() => {
    cargarPapa();
  }, [id]);

  // =============================
  //    MANEJAR CAMBIOS
  // =============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "numeroHijos" || name === "precio" ? Number(value) : value,
    }));
  };

  // =============================
  //        GUARDAR CAMBIOS
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const respuesta = await updatePapa(id, form);
      const papaActualizado = respuesta.data || respuesta;

      updatePapaInList(papaActualizado);

      alert("Papá actualizado correctamente");
      navigate("/admin/papas");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al actualizar el papá.");
    }
  };

  // =============================
  //        ELIMINAR PAPÁ
  // =============================
  const handleDelete = async () => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar definitivamente a ${form.nombre} ${form.apellido}?`
    );

    if (!confirmar) return;

    try {
      await deletePapa(id);

      // 🟩 eliminar del contexto global
      removePapa(id);

      alert("Papá eliminado correctamente");
      navigate("/admin/papas");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el papá.");
    }
  };

  if (!form) {
    return <p className="mt-5 pt-5 text-center">Cargando información...</p>;
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-center">
        Editar Papá: {form.nombre} {form.apellido}
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-3">
        {/* ================================
              CAMPOS NO EDITABLES
           ================================ */}

        <div className="col-md-4">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={form.nombre} disabled />
        </div>

        <div className="col-md-4">
          <label className="form-label">Apellido</label>
          <input type="text" className="form-control" value={form.apellido} disabled />
        </div>

        <div className="col-md-4">
          <label className="form-label">RUT</label>
          <input type="text" className="form-control" value={form.rut} disabled />
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha de nacimiento</label>
          <input type="date" className="form-control" value={form.fechaNacimiento} disabled />
        </div>

        <div className="col-md-4">
          <label className="form-label">Nacionalidad</label>
          <input type="text" className="form-control" value={form.nacionalidad} disabled />
        </div>

        <div className="col-md-4">
          <label className="form-label">Tipo de papá</label>
          <input type="text" className="form-control" value={form.tipoPapa} disabled />
        </div>

        {/* ================================
              CAMPOS EDITABLES
           ================================ */}

        <div className="col-md-6">
          <label className="form-label">Ocupación</label>
          <input
            type="text"
            name="ocupacion"
            className="form-control"
            value={form.ocupacion || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Estado civil</label>
          <input
            type="text"
            name="estadoCivil"
            className="form-control"
            value={form.estadoCivil || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Número de hijos</label>
          <input
            type="number"
            min={1}
            name="numeroHijos"
            className="form-control"
            value={form.numeroHijos}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-8">
          <label className="form-label">Hobbies</label>
          <input
            type="text"
            name="hobbies"
            className="form-control"
            value={form.hobbies || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Lema</label>
          <input
            type="text"
            name="lema"
            className="form-control"
            value={form.lema || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={form.descripcion || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio</label>
          <input
            type="number"
            min={0}
            name="precio"
            className="form-control"
            value={form.precio}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">URL imagen</label>
          <input
            type="text"
            name="imagenURL"
            className="form-control"
            value={form.imagenURL || ""}
            onChange={handleChange}
          />
        </div>

        {/* BOTONES */}
        <div className="col-12 d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Volver
          </button>

          {/* 🟥 ELIMINAR PAPÁ */}
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Eliminar papá
          </button>

          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarPapa;
