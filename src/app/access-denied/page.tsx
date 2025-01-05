// src/app/access-denied/page.tsx
"use client";

import { useRouter } from "next/navigation";

function AccessDenied() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/home"); // Redireciona para a página inicial (home)
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-red-100 text-red-800">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
        <p className="text-xl mb-6">Você não tem permissão para acessar esta página.</p>
        <button
          onClick={handleGoHome}
          className="bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
        >
          Voltar para a Home
        </button>
      </div>
    </div>
  );
}

export default AccessDenied;
