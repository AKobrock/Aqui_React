import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import portada1 from "./assets/portada_2.png";
import Carousel from '../components/Carousel';
import Loading from '../components/Loading';
import { getPapas } from '../services/PapaService';

import '../styles/Inicio.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Inicio() {
  const [papas, setPapas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPapas()
      .then(data => {
        setPapas(data.papas);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

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
            Somos una empresa única y cercana que ofrece
            paternas para quienes necesiten apoyo, compañía y orientación en
            diferentes momentos de su vida. Desde estar presente en una graduación,
            enseñar a conducir, brindar consejos antes de un examen importante o
            simplemente dar apoyo emocional, nuestros papás están preparados para
            acompañar y hacer sentir a cada persona valorada y respaldada. Porque
            todos merecen tener a alguien que diga: "¡Estoy orgulloso de ti, hijo!"
          </p>
        </div>

        {/* Carrusel con imágenes */}
        <div className="container mt-4">
          <Carousel papas={papas.slice(0, 3)} />
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