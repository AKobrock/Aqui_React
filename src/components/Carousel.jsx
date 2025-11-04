import { Link } from 'react-router-dom';
import './Carousel.css';

function Carousel({ papas }) {
  return (
    <div id="carouselPapas" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {papas.map((papa, index) => (
          <div key={papa.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img 
              src={papa.image} 
              className="d-block w-100" 
              alt={papa.name}
            />
            <div className="carousel-caption">
              <h5>{papa.name}</h5>
              <p>{papa.description}</p>
              <Link 
                to={`/PapaDetail/${papa.id}`} 
                className="btn btn-success"
              >
                Más info
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Controles del carousel */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselPapas" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselPapas" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default Carousel;