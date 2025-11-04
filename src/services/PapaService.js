export const getPapas = async () => {
    try {
        const response = await fetch('/papas.json');
        return response.json();
    } catch (error) {
        console.error('Error fetching papas:', error);
        return { papas: [] };
    }
};

export const getPapaById = async (id) => {
    try {
        const data = await getPapas();
        return data.papas.find(papa => papa.id === parseInt(id));
    } catch (error) {
        console.error('Error fetching papa by id:', error);
        return null;
    }
};