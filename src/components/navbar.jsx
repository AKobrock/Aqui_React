import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useLogin } from "../context/LoginContext";

function Navbar() {
  const { admin, logoutAdmin } = useAdminAuth();
  const { user, logoutUser } = useLogin();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Aquí Papá</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>

            <li className="nav-item">
              <Link to="/papas" className="nav-link">Papás</Link>
            </li>

            <li className="nav-item">
              <Link to="/nosotros" className="nav-link">Nosotros</Link>
            </li>

            <li className="nav-item">
              <Link to="/contacto" className="nav-link">Contacto</Link>
            </li>

            {admin && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">Panel Admin</Link>
              </li>
            )}

          </ul>
        </div>

        {/* ⬇️ Contenedor derecha */}
        <div className="d-flex align-items-center ms-auto">

          {/* Usuario normal */}
          {user && (
            <span className="me-3 fw-bold">
              Hola, {user.username}
            </span>
          )}

          {/* 🎖 ADMIN en dorado */}
          {admin && (
            <span 
              className="me-3"
              style={{ color: "#FFD700", fontWeight: "bold" }}
            >
              👑 Admin: {admin.username}
            </span>
          )}

          {/* Botones login/logout */}
          {!user && !admin && (
            <>
              <Link to="/sesion" className="nav-link text-primary me-2">Ingresar</Link>
              <Link to="/registro" className="nav-link text-success">Registro</Link>
            </>
          )}

          {user && (
            <button className="btn btn-danger ms-3" onClick={logoutUser}>
              Cerrar sesión
            </button>
          )}

          {admin && (
            <button className="btn btn-warning ms-3" onClick={logoutAdmin}>
              Salir (Admin)
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
