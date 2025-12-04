import { Link } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useLogin } from "../context/LoginContext";

function Navbar() {
  const { admin, logoutAdmin } = useAdminAuth();
  const { user, logoutUser } = useLogin();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          Aquí Papá
        </Link>

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

            {/* SOLO se muestra si hay admin */}
            {admin && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">Panel Admin</Link>
              </li>
            )}

            {/* Si es usuario normal */}
            {user && (
              <li className="nav-item">
                <Link to="/perfil" className="nav-link">Mi Perfil</Link>
              </li>
            )}
          </ul>

          {/* ============================
              BARRA DERECHA DEL NAVBAR
          ============================= */}
          <div className="d-flex align-items-center ms-auto">

            {/* Saludo si hay admin */}
            {admin && (
              <span className="me-3 fw-bold text-primary">
                Hola, Admin {admin.username}
              </span>
            )}

            {/* Saludo si hay usuario */}
            {user && (
              <span className="me-3 fw-bold text-success">
                Hola, {user.username}
              </span>
            )}

            {/* Si NO hay nadie logueado → mostrar botones login */}
            {!admin && !user && (
              <>
                <Link to="/sesion" className="nav-link text-dark me-2">
                  Ingresar
                </Link>
                <Link to="/registro" className="nav-link text-dark">
                  Registro
                </Link>
              </>
            )}

            {/* Botón Cerrar sesión usuario */}
            {user && (
              <button className="btn btn-outline-danger ms-3" onClick={logoutUser}>
                Cerrar sesión
              </button>
            )}

            {/* Botón Cerrar sesión admin */}
            {admin && (
              <button className="btn btn-danger ms-3" onClick={logoutAdmin}>
                Cerrar sesión Admin
              </button>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
