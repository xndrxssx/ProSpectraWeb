// src/app/home/page.tsx
"use client";

import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";

function Home() {
  return (
    <div className="min-h-screen flex bg-[#eaeaea] text-[#001E01] w-full">
      {/* Sidebar */}
      <div className="w-45"> {/* Largura fixa para a sidebar (ajuste conforme necessário) */}
        <CustomSidebar />
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-center">Bem vindo ao ProSpectraWeb!</h1>
          <p className="text-lg text-center">
            Escolha uma opção no menu para começar sua análise.
          </p>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);
