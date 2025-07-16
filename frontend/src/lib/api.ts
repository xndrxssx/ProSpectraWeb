// src/lib/api.ts
export async function apiGet<T>(path: string): Promise<T> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error (${res.status}): ${text}`);
  }

  return res.json();
}
