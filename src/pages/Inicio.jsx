import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import portada1 from "../assets/portada_2.png";
import Carousel from '../components/Carousel';
import Loading from '../components/Loading';
import { usePapas  } from "../context/PapasProvider";

import '../styles/Inicio.css';

function Inicio() {
  const { papas, loading } = usePapas();

  if (loading) return <Loading />;

  return (
    <>
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
          Somos una empresa única y cercana que ofrece figuras paternas para quienes necesiten apoyo, compañía y orientación en diferentes momentos de su vida. Desde estar presente en una graduación, enseñar a conducir, brindar consejos antes de un examen importante o simplemente dar apoyo emocional, nuestros papás están preparados para acompañar y hacer sentir a cada persona valorada y respaldada. Porque todos merecen tener a alguien que diga: "¡Estoy orgulloso de ti, hijo!"
        </p>
      </div>

      {/* Carrusel con imágenes */}
      <div className="container mt-4">
        <Carousel papas={papas.slice(0, 3)} />
      </div>

      {/* --- SECCIÓN DE DESCUENTOS --- */}
      <section className="descuentos-section text-center py-5">
        <div className="container">
          <h2 className="mb-4">Packs y Beneficios Exclusivos</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm beneficio-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Primera Reserva</h5>
                  <p className="card-text">¿Eres nuevo? ¡Genial! Obtén un <strong>15% de descuento</strong> en tu primera experiencia con nosotros.</p>
                  <Link to="/Papas" className="btn btn-primary mt-auto">¡Lo quiero!</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm beneficio-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Pack Amigo Fiel</h5>
                  <p className="card-text">La lealtad tiene su recompensa. Reserva 5 horas con tu papá favorito y <strong>la sexta es gratis</strong>.</p>
                  <Link to="/Papas" className="btn btn-primary mt-auto">Reservar Pack</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 mb-4">
              <div className="card h-100 shadow-sm beneficio-card">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Beneficio Cumpleaños</h5>
                  <p className="card-text">¡Feliz cumpleaños! Si reservas en tu mes, te llevas una <strong>sorpresa especial</strong> de parte de tu papá.</p>
                  <Link to="/Contacto" className="btn btn-primary mt-auto">Consultar</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <small>Aquí Papá © 2025 — Todos los derechos reservados.</small>
        </div>
      </footer>
    </>
  );
}

export default Inicio;