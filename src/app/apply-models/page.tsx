"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";

function ApplyModels (){
  const router = useRouter();
  const [filters, setFilters] = useState({
    model: "",
    variety: "",
    date: "",
    location: "",
  });
  const [spectralData, setSpectralData] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Função para lidar com mudanças nos filtros
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Função para lidar com upload de dados espectrais
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSpectralData(e.target.files[0]);
    }
  };

  // Função para submissão do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!filters.model || !spectralData) {
      setError("Selecione um modelo e forneça os dados espectrais.");
      return;
    }

    // Lógica para processar os dados utilizando o modelo e os filtros
    console.log("Processando dados com os filtros:", filters, spectralData);
    setError(null);

    // Navegar para a página de resultados
    router.push("/results");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar /> {/* Adicionando a sidebar ao layout */}

      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Aplicar Modelos e Filtros
          </h1>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="model" className="block text-sm font-medium mb-2">
                Modelo Preditivo:
              </label>
              <select
                id="model"
                name="model"
                value={filters.model}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Selecione um modelo</option>
                <option value="modelo1">Modelo 1</option>
                <option value="modelo2">Modelo 2</option>
                <option value="modelo3">Modelo 3</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="variety"
                className="block text-sm font-medium mb-2"
              >
                Variedade:
              </label>
              <input
                type="text"
                id="variety"
                name="variety"
                value={filters.variety}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">
                Data:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-2"
              >
                Local:
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label
                htmlFor="spectralData"
                className="block text-sm font-medium mb-2"
              >
                Dados Espectrais:
              </label>
              <input
                type="file"
                id="spectralData"
                name="spectralData"
                accept=".csv, .xlsx"
                onChange={handleFileUpload}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
            >
              Aplicar Modelo
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default withAuth(ApplyModels);
