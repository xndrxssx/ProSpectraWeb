"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";

interface Variety {
  id?: number;
  name: string;
  description: string;
  attributes: string[];
}

function EditVariety() {
  const [nomeVariedade, setNomeVariedade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [atributos, setAtributos] = useState("");
  const [erro, setErro] = useState("");
  const [variedades, setVariedades] = useState<Variety[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [editando, setEditando] = useState<Variety | null>(null);
  const router = useRouter();
  const limiteCaracteres = 190;

  const fetchVarieties = async () => {
    try {
      const response = await fetch("/api/edit-variety");
      const data = await response.json();
      setVariedades(data);
    } catch (error) {
      console.error("Erro ao buscar variedades", error);
      setErro("Erro ao buscar variedades");
    }
  };

  useEffect(() => {
    fetchVarieties();
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeVariedade || !descricao || !atributos) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    const atributosArray = atributos.split(",").map((attr) => attr.trim());

    const bodyData: Variety = {
      name: nomeVariedade,
      description: descricao,
      attributes: atributosArray,
    };

    try {
      let response;
      if (editando) {
        bodyData.id = editando.id; // Incluir o ID se estiver editando
        response = await fetch("/api/edit-variety", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
      } else {
        response = await fetch("/api/edit-variety", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
      }

      if (response.ok) {
        fetchVarieties();
        setMensagem(editando ? "Variedade atualizada com sucesso!" : "Variedade criada com sucesso!");
        setErro("");
        setNomeVariedade("");
        setDescricao("");
        setAtributos("");
        setEditando(null); // Limpa o estado de edição
      } else {
        const errorData = await response.json();
        setErro(errorData.error || "Ocorreu um erro. Tente novamente.");
      }
    } catch (error) {
      setErro("Ocorreu um erro. Tente novamente.");
    }
  };

  const handleEdit = (variety: Variety) => {
    setNomeVariedade(variety.name);
    setDescricao(variety.description);
    setAtributos(variety.attributes.join(", "));
    setEditando(variety);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar esta variedade?")) {
      try {
        const response = await fetch("/api/edit-variety", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          fetchVarieties();
        } else {
          const errorData = await response.json();
          alert(errorData.error || "Erro ao deletar variedade.");
        }
      } catch (error) {
        alert("Erro ao deletar variedade.");
      }
    }
  };

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const novaDescricao = e.target.value;
    if (novaDescricao.length <= limiteCaracteres) {
      setDescricao(novaDescricao);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex w-full max-w-4xl">
          <div className="bg-white/10 w-5/6 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Adicionar ou Editar Variedade
          </h1>
          <p className="text-center text-sm mb-6">
            Preencha as informações abaixo para adicionar ou editar uma variedade.
          </p>
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
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
                onChange={handleDescricaoChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Descrição da variedade"
              />
              <div className="text-right text-sm mt-2">
                {descricao.length}/{limiteCaracteres} caracteres
              </div>
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
            {mensagem && <p className="text-green-500 text-sm">{mensagem}</p>}
            <button
              type="submit"
              className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
              disabled={descricao.length > limiteCaracteres}
            >
              {editando ? "Atualizar Variedade" : "Salvar Variedade"}
            </button>
          </form>
        </div>

        <div className="w-4/5 ml-8 bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Variedades Cadastradas</h2>
          <ul className="space-y-6">
            {variedades.map((variety) => (
              <li key={variety.id} className="mb-4 flex justify-between items-center space-x-3">
                <div>
                <p className="font-semibold">{variety.name}</p>
                <p className="text-sm text-gray-600">{variety.description}</p>
                <p className="text-sm text-gray-600">
                  Atributos salvos: {Array.isArray(variety.attributes) ? variety.attributes.join(", ") : variety.attributes}
                </p>
                </div>
                <div className="flex space-x-4 mt-2">
                <button
                    onClick={() => handleEdit(variety)}
                    className="bg-[#007100] hover:bg-[#005304] rounded-sm text-sm px-4 py-2 text-center text-white transition-all duration-300 ease-in-out"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => variety.id !== undefined && handleDelete(variety.id)}
                    className="bg-red-600 hover:bg-red-800 rounded-sm text-sm px-4 py-2 text-center text-white transition-all duration-300 ease-in-out"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </main>
          </div>
  );
}

export default withAuth(EditVariety, ["/edit-variety"]);
