import { Link } from "react-router-dom"

function Navbar(){
    return (
         <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Aquí Papá</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        
        <li class="nav-item">
          <Link to="/" class="nav-link">Inicio </Link>
        </li>
        <li class="nav-item">
          <Link to="/Papas" class="nav-link">Papás </Link>
        </li>
        <li class="nav-item">
          <Link to="/Nosotros" class="nav-link">Nosotros </Link>
        </li>
        <li class="nav-item">
          <Link to="/Contacto" class="nav-link">Contacto  </Link>
        </li>
        <li class="nav-item">
          <Link to="/Registro" class="nav-link">Registro  </Link>
        </li>
      </ul>
    </div>
    <div class="text-end">
      <a href="sesion.html" class="btn btn-outline-light me-2">Login</a>
      <a href="registro.html" class="btn btn-warning">Sign-up</a>
    </div>
  </div>
</nav>
    )
}

export default Navbar