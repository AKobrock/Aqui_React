import { Link } from 'react-router-dom';
import '../styles/PapaCard.css';

function PapaCard({ papa }) {
  return (
    <div className="papa-card h-100">
      <img 
        src={papa.image} 
        alt={papa.name} 
        className="papa-card-img-top"
      />
      <div className="papa-card-body d-flex flex-column">
        <h5 className="papa-card-title">{papa.name}</h5>
        <p className="papa-card-text">{papa.description}</p>
        <p className="papa-price mt-auto">{papa.price_display}</p>
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