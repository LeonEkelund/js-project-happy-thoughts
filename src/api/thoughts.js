const BASE_URL = "https://happy-thoughts-api-4ful.onrender.com";

export const getThoughts = async () => {
  const res = await fetch(`${BASE_URL}/thoughts`);
  return res.json();
};

export const postThought = async (message) => {
  const res = await fetch(`${BASE_URL}/thoughts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
