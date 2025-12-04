import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  reactivateUser,
} from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [filterEstado, setFilterEstado] = useState("todos");
  const [page, setPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsers();
      setUsuarios(data?.data || data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEditar = (id) => {
    navigate(`/admin/usuarios/editar/${id}`);
  };

  const handleDeleteConfirmed = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);
      setUsuarios((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setSelectedUser(null);
      alert("Usuario eliminado correctamente.");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar usuario.");
    }
  };

  const handleReactivar = async (id, username) => {
    const confirmado = window.confirm(
      `¿Reactivar al usuario "${username}"?`
    );
    if (!confirmado) return;

    try {
      const actualizado = await reactivateUser(id);
      const userActualizado = actualizado.data || actualizado;

      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? userActualizado : u))
      );

      alert("Usuario reactivado correctamente.");
    } catch (err) {
      console.error(err);
      alert("Error al reactivar usuario.");
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return "—";
    return fecha.toString().replace("T", " ").slice(0, 16);
  };

  // ========= FILTRO + BUSCADOR =========

  const normalizar = (s) =>
    (s || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filtrados = usuarios.filter((u) => {
    // Filtro por estado
    if (filterEstado === "activos" && !u.active) return false;
    if (filterEstado === "inactivos" && u.active) return false;

    // Buscador
    if (!search.trim()) return true;
    const term = normalizar(search);
    return (
      normalizar(u.username).includes(term) ||
      normalizar(u.lastname).includes(term) ||
      normalizar(u.rut).includes(term) ||
      normalizar(u.email).includes(term)
    );
  });

  const totalPages = Math.ceil(filtrados.length / ITEMS_PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginaActual = filtrados.slice(startIndex, endIndex);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  useEffect(() => {
    setPage(1);
  }, [search, filterEstado]);

  if (loading) {
    return <p className="mt-5 pt-5 text-center">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="mt-5 pt-5 text-center text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5 pt-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="mb-1">👤 Panel Administrador – Usuarios</h2>
          <small className="text-muted">
            Revisa, filtra, edita, reactiva o elimina usuarios.
          </small>
        </div>

        <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, email o RUT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select w-auto"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="activos">Activos</option>
            <option value="inactivos">Inactivos</option>
          </select>
        </div>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Usuario</th>
              <th>RUT</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th>Última actividad</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {paginaActual.map((u) => (
              <tr key={u.id}>
                <td>
                  <strong>{u.username}</strong> {u.lastname}
                </td>
                <td>{u.rut}</td>
                <td>{u.email}</td>
                <td>{u.address || "—"}</td>
                <td className="text-center">
                  {u.active ? (
                    <span className="badge bg-success px-3 py-2">Activo</span>
                  ) : (
                    <span className="badge bg-secondary px-3 py-2">
                      Inactivo
                    </span>
                  )}
                </td>
                <td>{formatFecha(u.lastActivity)}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEditar(u.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setSelectedUser(u)}
                    >
                      Eliminar
                    </button>
                    {!u.active && (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleReactivar(u.id, u.username)}
                      >
                        Reactivar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filtrados.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No se encontraron usuarios con ese filtro/búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filtrados.length > ITEMS_PER_PAGE && (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            « Anterior
          </button>

          <span>
            Página {currentPage} de {totalPages}
          </span>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente »
          </button>
        </div>
      )}

      {/* MODAL ELIMINACIÓN */}
      {selectedUser && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Eliminar Usuario</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ¿Seguro que quieres eliminar al usuario{" "}
                  <strong>
                    {selectedUser.username} {selectedUser.lastname}
                  </strong>
                  ?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteConfirmed}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </div>
      )}
    </div>
  );
}

export default AdminUsuarios;


//Lista usuarios, muestra si están activos o no, permite reactivar y eliminar.