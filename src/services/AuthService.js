// src/services/AuthService.js
const API_URL = "http://localhost:8080";

export async function loginUserService(credentials) {
  try {
    const response = await fetch(`${API_URL}/auth/login-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en loginUserService:", error);
    throw error;
  }
}
