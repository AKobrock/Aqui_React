import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  reactivateUser,
} from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Para modal
  const navigate = useNavigate();

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsers();
      setUsuarios(data?.data || data); // Si backend envía APIResponse

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
      setUsuarios((prev) => prev.filter((u) => u.id !== selectedUser.id)); // 🔥 sin recargar

      setSelectedUser(null);
      alert("Usuario eliminado correctamente.");

    } catch (err) {
      console.error(err);
      alert("Error al eliminar usuario.");
    }
  };

  const handleReactivar = async (id, username) => {
    const confirmar = window.confirm(`¿Reactivar al usuario "${username}"?`);
    if (!confirmar) return;

    try {
      const actualizado = await reactivateUser(id);

      // 🔥 actualizar solo ese usuario
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? (actualizado.data || actualizado) : u))
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

  if (loading) {
    return <p className="mt-5 pt-5 text-center">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="mt-5 pt-5 text-center text-danger">{error}</p>;
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-center">👤 Panel Administrador – Usuarios</h2>

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
            {usuarios.map((u) => (
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
                    <span className="badge bg-secondary px-3 py-2">Inactivo</span>
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

            {usuarios.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ============================
            MODAL ELIMINACIÓN
         ============================ */}
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
                  ¿Estás seguro que deseas eliminar al usuario{" "}
                  <strong>{selectedUser.username} {selectedUser.lastname}</strong>?
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
        </div>
      )}
    </div>
  );
}

export default AdminUsuarios;

//Lista usuarios, muestra si están activos o no, permite reactivar y eliminar.