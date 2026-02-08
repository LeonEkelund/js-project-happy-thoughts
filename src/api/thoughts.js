const BASE_URL = "https://happythoughtsapi.onrender.com";

export const getThoughts = async () => {
  const res = await fetch(`${BASE_URL}/thoughts`);
  return res.json();
};

export const postThought = async (message) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = { "Content-Type": "application/json" };
  if (user?.token) headers["Authorization"] = `Bearer ${user.token}`;

  const res = await fetch(`${BASE_URL}/thoughts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ message }),
  });
  return res.json();
};

export const likeThought = async (id) => {
  const res = await fetch(`${BASE_URL}/thoughts/${id}/like`, {
    method: "POST",
  });
  return res.json();
};

export const deleteThought = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(`${BASE_URL}/thoughts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return res.json();
};

export const updateThought = async (id, message) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const res = await fetch(`${BASE_URL}/thoughts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ message }),
  });
  return res.json();
};
