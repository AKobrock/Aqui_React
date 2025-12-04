// src/services/UserService.js

const API_BASE = "http://localhost:8080/api/v1/users";

// Pequeño helper por si tu backend devuelve APIResponse o lista directa
async function parseResponse(response) {
  const json = await response.json();
  // Si viene como {status, message, data}, devolvemos data
  if (json && Object.prototype.hasOwnProperty.call(json, "data")) {
    return json.data;
  }
  return json;
}

// Obtener todos los usuarios
export const getUsers = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }
  return parseResponse(response);
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener usuario");
  }
  return parseResponse(response);
};

// Crear usuario
export const createUser = async (user) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al crear usuario:", errorText);
    throw new Error("No se pudo crear el usuario");
  }

  return parseResponse(response);
};

// Actualizar usuario
export const updateUser = async (id, user) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al actualizar usuario:", errorText);
    throw new Error("No se pudo actualizar el usuario");
  }

  return parseResponse(response);
};

// Eliminar usuario
export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al eliminar usuario:", errorText);
    throw new Error("No se pudo eliminar el usuario");
  }

  return parseResponse(response);
};

// Obtener activos
export const getActiveUsers = async () => {
  const response = await fetch(`${API_BASE}/active`);
  if (!response.ok) {
    throw new Error("Error al obtener usuarios activos");
  }
  return parseResponse(response);
};

// Obtener inactivos
export const getInactiveUsers = async () => {
  const response = await fetch(`${API_BASE}/inactive`);
  if (!response.ok) {
    throw new Error("Error al obtener usuarios inactivos");
  }
  return parseResponse(response);
};

// Reactivar usuario
export const reactivateUser = async (id) => {
  const response = await fetch(`${API_BASE}/${id}/reactivar`, {
    method: "PUT",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error al reactivar usuario:", errorText);
    throw new Error("No se pudo reactivar el usuario");
  }

  return parseResponse(response);
};
