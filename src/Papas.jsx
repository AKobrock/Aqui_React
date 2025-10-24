import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Papas() {
  const [papas, setPapas] = useState([]);

  useEffect(() => {
    fetch('/papas.json')
      .then(response => response.json())
      .then(data => setPapas(data.papas))
      .catch(error => console.error('Error:', error));
  }, []);

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

              {papas.map(papa => (
                <div key={papa.id} className="col d-flex align-items-stretch">
                  <div className="card shadow-sm h-100 w-100">
                    <img 
                      src={`/assets/${papa.image.split('/').pop()}`} 
                      alt={papa.name}
                      className="card-img-top" 
                    />
                    <div className="card-body d-flex flex-column">
                      <h5>{papa.name}</h5>
                      <p className="card-text">
                        {papa.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <Link to={`/PapaDetail/${papa.id}`} className="btn btn-success">
                          Más info
                        </Link>
                        <small className="star-rating">★★★★★</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Papas;