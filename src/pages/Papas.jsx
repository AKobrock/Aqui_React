import { usePapas } from "../context/PapasProvider";
import PapaCard from "../components/PapaCard";

function Papas() {
  const { papas, loading } = usePapas();

  if (loading) return <p>Cargando papás...</p>;

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4 text-center">Nuestros Papás</h2>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {papas.map((papa) => (
          <div key={papa.id} className="col">
            <PapaCard papa={papa} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Papas;
