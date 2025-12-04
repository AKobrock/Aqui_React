const API_URL = "http://localhost:8080/api/v1/users";

/* ============================
   🔹 OBTENER TODOS LOS USUARIOS
   ============================ */
export const getUsers = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

/* ============================
   🔹 OBTENER USUARIO POR ID
   ============================ */
export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

/* ============================
   🔹 ACTUALIZAR USUARIO
   ============================ */
export const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

/* ============================
   🔹 ELIMINAR (DESACTIVAR) USUARIO
   ============================ */
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

/* ============================
   🔹 REACTIVAR USUARIO
   ============================ */
export const reactivateUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}/reactivar`, {
    method: "PUT",
  });
  return res.json();
};

/* ============================
   🔥 REGISTRO DE USUARIO NUEVO
   ============================ */
export const registerUserService = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Error al registrar usuario");
    }

    return res.json();

  } catch (error) {
    console.error("Error en registerUserService:", error);
    throw error;
  }
};

