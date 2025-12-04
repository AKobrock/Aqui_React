import { useState } from "react";
import { Link } from "react-router-dom";
import { usePapas } from "../../context/PapasProvider";
import { deletePapa } from "../../services/PapaService";
import "../../styles/Admin.css";

function AdminPapas() {
  const { papas, loading, removePapa, refreshPapas } = usePapas();
  const [selectedPapa, setSelectedPapa] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const openDeleteModal = (papa) => {
    setSelectedPapa(papa);
    setError(null);
  };

  const closeDeleteModal = () => {
    setSelectedPapa(null);
    setDeleting(false);
    setError(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPapa) return;
    setDeleting(true);
    setError(null);

    try {
      await deletePapa(selectedPapa.id);
      removePapa(selectedPapa.id);
      closeDeleteModal();
      alert(`Papá "${selectedPapa.nombre} ${selectedPapa.apellido}" eliminado.`);
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el papá. Intenta nuevamente.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="spinner-border text-success mb-3" role="status" />
        <p>Cargando papás...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5 admin-papas">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Gestión de Papás</h2>
          <small className="text-muted">
            Administra el catálogo completo de papás disponibles.
          </small>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={refreshPapas}
          >
            🔄 Actualizar
          </button>
          <Link to="/admin/papas/crear" className="btn btn-success">
            + Agregar papá
          </Link>
        </div>
      </div>

      {papas.length === 0 ? (
        <div className="alert alert-info">
          No hay papás registrados todavía.{" "}
          <Link to="/admin/papas/crear">Agrega el primero aquí.</Link>
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded admin-table-wrapper">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Edad</th>
                <th>Precio</th>
                <th>Hijos</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {papas.map((papa) => (
                <tr key={papa.id} className="admin-row-appear">
                  <td style={{ width: "70px" }}>
                    <img
                      src={papa.imagenURL}
                      alt={papa.nombre}
                      className="img-thumbnail admin-papa-thumb"
                    />
                  </td>
                  <td>
                    <div className="fw-semibold">
                      {papa.nombre} {papa.apellido}
                    </div>
                    <div className="small text-muted">{papa.ocupacion}</div>
                  </td>
                  <td>{papa.tipoPapa}</td>
                  <td>{papa.edad ?? "—"}</td>
                  <td>${(papa.precio || 0).toLocaleString("es-CL")}</td>
                  <td>{papa.numeroHijos}</td>
                  <td className="text-center">
                    <div className="btn-group btn-group-sm">
                      <Link
                        to={`/PapaDetail/${papa.id}`}
                        className="btn btn-outline-secondary"
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/admin/papas/editar/${papa.id}`}
                        className="btn btn-outline-primary"
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => openDeleteModal(papa)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de confirmación */}
      {selectedPapa && (
        <div className="modal fade show d-block admin-modal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeDeleteModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Seguro que deseas eliminar al papá{" "}
                  <strong>
                    {selectedPapa.nombre} {selectedPapa.apellido}
                  </strong>
                  ?
                </p>
                <p className="small text-muted mb-0">
                  Esta acción es definitiva y no se puede deshacer.
                </p>
                {error && (
                  <div className="alert alert-danger mt-3 mb-0">{error}</div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeDeleteModal}
                  disabled={deleting}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                >
                  {deleting ? "Eliminando..." : "Eliminar papá"}
                </button>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
}

export default AdminPapas;
