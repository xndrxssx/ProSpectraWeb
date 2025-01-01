// src/app/dashboard/page.tsx
"use client";

import { useState } from "react";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";

function Dashboard() {
  const [filters, setFilters] = useState({
    variedade: "",
    data: "",
    local: "",
  });
  const [dataAvailable, setDataAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState("gráficos"); // Tabs: gráficos, relatórios, comparações

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    // Simula o filtro de dados
    const success = Math.random() > 0.2; // 80% de chance de dados disponíveis
    setDataAvailable(success);
  };

  const renderContent = () => {
    if (!dataAvailable) {
      return (
        <div className="text-center mt-8">
          <p className="text-red-500 text-lg">Não há dados disponíveis para os filtros aplicados.</p>
          <button
            onClick={applyFilters}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Ajustar Filtros
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case "gráficos":
        return (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráficos simulados */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-bold mb-2">Produção por Variedade</h2>
              <div className="h-48 bg-gray-200 flex items-center justify-center rounded">
                <p>Gráfico interativo aqui</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-sm font-bold mb-2">Qualidade por Local</h2>
              <div className="h-48 bg-gray-200 flex items-center justify-center rounded">
                <p>Gráfico interativo aqui</p>
              </div>
            </div>
          </div>
        );
      case "relatórios":
        return (
          <div className="mt-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">Relatório Resumido</h2>
              <p>Aqui você verá o relatório detalhado baseado nos filtros aplicados.</p>
            </div>
          </div>
        );
      case "comparações":
        return (
          <div className="mt-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">Comparação de Variedades</h2>
              <p>Aqui você verá comparações entre variedades com base nos filtros.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 p-10">
        <div className="bg-white/10 max-w-5xl w-full mx-auto backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Dashboard Interativo</h1>
          <p className="text-center text-sm mb-6">
            Visualize os atributos de qualidade das uvas de forma interativa.
          </p>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Variedade da Uva:</label>
              <input
                type="text"
                name="variedade"
                value={filters.variedade}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Cabernet Sauvignon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Data:</label>
              <input
                type="date"
                name="data"
                value={filters.data}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Local:</label>
              <input
                type="text"
                name="local"
                value={filters.local}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Vale dos Vinhedos"
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button 
              onClick={applyFilters} 
              className="transition-all duration-350 ease-in-out bg-[#165a16] text-white px-6 py-2 rounded-md hover:bg-[#1f7e1f]">
              Aplicar Filtros
            </button>
          </div>


          {/* Tabs para alternar entre visualizações */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab("gráficos")}
              className={`py-2 px-4 rounded-lg ${
                activeTab === "gráficos" ? "border-2 border-[#165a16]" : "bg-gray-200 text-gray-700"
              }`}
            >
              Gráficos
            </button>
            <button
              onClick={() => setActiveTab("relatórios")}
              className={`py-2 px-4 rounded-lg ${
                activeTab === "relatórios" ? "border-2 border-[#165a16]" : "bg-gray-200 text-gray-700"
              }`}
            >
              Relatórios
            </button>
            <button
              onClick={() => setActiveTab("comparações")}
              className={`py-2 px-4 rounded-lg ${
                activeTab === "comparações" ? "border-2 border-[#165a16]" : "bg-gray-200 text-gray-700"
              }`}
            >
              Comparações
            </button>
          </div>

          {/* Conteúdo baseado na tab ativa */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default withAuth(Dashboard);