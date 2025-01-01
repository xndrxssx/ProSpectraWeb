"use client";

import { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import withAuth from "@/components/withAuth";

// Definição do tipo Medicao
interface Medicao {
  id: number;
  data: string;
  variedade: string;
  espectro: string;
  predicoes: string[];
  coleta: string;
}

function MeasurementHistory() {
  const [medicoes, setMedicoes] = useState<Medicao[]>([]); // Lista de medições tipada.
  const [filtros, setFiltros] = useState({ data: "", variedade: "" }); // Filtros de busca.
  const [erro, setErro] = useState(""); // Mensagem de erro.
  const [loading, setLoading] = useState(false); // Indicação de carregamento.

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMedicoes([
        {
          id: 1,
          data: "2024-12-01",
          variedade: "Cabernet Sauvignon",
          espectro: "Espectro 1",
          predicoes: ["pH: 3.5", "Firmness: 7.2"],
          coleta: "Parcela A - Lote 12",
        },
        {
          id: 2,
          data: "2024-12-02",
          variedade: "Chardonnay",
          espectro: "Espectro 2",
          predicoes: ["pH: 3.8", "Firmness: 6.8"],
          coleta: "Parcela B - Lote 5",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleFiltroAplicar = () => {
    // Filtragem simulada (pode ser substituída por chamada API).
    const filtradas = medicoes.filter(
      (m) =>
        (!filtros.data || m.data.includes(filtros.data)) &&
        (!filtros.variedade || m.variedade.includes(filtros.variedade))
    );
    setMedicoes(filtradas);
    if (filtradas.length === 0) setErro("Nenhuma medição encontrada.");
    else setErro("");
  };

  const handleResetFiltros = () => {
    setFiltros({ data: "", variedade: "" });
    setErro("");
    // Recarregar medições (mock ou API).
    setMedicoes([
      // Dados simulados novamente.
    ]);
  };

  const handleDetalhes = (id: number) => {
    // Navegar para os detalhes da medição selecionada.
    console.log(`Detalhes da Medição ID: ${id}`);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl text-center font-bold mb-6">Histórico de Medições</h1>

        {/* Filtros */}
        <div className="bg-white/10 w-full backdrop-blur-sm rounded-lg p-8 shadow-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="data" className="block text-sm font-medium">
                Data
              </label>
              <input
                type="date"
                id="data"
                name="data"
                value={filtros.data}
                onChange={handleFiltroChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="variedade" className="block text-sm font-medium">
                Variedade de Uva
              </label>
              <input
                type="text"
                id="variedade"
                name="variedade"
                value={filtros.variedade}
                onChange={handleFiltroChange}
                placeholder="Ex.: Cabernet Sauvignon"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-4 justify-center items-center">
          <button 
                onClick={handleFiltroAplicar} 
                className="mt-6 bg-[#165a16] text-white px-6 py-2 rounded-md hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out">
                Aplicar Filtros
              </button>

              <button 
                onClick={handleResetFiltros} 
                className="mt-6 border border-[#165a16] text-[#165a16] px-6 py-2 rounded-md hover:bg-[#d6d6d6] hover:text-[#165a16] transition-all duration-400 ease-in-out">
                Limpar Filtros
              </button>
          </div>
        </div>

        {/* Lista de Medições */}
        <div className="bg-white/10 w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Resultados</h2>

          {loading && <p>Carregando medições...</p>}

          {!loading && erro && (
            <p className="text-red-500 text-sm">{erro}</p>
          )}

          {!loading && !erro && medicoes.length > 0 && (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[white] text-left">
                  <th className="p-2 border">Data</th>
                  <th className="p-2 border">Variedade</th>
                  <th className="p-2 border">Espectro</th>
                  <th className="p-2 border">Ações</th>
                </tr>
              </thead>
              <tbody>
                {medicoes.map((medicao) => (
                  <tr key={medicao.id} className="hover:bg-gray-100">
                    <td className="p-2 border">{medicao.data}</td>
                    <td className="p-2 border">{medicao.variedade}</td>
                    <td className="p-2 border">{medicao.espectro}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDetalhes(medicao.id)}
                        className="text-[#4ab435] hover:underline"
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && !erro && medicoes.length === 0 && (
            <p>Nenhuma medição encontrada.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default withAuth(MeasurementHistory);