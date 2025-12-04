import { Link } from 'react-router-dom';
import '../styles/PapaCard.css';

function PapaCard({ papa }) {
  return (
    <div className="papa-card h-100">
      <img 
        src={papa.imagenURL} 
        alt={papa.nombre} 
        className="papa-card-img-top"
      />
      <div className="papa-card-body d-flex flex-column">
        <h5 className="papa-card-title">{papa.nombre} {papa.apellido}</h5>
        <p className="papa-card-text">{papa.lema}</p>
        <p className="papa-price mt-auto">{papa.precio}</p>
        <Link 
          to={`/PapaDetail/${papa.id}`} 
          className="btn btn-success"
        >
          Más info
        </Link>
      </div>
    </div>
  );
}

export default PapaCard;