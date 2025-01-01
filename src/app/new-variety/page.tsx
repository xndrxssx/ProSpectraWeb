"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";

function AddVariety() {
  const [nomeVariedade, setNomeVariedade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [atributos, setAtributos] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeVariedade || !descricao || !atributos) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    try {
      // Simula o envio bem-sucedido
      router.push("/sucesso");
      setErro("");
      setNomeVariedade("");
      setDescricao("");
      setAtributos("");
    } catch (error) {
      setErro("Ocorreu um erro. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Adicionar Nova Variedade de Uva
          </h1>
          <p className="text-center text-sm mb-6">
            Preencha as informações abaixo para adicionar uma nova variedade ao sistema.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome da Variedade:</label>
              <input
                type="text"
                name="nomeVariedade"
                value={nomeVariedade}
                onChange={(e) => setNomeVariedade(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Cabernet Sauvignon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descrição:</label>
              <textarea
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Descrição da variedade"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Atributos:</label>
              <input
                type="text"
                name="atributos"
                value={atributos}
                onChange={(e) => setAtributos(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Resistente ao calor, sabor doce"
              />
            </div>
            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            <button
              type="submit"
              className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
            >
              Salvar Variedade
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
export default withAuth(AddVariety);