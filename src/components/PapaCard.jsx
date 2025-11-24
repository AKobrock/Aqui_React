import { Link } from 'react-router-dom';
import '../styles/PapaCard.css';

function PapaCard({ papa }) {
  return (
    <div className="card h-100">
      <img 
        src={papa.image} 
        alt={papa.name} 
        className="card-img-top"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{papa.name}</h5>
        <p className="card-text">{papa.description}</p>
        <p className="price mt-auto">{papa.price_display}</p>
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