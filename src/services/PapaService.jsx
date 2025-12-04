// src/services/PapaService.js

const API_BASE = "http://localhost:8080/api/v1/papas";

export const getPapas = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error("Error al obtener papás");
  }
  return response.json(); // Puede ser lista directa o APIResponse, tú ya lo usas así
};

export const getPapaByIdBackend = async (uuid) => {
  const response = await fetch(`${API_BASE}/${uuid}`);
  if (!response.ok) {
    throw new Error("Error al obtener el papá");
  }
  
  return response.json();
};

export const createPapa = async (papa) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(papa),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al crear papá:", errorText);
    throw new Error("No se pudo crear el papá");
  }

  return response.json();
};

export const updatePapa = async (id, papa) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(papa),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al actualizar papá:", errorText);
    throw new Error("No se pudo actualizar el papá");
  }

  return response.json();
};

export const deletePapa = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al eliminar papá:", errorText);
    throw new Error("No se pudo eliminar el papá");
  }

  return response.json();
};
