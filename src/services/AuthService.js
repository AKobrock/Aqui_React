const API_URL = "http://localhost:8080/auth";

/* ============================================================
   👤 LOGIN USUARIO NORMAL
   ============================================================ */
export async function loginUserService(credentials) {
  try {
    const res = await fetch(`${API_URL}/login-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Error en login de usuario");
    }

    return res.json(); // { token, user }
  } catch (error) {
    console.error("Error en loginUserService:", error);
    throw error;
  }
}

/* ============================================================
   🔐 LOGIN ADMIN
   ============================================================ */
export async function loginAdminService(credentials) {
  try {
    const res = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Error en login de admin");
    }

    return res.json(); // { token, admin }
  } catch (error) {
    console.error("Error en loginAdminService:", error);
    throw error;
  }
}
