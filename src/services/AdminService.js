const API_URL = "http://localhost:8080/api/v1/admins";

export const loginAdminService = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login incorrecto");

  return res.json();
};
