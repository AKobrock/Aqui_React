import { createContext, useContext, useEffect, useState } from "react";
import { getPapas } from "../services/PapaService";

const PapasContext = createContext();

export function PapasProvider({ children }) {
  const [papas, setPapas] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPapas = async () => {
    try {
      const data = await getPapas();

      // Si backend envía APIResponse con {data: [...]}
      const lista = Array.isArray(data) ? data : data.data || [];

      setPapas(lista);
    } catch (error) {
      console.error("Error cargando papás:", error);
      setPapas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPapas();
  }, []);

  // 🟦 Agregar papá sin recargar página
  const addPapa = (nuevoPapa) => {
    setPapas((prev) => [...prev, nuevoPapa]);
  };

  // 🟦 Actualizar papá existente
  const updatePapaInList = (updated) => {
    setPapas((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  // 🟦 Eliminar papá de la lista
  const removePapa = (id) => {
    setPapas((prev) => prev.filter((p) => p.id !== id));
  };

  // 🟦 Recargar desde servidor si necesitas
  const refreshPapas = () => loadPapas();

  const getPapaById = (uuid) =>
    papas.find((p) => p.id === uuid || p.id === parseInt(uuid));

  return (
    <PapasContext.Provider
      value={{
        papas,
        loading,
        getPapaById,
        addPapa,
        updatePapaInList,
        removePapa,
        refreshPapas,
      }}
    >
      {children}
    </PapasContext.Provider>
  );
}

export const usePapas = () => useContext(PapasContext);
