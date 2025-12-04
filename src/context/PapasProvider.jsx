import { createContext, useContext, useEffect, useState } from "react";
import { getPapas } from "../services/PapaService";

const PapasContext = createContext();

export function PapasProvider({ children }) {
    const [papas, setPapas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPapas = async () => {
            try {
                const data = await getPapas();
                setPapas(data || []);
            } catch (error) {
                console.error("Error cargando papas:", error);
                setPapas([]);
            } finally {
                setLoading(false);
            }
        };

        loadPapas();
    }, []);

    const getPapaById = (uuid) =>
        papas.find((p) => p.id === uuid || p.id === parseInt(uuid));

    return (
        <PapasContext.Provider value={{ papas, getPapaById, loading }}>
            {children}
        </PapasContext.Provider>
    );
}

export const usePapas = () => useContext(PapasContext);
