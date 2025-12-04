import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../services/UserService";

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  const cargarUsuario = async () => {
    try {
      const data = await getUserById(id);
      const usuario = data.data || data;

      setForm({
        ...usuario,
      });
    } catch (err) {
      console.error(err);
      setError("Error al cargar usuario.");
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updated = await updateUser(id, form);

      alert("Usuario actualizado correctamente.");
      navigate("/admin/usuarios");

    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el usuario.");
    }
  };

  if (!form) {
    return <p className="mt-5 pt-5 text-center">Cargando usuario...</p>;
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">
        Editar Usuario – {form.username} {form.lastname}
      </h2>

      {error && <p className="alert alert-danger">{error}</p>}

      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={form.username}
            disabled
          />
        </div>

        {/* Apellido */}
        <div className="col-md-6">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            value={form.lastname}
            disabled
          />
        </div>

        {/* RUT */}
        <div className="col-md-6">
          <label className="form-label">RUT</label>
          <input type="text" className="form-control" value={form.rut} disabled />
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Dirección */}
        <div className="col-12">
          <label className="form-label">Dirección</label>
          <input
            name="address"
            type="text"
            className="form-control"
            value={form.address || ""}
            onChange={handleChange}
          />
        </div>

        {/* Avatar */}
        <div className="col-12">
          <label className="form-label">URL Avatar</label>
          <input
            name="avatarURL"
            type="text"
            className="form-control"
            value={form.avatarURL || ""}
            onChange={handleChange}
          />
        </div>

        {/* Botones */}
        <div className="col-12 d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Volver
          </button>

          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarUsuario;

//editar email, password, address, avatarURL