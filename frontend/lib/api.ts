const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const chatApi  = async (message: string, mode: string) => {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, mode }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};