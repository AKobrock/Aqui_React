// src/context/PapasProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getPapas } from "../services/PapaService";

const PapasContext = createContext();

export function PapasProvider({ children }) {
  const [papas, setPapas] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------------------
  // 🔵 Cargar todos los papás desde el backend
  // -----------------------------------------
  const loadPapas = async () => {
    setLoading(true);

    try {
      const data = await getPapas();

      // Soporte para APIResponse { data: [...] }
      const lista = Array.isArray(data) ? data : data.data || [];

      setPapas(lista);
    } catch (error) {
      console.error("❌ Error cargando papás:", error);
      setPapas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPapas();
  }, []);

  // -----------------------------------------
  // 🔵 Agregar un papá sin recargar página
  // -----------------------------------------
  const addPapa = (nuevoPapa) => {
    if (!nuevoPapa) return;
    setPapas((prev) => [...prev, nuevoPapa]);
  };

  // -----------------------------------------
  // 🔵 Actualizar papá en la lista
  // -----------------------------------------
  const updatePapaInList = (updatedPapa) => {
    if (!updatedPapa || !updatedPapa.id) return;

    setPapas((prev) =>
      prev.map((p) => (p.id === updatedPapa.id ? updatedPapa : p))
    );
  };

  // -----------------------------------------
  // 🔵 Eliminar papá de la lista
  // -----------------------------------------
  const removePapa = (id) => {
    if (!id) return;

    setPapas((prev) => prev.filter((p) => p.id !== id));
  };

  // -----------------------------------------
  // 🔵 Recargar desde servidor
  // -----------------------------------------
  const refreshPapas = async () => {
    await loadPapas();
  };

  // -----------------------------------------
  // 🔵 Obtener papá por ID (UUID o número)
  // -----------------------------------------
  const getPapaById = (uuid) =>
    papas.find(
      (p) =>
        p.id === uuid ||
        p.id === `${uuid}` ||
        p.id === parseInt(uuid)
    );

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
