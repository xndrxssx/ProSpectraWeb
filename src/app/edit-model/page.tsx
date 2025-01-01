"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Para navegação do App Router.
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";

function EditModel() {
  const [filtroNome, setFiltroNome] = useState("");
  const [parametros, setParametros] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!filtroNome || !parametros) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    try {
      router.push("/sucesso");
    } catch (error) {
      setErro("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Editar Filtro</h1>
          <p className="text-center text-sm mb-6">
            Insira os detalhes do filtro para edição.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="filtroNome" className="block text-sm font-medium mb-2">
                Nome do Filtro
              </label>
              <input
                id="filtroNome"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Digite o nome do filtro"
              />
            </div>

            <div>
              <label htmlFor="parametros" className="block text-sm font-medium mb-2">
                Parâmetros
              </label>
              <input
                id="parametros"
                value={parametros}
                onChange={(e) => setParametros(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Digite os parâmetros"
              />
            </div>

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <button
              type="submit"
              className="mt-6 w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
            >
              Salvar Filtro
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
export default withAuth(EditModel);