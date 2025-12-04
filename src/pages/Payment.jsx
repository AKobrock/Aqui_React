import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getPapaByIdBackend } from '../services/PapaService'
// Se elimina la importación de Payment.css, ya que los estilos ahora están en index.css

export default function Payment(){
  const [params] = useSearchParams();
  const id = params.get('id');
  const [papa, setPapa] = useState(null);
  const [loading, setLoading] = useState(false);

  const [renter, setRenter] = useState({ fullName: '', email: '', address: '', comuna: '', region: '', date: '', hours: 1 });
  const [payment, setPayment] = useState({ holder: '', card: '', exp: '', cvv: '' });
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchPapa() {
      if (!id) return;

      try {
        const data = await getPapaByIdBackend(id);
        console.log(data);
        setPapa(data);
        setLoading(true);
      } catch (e) {
        console.error("Error cargando papá:", e);
      }
    }

    fetchPapa();
  }, [id]);

  const today = (()=>{
    const d = new Date();
    const y = d.getFullYear();
    const m = ('' + (d.getMonth()+1)).padStart(2,'0');
    const dd = ('' + d.getDate()).padStart(2,'0');
    return `${y}-${m}-${dd}`;
  })();

  const handleRenter = (e)=>{
    const { name, value } = e.target;
    setRenter(s=>({ ...s, [name]: name === 'hours' ? Math.max(1, Math.min(8, Number(value||1))) : value }));
    if(loading){
      console.log(renter.hours)
      setTotal(papa.precio * renter.hours);
    }
  };
  const handlePayment = (e)=> setPayment(s=>({ ...s, [e.target.name]: e.target.value }));

  const validate = ()=>{
    const errs = {};
    if(!renter.fullName) errs.fullName = 'Requerido';
    if(!renter.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(renter.email)) errs.email = 'Email inválido';
    if(!renter.address) errs.address = 'Requerido';
    if(!renter.comuna) errs.comuna = 'Requerido';
    if(!renter.region) errs.region = 'Requerido';
    if(!renter.date) {
      errs.date = 'Selecciona fecha';
    } else {
      const selected = new Date(renter.date);
      const t = new Date(); t.setHours(0,0,0,0);
      selected.setHours(0,0,0,0);
      if(selected < t) errs.date = 'La fecha no puede ser anterior a hoy';
    }
    if(!payment.holder) errs.holder = 'Requerido';
    if(!/^[0-9]{12,19}$/.test(payment.card.replace(/\s+/g,''))) errs.card = 'Número inválido';
    if(!/^[0-9]{3,4}$/.test(payment.cvv)) errs.cvv = 'CVV inválido';
    if(!payment.exp || !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(payment.exp)) errs.exp = 'Formato MM/AA';
    if(!agree) errs.agree = 'Debes aceptar términos';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const isFormValid = ()=>{
    if(!papa) return false;
    if(!renter.fullName) return false;
    if(!renter.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(renter.email)) return false;
    if(!renter.address) return false;
    if(!renter.comuna) return false;
    if(!renter.region) return false;
    if(!renter.date) return false;
    const sel = new Date(renter.date);
    const t2 = new Date(); t2.setHours(0,0,0,0); sel.setHours(0,0,0,0);
    if(sel < t2) return false;
    if(!payment.holder) return false;
    if(!/^[0-9]{12,19}$/.test(payment.card.replace(/\s+/g,''))) return false;
    if(!/^[0-9]{3,4}$/.test(payment.cvv)) return false;
    if(!payment.exp || !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(payment.exp)) return false;
    if(!agree) return false;
    return true;
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!validate()) return;
    setSubmitted(true);
  };
  

  

    if (!loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Cargando información del papá...</h3>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-success payment-success-alert">
          <h2 className="alert-heading">¡Papá arrendado con éxito!</h2>
          <p>Se te enviará una copia de la reserva a tu correo <strong>{renter.email}</strong>.</p>
          <hr />
          <p className="mb-0">
            <Link to="/Papas" className="btn btn-primary">Volver a Papás</Link>
          </p>
        </div>
      </div>
    );
  }

   return (
    <div className="container py-5 payment-container">
      <h1 className="mb-3">Factura de Pago</h1>

      {!papa && <div className="alert alert-secondary">Selecciona un papá desde su página de detalle para pagar.</div>}

      {papa && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Renta para: <strong>{papa.name}</strong></h5>
            <p className="card-text">Precio por hora: <strong>{papa.precio}</strong></p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="row g-4" noValidate>
        <div className="col-12 col-lg-7">
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input name="fullName" value={renter.fullName} onChange={handleRenter} className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="email" value={renter.email} onChange={handleRenter} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input name="address" value={renter.address} onChange={handleRenter} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Comuna</label>
              <input name="comuna" value={renter.comuna} onChange={handleRenter} className={`form-control ${errors.comuna ? 'is-invalid' : ''}`} />
              {errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Región</label>
              <input name="region" value={renter.region} onChange={handleRenter} className={`form-control ${errors.region ? 'is-invalid' : ''}`} />
              {errors.region && <div className="invalid-feedback">{errors.region}</div>}
            </div>
          </div>

          <div className="row align-items-end">
            <div className="col-md-6 mb-3">
              <label className="form-label">Fecha de arriendo</label>
              <input name="date" type="date" min={today} value={renter.date} onChange={handleRenter} className={`form-control ${errors.date ? 'is-invalid' : ''}`} />
              {errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Cantidad de horas</label>
              <input name="hours" type="number" min="1" max="8" value={renter.hours} onChange={handleRenter} className="form-control" />
            </div>
          </div>

          <hr />

          <h5 className="mb-3">Formato de pago</h5>

          <div className="mb-3">
            <label className="form-label">Nombre titular tarjeta</label>
            <input name="holder" value={payment.holder} onChange={handlePayment} className={`form-control ${errors.holder ? 'is-invalid' : ''}`} />
            {errors.holder && <div className="invalid-feedback">{errors.holder}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Número de tarjeta</label>
            <input name="card" value={payment.card} onChange={handlePayment} maxLength={19} placeholder="1234 5678 9012 3456" className={`form-control ${errors.card ? 'is-invalid' : ''}`} />
            {errors.card && <div className="invalid-feedback">{errors.card}</div>}
          </div>

          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Fecha expiración (MM/AA)</label>
              <input name="exp" value={payment.exp} onChange={handlePayment} placeholder="MM/AA" className={`form-control ${errors.exp ? 'is-invalid' : ''}`} />
              {errors.exp && <div className="invalid-feedback">{errors.exp}</div>}
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">CVV</label>
              <input name="cvv" value={payment.cvv} onChange={handlePayment} maxLength={4} className={`form-control ${errors.cvv ? 'is-invalid' : ''}`} />
              {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
            </div>
          </div>

          <div className="form-check mb-3">
            <input id="agree" className={`form-check-input ${errors.agree ? 'is-invalid' : ''}`} type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} />
            <label className="form-check-label" htmlFor="agree">Acepto los términos y condiciones</label>
            {errors.agree && <div className="invalid-feedback d-block">{errors.agree}</div>}
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>Confirmar pago</button>
            <Link to="/Papas" className="btn btn-secondary">Volver a Papas</Link>
          </div>
        </div>

        <aside className="col-12 col-lg-5">
          <div className="card payment-summary-card">
            <div className="card-body">
              <h5 className="card-title">Resumen</h5>
              <p className="mb-1">Papá: <strong>{papa.nombre || '—'}</strong></p>
              <p className="mb-1">Precio/hora: <strong>{papa.precio || (papaPrice ? `$ ${papaPrice}` : '—')}</strong></p>
              <p className="mb-1">Horas: <strong>{renter.hours}</strong></p>
              <hr />
              <h4>Total: <strong>{ papa ? new Intl.NumberFormat('es-CL',{ style: 'currency', currency: 'CLP' }).format(total) : '—' }</strong></h4>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
  
}