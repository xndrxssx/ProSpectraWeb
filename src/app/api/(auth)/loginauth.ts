// src/app/api/(auth)/loginauth.ts
export async function POST(req: Request) {
    const { email, password } = await req.json();
  
    // Lógica de autenticação
    if (email === "user@example.com" && password === "password") {
      return new Response(JSON.stringify({ message: "Autenticação bem-sucedida" }), { status: 200 });
    }
  
    return new Response(JSON.stringify({ message: "Falha de autenticação" }), { status: 401 });
  }
  