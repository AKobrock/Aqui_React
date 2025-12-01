import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePapas } from "../context/PapasProvider";
import Loading from "../components/Loading";

export default function PapaDetail() {
  const { id } = useParams();

  const { getPapaById, loading } = usePapas();
  const [papa, setPapa] = useState(null);

useEffect(() => {
  if (!loading) {
    setPapa(getPapaById(id));
  }
}, [id, loading, getPapaById]);

  if (loading) return <Loading />;
  if (!papa) return <div className="container py-5">Papá no encontrado</div>;

  return (
    <div className="container py-5">
      <div className="row">
        
        {/* Imagen */}
        <div className="col-md-6">
          <img
            src={papa.imagenURL}
            alt={`${papa.nombre} ${papa.apellido}`}
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>

        {/* Info */}
        <div className="col-md-6 d-flex flex-column">
          <h2>{`${papa.nombre} ${papa.apellido}`}</h2>
          <p>{papa.descripcion}</p>

          <ul className="list-unstyled">
            <li><strong>Edad:</strong> {papa.edad}</li>
            <li><strong>Nacionalidad:</strong> {papa.nacionalidad}</li>
            <li><strong>Ocupación:</strong> {papa.ocupacion}</li>
            <li><strong>Estado Civil:</strong> {papa.estadoCivil}</li>
            <li><strong>Hijos:</strong> {papa.numeroHijos}</li>
            <li><strong>Hobbies:</strong> {papa.hobbies}</li>
            <li><strong>Tipo de Papá:</strong> {papa.tipoPapa}</li>
            <li><strong>Lema:</strong> {papa.lema}</li>
          </ul>

          <div className="price-tag mt-auto">
            <h3>${papa.precio}</h3>
          </div>

          <div className="mt-3">
            <Link
              to={`/payment?id=${papa.id}`}
              className="btn btn-success btn-lg w-100"
            >
              ¡Arrendar ahora!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
