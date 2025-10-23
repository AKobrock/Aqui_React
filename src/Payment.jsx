import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Payment(){
  const [params] = useSearchParams();
  const id = params.get('id');
  const [papa, setPapa] = useState(null);
  const [form, setForm] = useState({ name: '', card: '', exp: '', cvv: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(()=>{
    if(!id) return;
    fetch('/papas.json').then(r=>r.json()).then(d=>{
      const found = (d.papas||[]).find(p=> String(p.id) === String(id));
      setPapa(found || null);
    })
  },[id]);

  const handle = (e)=> setForm(s=>({ ...s, [e.target.name]: e.target.value }));
  const submit = (e)=>{ e.preventDefault(); setSubmitted(true); setTimeout(()=> setSubmitted(false), 2000); };

  return (
    <div className="container py-5">
      <h2>Pago</h2>
      {papa && <p>Renta para: <strong>{papa.name}</strong> — {papa.price_display}</p>}
      {!papa && <p className="text-muted">Selecciona un papá desde su página de detalle.</p>}

      <form onSubmit={submit} style={{ maxWidth: 560 }}>
        <div className="mb-3">
          <label className="form-label">Nombre en la tarjeta</label>
          <input name="name" value={form.name} onChange={handle} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de tarjeta</label>
          <input name="card" value={form.card} onChange={handle} className="form-control" required />
        </div>
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Exp</label>
            <input name="exp" value={form.exp} onChange={handle} className="form-control" required />
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">CVV</label>
            <input name="cvv" value={form.cvv} onChange={handle} className="form-control" required />
          </div>
        </div>
        <button className="btn btn-primary">Pagar</button>
        {submitted && <div className="alert alert-success mt-3">Pago simulado OK</div>}
      </form>

      <div className="mt-4"><Link to="/Papas" className="btn btn-secondary">Volver a Papas</Link></div>
    </div>
  );
}
