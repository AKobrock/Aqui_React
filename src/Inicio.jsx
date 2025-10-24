import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import portada1 from "./assets/portada_2.png";

import "./Inicio.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Inicio() {
  const [papas, setPapas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/papas.json')
      .then(response => response.json())
      .then(data => {
        setPapas(data.papas);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  // Obtener los primeros 3 papás para el carrusel
  const hector = papas.find(papa => papa.id === 2);
  const marcelo = papas.find(papa => papa.id === 5);
  const ricardo = papas.find(papa => papa.id === 1);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        {/* Franja verde con imagen de portada */}
        <div className="franja-portada">
          <div className="franja-inner">
            <img src={portada1} alt="Portada Aquí Papá" className="imagen-portada" />
          </div>
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
              {hector && (
                <>
                  <img
                    src={hector.image}
                    className="d-block w-100 rounded-top"
                    alt={hector.name}
                  />
                  <div className="ficha-papa">
                    <h5>{hector.name}</h5>
                    <p>
                      “La receta de la vida siempre necesita un poco de paciencia y mucho cariño.”
                    </p>
                    <div className="star-rating mb-2">★★★★★</div>
                    <Link to={`/PapaDetail/${hector.id}`} className="btn btn-success">
                      Más info
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Marcelo */}
            <div className="carousel-item">
              {marcelo && (
                <>
                  <img
                    src={marcelo.image}
                    className="d-block w-100 rounded-top"
                    alt={marcelo.name}
                  />
                  <div className="ficha-papa">
                    <h5>{marcelo.name}</h5>
                    <p>
                      “Si algo se rompe, se arregla; y si no se puede, se aprende de ello.”
                    </p>
                    <div className="star-rating mb-2">★★★★☆</div>
                    <Link to={`/PapaDetail/${marcelo.id}`} className="btn btn-success">
                      Más info
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Ricardo */}
            <div className="carousel-item">
              {ricardo && (
                <>
                  <img
                    src={ricardo.image}
                    className="d-block w-100 rounded-top"
                    alt={ricardo.name}
                  />
                  <div className="ficha-papa">
                    <h5>{ricardo.name}</h5>
                    <p>
                      “La vida se entiende mirando hacia atrás, pero se vive hacia adelante.”
                    </p>
                    <div className="star-rating mb-2">★★★★★</div>
                    <Link to={`/PapaDetail/${ricardo.id}`} className="btn btn-success">
                      Más info
                    </Link>
                  </div>
                </>
              )}
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
      </div>

      <footer className="site-footer">
        <div className="container">
          <small>Aquí Papá © 2025 — Todos los derechos reservados.</small>
        </div>
      </footer>
    </div>
  );
}

export default Inicio;