const API_URL = "http://127.0.0.1:8000";

export async function searchDocuments(query) {
  const response = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      top_k: 5,
    }),
  });

  if (!response.ok) {
    throw new Error("Search failed");
  }

  return response.json();
}