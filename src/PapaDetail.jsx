import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PapaDetail() {
  const { nombre } = useParams();
  const [papa, setPapa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch('/papas.json')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const list = data.papas || [];
        // try to match by name token (e.g., 'Hector' matches 'Papá Hector Montalvo')
        const found = list.find((p) => {
          if (!p.name) return false;
          return p.name.toLowerCase().includes((nombre || '').toLowerCase());
        });
        setPapa(found || null);
      })
      .catch(() => setPapa(null))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, [nombre]);

  if (loading) return <section className="container py-5">Cargando...</section>;

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
      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          <img src={papa.image.startsWith('images/') ? papa.image.replace('images/', '/assets/') : papa.image} alt={papa.name} className="img-fluid rounded-4 shadow-sm" style={{ width: '100%' }} />
        </div>
        <div className="col-md-7">
          <h1 className="display-6 text-end" style={{ color: '#b35d1a' }}>{papa.name}</h1>
          <p className="lead text-end text-muted">{papa.description.split('.').slice(0,1).join('.')}</p>
          <hr />
          <div className="row">
            <div className="col-6">
              <p><strong>Edad:</strong> {papa.age} años</p>
              <p><strong>Nacionalidad:</strong> {papa.nationality}</p>
              <p><strong>Ocupación:</strong> {papa.occupation}</p>
            </div>
            <div className="col-6">
              <p><strong>Estado civil:</strong> {papa.civil_status}</p>
              <p><strong>Nro de hijos:</strong> {papa.children}</p>
              <p><strong>Hobbies:</strong> {papa.hobbies.join(', ')}</p>
            </div>
          </div>

          <hr />
          <p>{papa.description}</p>

          <hr />
          <div className="text-center my-4">
            <h3 style={{ color: '#3e3e2f' }}>{papa.price_display}</h3>
            <Link to={`/payment?id=${papa.id}`} className="btn btn-success btn-lg mt-3">¡Rentar papá!</Link>
          </div>

        </div>
      </div>
      <div className="mt-4">
        <small className="text-muted">Nota: puedes editar la información de cada papá manualmente en <code>public/papas.json</code>.</small>
      </div>
    </section>
  );
}