import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from '../components/Loading';
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
  if (!papa) return <div className="container py-5">Papá no encontrado</div>;

  return (
    <div className="container py-5"> {/* Se aumenta el espaciado vertical a py-5 */}
      <div className="row">
        <div className="col-md-6">
          <img 
            src={papa.image.startsWith('/') ? papa.image : `/${papa.image}`}
            alt={papa.name} 
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>
        <div className="col-md-6 d-flex flex-column">
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
          <div className="price-tag mt-auto">
            <h3>{papa.price_display}</h3>
          </div>
          <div className="mt-3">
            <Link to={`/payment?id=${papa.id}`} className="btn btn-success btn-lg w-100">
              ¡Arrendar ahora!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}