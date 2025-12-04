export async function loginAdminService(credentials) {
  const response = await fetch("http://localhost:8080/api/v1/admins/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("Error en login");

  return response.json();
}

