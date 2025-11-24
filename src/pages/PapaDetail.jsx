import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from '../components/Loading/Loading';
import { getPapaById } from '../services/PapaService';

export default function PapaDetail() {
  const { id } = useParams();
  const [papa, setPapa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPapaById(id)
      .then(data => {
        setPapa(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;
  if (!papa) return <div className="container mt-4">Papá no encontrado</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={papa.image.startsWith('/') ? papa.image : `/${papa.image}`}
            alt={papa.name} 
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h2>{papa.name}</h2>
          <p>{papa.description}</p>
          <ul className="list-unstyled">
            <li><strong>Edad:</strong> {papa.age}</li>
            <li><strong>Nacionalidad:</strong> {papa.nationality}</li>
            <li><strong>Ocupación:</strong> {papa.occupation}</li>
            <li><strong>Estado Civil:</strong> {papa.civil_status}</li>
            <li><strong>Hijos:</strong> {papa.children}</li>
            <li><strong>Hobbies:</strong> {papa.hobbies.join(', ')}</li>
          </ul>
          <div className="price-tag">
            <h3>{papa.price_display}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}