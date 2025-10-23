import React from "react";
import { useParams, Link } from "react-router-dom";
import papa1 from "./assets/papa1.jpg";
import papa2 from "./assets/papa2.jpeg";
import papa3 from "./assets/papa3.jpg";
import papa_pancho from "./assets/papa_pancho.jpg";
import papa_yuli from "./assets/papa_yuli.jpg";
import papa6 from "./assets/papa6.jpg";

const papas = {
  Hector: {
    nombre: "Héctor Sanhueza",
    img: papa1,
    descripcion:
      "La receta de la vida siempre necesita un poco de paciencia y mucho cariño.",
  },
  Ricardo: {
    nombre: "Ricardo Montalvo",
    img: papa3,
    descripcion:
      "La vida se entiende mirando hacia atrás, pero se vive hacia adelante.",
  },
  Francisco: {
    nombre: "Francisco Kobrock",
    img: papa_pancho,
    descripcion:
      "No tienes que cargar con todo solo; siempre puedes apoyarte en mí para seguir adelante.",
  },
  Marcelo: {
    nombre: "Marcelo Fuentes",
    img: papa2,
    descripcion:
      "Si algo se rompe, se arregla; y si no se puede, se aprende de ello.",
  },
  Julio: {
    nombre: "Julio Araya",
    img: papa_yuli,
    descripcion:
      "Siempre estaré aquí para apoyarte y celebrar tus logros.",
  },
  Luis: {
    nombre: "Luis Gutiérrez",
    img: papa6,
    descripcion:
      "La vida no es fácil, pero mientras haya salud y familia, se puede seguir.",
  },
};

export default function PapaDetail() {
  const { nombre } = useParams();
  const key =
    Object.keys(papas).find((k) => k.toLowerCase() === (nombre || "").toLowerCase()) ||
    null;
  const papa = key ? papas[key] : null;

  if (!papa) {
    return (
      <section className="container py-5">
        <h2>Papá no encontrado</h2>
        <p>No se encontró información para "{nombre}".</p>
        <Link to="/Papas" className="btn btn-secondary">Volver a Papas</Link>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="card mb-3" style={{ maxWidth: 800 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={papa.img} className="img-fluid rounded-start" alt={papa.nombre} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{papa.nombre}</h3>
              <p className="card-text">{papa.descripcion}</p>
              <Link to="/Papas" className="btn btn-success">Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}