"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // App Router
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";

function EditFilter() {
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<'SG'>('SG'); // Inicializando com SG
  const [parametros, setParametros] = useState({
    window_length: 5,
    polyorder: 2,
    deriv: 0,
    delta: 1.0,
    axis: -1,
    mode: 'interp',
    cval: 0.0,
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false); // Para controle do popup de sucesso
  const [filtrosSG, setFiltrosSG] = useState<any[]>([]); // Para listar os filtros SG
  const router = useRouter();

  useEffect(() => {
    // Carregar filtros SG ao carregar a página
    fetchFilters();
  }, []);

  // Função para buscar filtros SG do banco de dados
  const fetchFilters = async () => {
    try {
      const response = await fetch("/api/edit-filter");
      const data = await response.json();
      if (data.success) {
        setFiltrosSG(data.filters.filter((filter: any) => filter.type === 'SG'));
      }
    } catch (error) {
      console.error("Erro ao carregar filtros:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!filtroNome || !filtroTipo) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await fetch("/api/edit-filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: filtroNome,
          type: filtroTipo,
          parameters: parametros,
        }),
      });

      if (response.ok) {
        setSucesso(true); // Mostrar o popup de sucesso
        setFiltroNome(""); // Limpar campos
        setParametros({
          window_length: 5,
          polyorder: 2,
          deriv: 0,
          delta: 1.0,
          axis: -1,
          mode: 'interp',
          cval: 0.0,
        });
        fetchFilters(); // Atualizar a lista de filtros SG
      } else {
        setErro("Ocorreu um erro ao salvar o filtro.");
      }
    } catch (error) {
      console.error("Erro ao salvar filtro:", error);
      setErro("Ocorreu um erro. Tente novamente.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/edit-filter", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchFilters(); // Atualizar a lista de filtros SG após a exclusão
      } else {
        console.error("Erro ao excluir o filtro");
      }
    } catch (error) {
      console.error("Erro ao excluir o filtro:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="flex w-full max-w-4xl">
          {/* Formulário de Edição */}
          <div className="bg-white/10 w-2/3 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Editar Filtro</h1>
            <p className="text-center text-sm mb-6">
              Atualize os detalhes do filtro para personalização.
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
                <label htmlFor="filtroTipo" className="block text-sm font-medium mb-2">
                  Tipo de Filtro
                </label>
                <select
                  id="filtroTipo"
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value as 'SG')}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="SG">SG</option>
                </select>
              </div>

              {filtroTipo === 'SG' && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Parâmetros para SG</h3>
                  <div>
                    <label htmlFor="window_length" className="block text-sm font-medium mb-2">
                      Window Length
                    </label>
                    <input
                      id="window_length"
                      type="number"
                      value={parametros.window_length}
                      onChange={(e) => setParametros({ ...parametros, window_length: +e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Tamanho da janela"
                    />
                  </div>
                  <div>
                    <label htmlFor="polyorder" className="block text-sm font-medium mb-2">
                      Polyorder
                    </label>
                    <input
                      id="polyorder"
                      type="number"
                      value={parametros.polyorder}
                      onChange={(e) => setParametros({ ...parametros, polyorder: +e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Ordem do polinômio"
                    />
                  </div>
                  <div>
                    <label htmlFor="deriv" className="block text-sm font-medium mb-2">
                      Derivada
                    </label>
                    <input
                      id="deriv"
                      type="number"
                      value={parametros.deriv}
                      onChange={(e) => setParametros({ ...parametros, deriv: +e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Derivada"
                    />
                  </div>
                  <div>
                    <label htmlFor="delta" className="block text-sm font-medium mb-2">
                      Delta
                    </label>
                    <input
                      id="delta"
                      type="number"
                      value={parametros.delta}
                      onChange={(e) => setParametros({ ...parametros, delta: +e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Delta"
                    />
                  </div>
                </div>
              )}

              {erro && <p className="text-red-500 text-sm">{erro}</p>}

              <button
                type="submit"
                className="mt-6 w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
              >
                Salvar Filtro
              </button>
            </form>
          </div>

          {/* Listagem de Filtros */}
          <div className="w-1/3 ml-8 bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Filtros Salvos</h2>
            {filtrosSG.length === 0 ? (
              <p className="text-sm text-center">Nenhum filtro salvo.</p>
            ) : (
              <ul className="space-y-2">
                {filtrosSG.map((filtro) => (
                  <li key={filtro._id} className="flex justify-between items-center">
                    <span>{filtro.name}</span>
                    <button
                      onClick={() => handleDelete(filtro._id)}
                      className="bg-red-600 hover:bg-red-800 rounded-sm text-sm px-4 py-2 text-center text-white transition-all duration-300 ease-in-out"
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Popup de Sucesso */}
      {sucesso && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Filtro salvo com sucesso!</h3>
            <button
              onClick={() => setSucesso(false)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(EditFilter, ["/edit-filter"]);