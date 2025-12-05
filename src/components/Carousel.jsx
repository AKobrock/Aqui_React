import { Link } from 'react-router-dom';
import '../styles/Carousel.css';

function Carousel({ papas }) {
  return (
    <div id="carouselPapas" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {papas.map((papa, index) => (
          <div key={papa.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img 
              src={papa.imagenURL} 
              className="d-block w-100" 
              alt={papa.nombre}
            />
            <div 
              className="carousel-caption d-block" 
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '10px',
                padding: '20px',
                left: '15%',
                right: '15%',
                bottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '230px',
                color: 'white'
              }}
            >
              <h5>{papa.nombre}</h5>
              <p>{papa.descripcion}</p>
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
