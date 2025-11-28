import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Aquí Papá</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/Papas" className="nav-link">Papás</Link>
            </li>
            <li className="nav-item">
              <Link to="/Nosotros" className="nav-link">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link to="/Contacto" className="nav-link">Contacto</Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center ms-auto">
          <Link to="/sesion" className="nav-link text-light me-2">Ingresar</Link>
          <Link to="/registro" className="nav-link text-light">Registro</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;