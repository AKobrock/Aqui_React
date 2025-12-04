// services/PapaService.js
export const getPapas = async () => {
    const response = await fetch("http://localhost:8080/api/v1/papas");
    return response.json();
};

export const getPapaByIdBackend = async (uuid) => {
    const response = await fetch(`http://localhost:8080/api/v1/papas/${uuid}`);
    return response.json();
};
