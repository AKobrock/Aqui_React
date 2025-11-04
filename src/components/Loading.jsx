import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
}

export default Loading;