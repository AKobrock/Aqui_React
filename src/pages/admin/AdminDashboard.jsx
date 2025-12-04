import { Link } from "react-router-dom";
import { usePapas } from "../../context/PapasProvider";
import "../../styles/Admin.css";

function AdminDashboard() {
  const { papas, loading } = usePapas();

  const totalPapas = papas.length;
  const precioPromedio =
    totalPapas > 0
      ? Math.round(
          papas.reduce((acc, p) => acc + (p.precio || 0), 0) / totalPapas
        )
      : 0;

  return (
    <div className="container mt-5 pt-5 admin-dashboard">
      <h1 className="mb-4 text-center">Panel de Administración</h1>
      <p className="text-center text-muted mb-5">
        Gestiona papás, usuarios y la experiencia completa de <strong>Aquí Papá</strong>.
      </p>

      <div className="row g-4">
        {/* Tarjeta resumen de Papás */}
        <div className="col-md-4">
          <div className="card shadow-sm admin-card h-100">
            <div className="card-body">
              <h5 className="card-title">Papás registrados</h5>
              <p className="display-5 fw-bold mb-1">
                {loading ? "…" : totalPapas}
              </p>
              <p className="text-muted mb-3">
                {totalPapas === 0
                  ? "Aún no hay papás en el catálogo."
                  : "Papás disponibles actualmente en la plataforma."}
              </p>
              <p className="mb-2">
                <strong>Precio promedio:</strong>{" "}
                {totalPapas > 0
                  ? `$${precioPromedio.toLocaleString("es-CL")}`
                  : "—"}
              </p>
              <Link to="/admin/papas" className="btn btn-success w-100 mt-3">
                Gestionar Papás
              </Link>
            </div>
          </div>
        </div>

        {/* Tarjeta de usuarios */}
        <div className="col-md-4">
          <div className="card shadow-sm admin-card h-100">
            <div className="card-body">
              <h5 className="card-title">Usuarios</h5>
              <p className="mb-3 text-muted">
                Revisa usuarios activos, inactivos, reactívalos o elimínalos
                según sea necesario.
              </p>
              <ul className="small text-muted mb-3">
                <li>Ver lista de usuarios</li>
                <li>Actualizar datos de contacto</li>
                <li>Reactivar cuentas inactivas</li>
              </ul>
              <Link to="/admin/usuarios" className="btn btn-outline-primary w-100">
                Gestionar usuarios
              </Link>
            </div>
          </div>
        </div>

        {/* Tarjeta de accesos rápidos */}
        <div className="col-md-4">
          <div className="card shadow-sm admin-card h-100">
            <div className="card-body">
              <h5 className="card-title">Accesos rápidos</h5>
              <p className="text-muted small">
                Atajos a las tareas más frecuentes del administrador.
              </p>
              <div className="d-grid gap-2 mt-3">
                <Link to="/admin/papas/crear" className="btn btn-outline-success btn-sm">
                  + Agregar nuevo papá
                </Link>
                <Link to="/Papas" className="btn btn-outline-secondary btn-sm">
                  Ver tienda pública
                </Link>
                <Link to="/" className="btn btn-outline-secondary btn-sm">
                  Ir al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
