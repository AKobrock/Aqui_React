const API_URL = "http://localhost:8080/api/v1/users";

export const getUsers = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const reactivateUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}/reactivar`, {
    method: "PUT",
  });
  return res.json();
};
