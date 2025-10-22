import { Link } from "react-router-dom";
import papa1 from "./assets/papa1.jpg";
import papa2 from "./assets/papa2.jpeg";
import papa3 from "./assets/papa3.jpg";
import portada1 from "./assets/portada_1.jpg";

import "./Inicio.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Inicio() {
  return (
    <>
      {/* Franja verde con imagen de portada */}
      <div className="franja-portada">
        <img src={portada1} alt="Portada Aquí Papá" className="imagen-portada" />
      </div>

      {/* Texto explicativo */}
      <div className="texto-explicativo text-center my-4">
        <h1>¡Aquí Papá!</h1>
        <p>
          Somos una empresa única y cercana que ofrece la renta de figuras
          paternas para quienes necesiten apoyo, compañía y orientación en
          diferentes momentos de su vida. Desde estar presente en una graduación,
          enseñar a conducir, brindar consejos antes de un examen importante o
          simplemente dar apoyo emocional, nuestros papás están preparados para
          acompañar y hacer sentir a cada persona valorada y respaldada. Porque
          todos merecen tener a alguien que diga: "¡Estoy orgulloso de ti, hijo!"
        </p>
      </div>

      {/* Carrusel con imágenes */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-inner">
          {/* Héctor */}
          <div className="carousel-item active">
            <img
              src={papa1}
              className="d-block w-100 rounded-top"
              alt="Héctor Sanhueza"
            />
            <div className="ficha-papa">
              <h5>Héctor Sanhueza</h5>
              <p>
                “La receta de la vida siempre necesita un poco de paciencia y mucho cariño.”
              </p>
              <div className="star-rating mb-2">★★★★★</div>
              <Link to="/Papas/Hector" className="btn btn-light mt-2">
                Más info
              </Link>
            </div>
          </div>

          {/* Marcelo */}
          <div className="carousel-item">
            <img
              src={papa2}
              className="d-block w-100 rounded-top"
              alt="Marcelo Fuentes"
            />
            <div className="ficha-papa">
              <h5>Marcelo Fuentes</h5>
              <p>
                “Si algo se rompe, se arregla; y si no se puede, se aprende de ello.”
              </p>
              <div className="star-rating mb-2">★★★★☆</div>
              <Link to="/Papas/Marcelo" className="btn btn-light mt-2">
                Más info
              </Link>
            </div>
          </div>

          {/* Ricardo */}
          <div className="carousel-item">
            <img
              src={papa3}
              className="d-block w-100 rounded-top"
              alt="Ricardo Montalvo"
            />
            <div className="ficha-papa">
              <h5>Ricardo Montalvo</h5>
              <p>
                “La vida se entiende mirando hacia atrás, pero se vive hacia adelante.”
              </p>
              <div className="star-rating mb-2">★★★★★</div>
              <Link to="/Papas/Ricardo" className="btn btn-light mt-2">
                Más info
              </Link>
            </div>
          </div>
        </div>

        {/* Controles */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </>
  );
}

export default Inicio;