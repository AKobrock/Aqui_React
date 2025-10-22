import { Link } from "react-router-dom";
import papa1 from "./assets/papa1.jpg";
import papa2 from "./assets/papa2.jpeg";
import papa3 from "./assets/papa3.jpg";
import papa4 from "./assets/papa4.webp";
import papa5 from "./assets/papa5.jpg";
import papa6 from "./assets/papa6.jpg";
import papa_yuli from "./assets/papa_yuli.jpg";
import papa_pancho from "./assets/papa_pancho.jpg";


function Papas() {
  return (
    <>
      <section className="py-5 text-center container">
        <div className="texto-explicativo">
          <h1>¡Aquí Papá!</h1>
          <p>
            En Aquí Papá! tenemos diferentes tipos de papás para cada ocasión:
            cariñosos, consejeros, divertidos, protectores o sabios. Cada uno con
            cualidades únicas, listos para acompañarte en momentos especiales,
            enseñarte nuevas cosas o darte el consejo que necesitas.
          </p>
        </div>

        <div className="divider"></div>

        <div className="album-papas">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

              {/* Papá Héctor */}
              <div className="col">
                <div className="card shadow-sm">
                  <img
                    src={papa1}
                    className="card-img-top"
                    alt="Héctor Sanhueza"
                  />
                  <div className="card-body">
                    <h5>Héctor Sanhueza</h5>
                    <p className="card-text">
                      “La receta de la vida siempre necesita un poco de paciencia y mucho cariño.”
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/Papas/Hector" className="btn btn-success">
                        Más info
                      </Link>
                      <small className="star-rating">★★★★★</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Papá Ricardo */}
              <div className="col">
                <div className="card shadow-sm">
                  <img
                    src={papa3}
                    alt="Ricardo Montalvo"
                  />
                  <div className="card-body">
                    <h5>Ricardo Montalvo</h5>
                    <p className="card-text">
                      "La vida se entiende mirando hacia atrás, pero se vive hacia adelante."
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/Papas/Ricardo" className="btn btn-success">
                        Más info
                      </Link>
                      <small className="star-rating">★★★★★</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Papá Francisco */}
              <div className="col">
                <div className="card shadow-sm">
                  <img
                    src={papa_pancho}
                    className="card-img-top"
                    alt="Francisco Kobrock"
                  />
                  <div className="card-body">
                    <h5>Francisco Kobrock</h5>
                    <p className="card-text">
                      "No tienes que cargar con todo solo, recuerda que siempre puedes apoyarte en mí para seguir adelante."
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/Papas/Francisco" className="btn btn-success">
                        Más info
                      </Link>
                      <small className="star-rating">★★★★★</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Papá Marcelo */}
              <div className="col">
                <div className="card shadow-sm">
                  <img
                    src={papa2}
                    className="card-img-top"
                    alt="Marcelo Fuentes"
                  />
                  <div className="card-body">
                    <h5>Marcelo Fuentes</h5>
                    <p className="card-text">
                      “Si algo se rompe, se arregla; y si no se puede, se aprende de ello.”
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/Papas/Marcelo" className="btn btn-success">
                        Más info
                      </Link>
                      <small className="star-rating">★★★★☆</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Papá Julio */}
              <div className="col">
                <div className="card shadow-sm">
                  <img
                    src={papa_yuli}
                    className="card-img-top"
                    alt="Julio Araya"
                  />
                  <div className="card-body">
                    <h5>Julio Araya</h5>
                    <p className="card-text">
                      “No importa lo grande que seas, siempre serás mi orgullo, y aunque te veo avanzar por la vida, siempre estaré aquí para apoyarte y celebrar tus logros.”
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/Papas/Julio" className="btn btn-success">
                        Más info
                      </Link>
                      <small className="star-rating">★★★★★</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Papá Luis */}
              <div className="col">
                <div className="card shadow-sm">
                  <img src={papa6} className="card-img-top" alt="Luis Gutiérrez"/>
                  <div className="card-body">
                    <h5>Luis Gutiérrez</h5>
                    <p className="card-text">
                      “La vida no es fácil, pero mientras haya salud y familia, se puede seguir.”
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/Papas/Luis" className="btn btn-success">
                        Más info
                      </Link>
                      <small className="star-rating">★★★★☆</small>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Papas;
