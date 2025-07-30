"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const limiteCaracteres = 200;

  const fetchVarieties = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/edit-variety`);
      const data = await response.json();
      setVariedades(data);
    } catch (error) {
      console.error("Erro ao buscar variedades", error);
      toast.error("Erro ao buscar variedades.");
    }
  };

  useEffect(() => {
    fetchVarieties();
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeVariedade || !descricao || !atributos) {
      toast.error("Todos os campos são obrigatórios.");
      return;
    }

    const atributosArray = atributos.split(",").map((attr) => attr.trim());

    const bodyData: Variety = {
      name: nomeVariedade,
      description: descricao,
      attributes: atributosArray,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      let response;
      if (editando) {
        bodyData.id = editando.id; // Incluir o ID se estiver editando
        response = await fetch(`${apiUrl}/api/edit-variety`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
      } else {
        response = await fetch(`${apiUrl}/api/edit-variety`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
      }

      if (response.ok) {
        fetchVarieties();
        toast.success(editando ? "Variedade atualizada com sucesso!" : "Variedade criada com sucesso!");
        setErro("");
        setNomeVariedade("");
        setDescricao("");
        setAtributos("");
        setEditando(null); // Limpa o estado de edição
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Ocorreu um erro. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao salvar variedade.");
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        const response = await fetch(`${apiUrl}/api/edit-variety`, {
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
          toast.error(errorData.error || "Erro ao deletar variedade.");
        }
      } catch (error) {
        toast.error("Erro ao deletar variedade.");
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
    <div className="min-h-screen w-full flex bg-gradient-to-br from-gray-50 to-gray-100"> 
      <CustomSidebar />
      <ToastContainer />
      
      {/* Container principal */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho da página */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4 text-center">Gerenciamento de Variedades</h1>
            <p className="text-center text-sm mb-6">Adicione, edite e gerencie as variedades do sistema</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulário para adicionar/editar variedade */}
            <div className="bg-gray-50 rounded-xl border border-gray-300 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {editando ? "Editar Variedade" : "Adicionar Nova Variedade"}
                </h2>
              </div>

              <form onSubmit={handleCreateOrUpdate} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Variedade
                  </label>
                  <input
                    type="text"
                    name="nomeVariedade"
                    value={nomeVariedade}
                    onChange={(e) => setNomeVariedade(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ex: Cabernet Sauvignon"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="descricao"
                    value={descricao}
                    onChange={handleDescricaoChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Descrição da variedade"
                    rows={4}
                  />
                  <div className="text-right text-sm mt-2 text-gray-500">
                    {descricao.length}/{limiteCaracteres} caracteres
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Atributos
                  </label>
                  <input
                    type="text"
                    name="atributos"
                    value={atributos}
                    onChange={(e) => setAtributos(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ex: Acidez titulável, pH, Brix"
                  />
                </div>

                {erro && <p className="text-red-500 text-sm">{erro}</p>}
                {mensagem && <p className="text-green-500 text-sm">{mensagem}</p>}

                <button
                  type="submit"
                  className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#208120] transition-all duration-300 ease-in-out font-medium"
                  disabled={descricao.length > limiteCaracteres}
                >
                  {editando ? "Atualizar Variedade" : "Salvar Variedade"}
                </button>

                {editando && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditando(null);
                      setNomeVariedade("");
                      setDescricao("");
                      setAtributos("");
                    }}
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300 ease-in-out font-medium"
                  >
                    Cancelar Edição
                  </button>
                )}
              </form>
            </div>

            {/* Lista de variedades */}
            <div className="bg-gray-50 rounded-xl border border-gray-300 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Variedades Cadastradas</h2>
                <span className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {variedades.length} variedade{variedades.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="h-96 overflow-y-auto pr-2 space-y-3">
                {variedades.length > 0 ? (
                  variedades.map((variety) => (
                    <div key={variety.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="font-semibold text-gray-800 mr-3">{variety.name}</h3>
                            {editando?.id === variety.id && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                Editando
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{variety.description}</p>
                          <p className="text-xs text-gray-500">
                            <span className="font-medium">Atributos:</span> {Array.isArray(variety.attributes) ? variety.attributes.join(", ") : variety.attributes}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEdit(variety)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => variety.id !== undefined && handleDelete(variety.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">Nenhuma variedade cadastrada</p>
                    <p className="text-gray-400 text-sm">Adicione a primeira variedade usando o formulário ao lado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(EditVariety, ["/edit-variety"]);
