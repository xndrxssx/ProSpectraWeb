"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SpectralData {
  id: string;
  dataset: string;
  name: string;
  variety: string;
  filter: string;
  graph: string;
}

interface SelectedSpectralData {
  id: string;
  name: string;
  variety: string;
  filter: string;
  graph: string;
}

function ApplyModels() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    model: "",
    variety: "",
    date: "",
    location: "",
    spectralDataId: "",
    predictionName: "",
  });
  const [spectralData, setSpectralData] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<string[]>([]); 
  const [spectralDataList, setSpectralDataList] = useState<SpectralData[]>([]);
  const [selectedSpectralData, setSelectedSpectralData] = useState<SelectedSpectralData | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        toast.info("Carregando modelos...");
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/list-models/`;
        console.log("Fetching models from:", url);
        const response = await fetch(url);
        const data = await response.json();
        setModels(data.models || []);
        toast.dismiss(); // Fecha o toast de "Carregando" depois de sucesso
      } catch (error) {
        console.error("Erro ao carregar modelos:", error);
        toast.error("Erro ao carregar modelos.");
      }
    };
  
    fetchModels();
  }, []);
  
  useEffect(() => {
    const fetchSpectralData = async () => {
      try {
        toast.info("Carregando dados espectrais...");
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/get-spectral-data/`;
        console.log("Fetching spectral data from:", url);
        const response = await fetch(url);
        const data = await response.json();
        setSpectralDataList(data || []);
        toast.dismiss(); 
      } catch (error) {
        console.error("Erro ao carregar dados espectrais:", error);
        toast.error("Erro ao carregar dados espectrais.");
      }
    };
  
    fetchSpectralData();
  }, []);  

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    if (name === "spectralDataId" && value) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-spectral-data/${value}`);
        const data = await response.json();
        setSelectedSpectralData(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do dado espectral:", error);
        toast.error("Erro ao buscar detalhes do dado espectral.");
        setSelectedSpectralData(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!filters.model || !filters.spectralDataId) {
      setError("Selecione um modelo e um dado espectral.");
      toast.warning("Selecione um modelo e um dado espectral.");
      return;
    }

    try {
      toast.info("Aplicando modelo...");
      const spectralDataId = parseInt(filters.spectralDataId, 10);
      if (isNaN(spectralDataId)) {
        throw new Error("ID do dado espectral inválido.");
      }
    
      const applyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/apply-model/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_name: filters.model,
          spectral_data_id: spectralDataId,
        }),
      });
    
      const applyData = await applyResponse.json();
    
      toast.info("Salvando predição...");
    
      const saveResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-prediction/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_name: filters.model,
          name: filters.predictionName,
          spectral_data_id: parseInt(filters.spectralDataId, 10),
          prediction: parseFloat(applyData.prediction),
        }),
      });
    
      console.log("Payload:", {
        name: filters.predictionName,
        model_name: filters.model,
        spectral_data_id: parseInt(filters.spectralDataId, 10),
        prediction: applyData.prediction,
      });
    
      toast.success("Predição salva com sucesso!");
    } catch (error) {
      setError("Erro ao aplicar o modelo ou salvar a predição.");
      toast.error("Erro ao aplicar o modelo ou salvar a predição.");
      console.error(error);
    }    
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <ToastContainer /> {/* Adiciona o ToastContainer para exibir notificações */}
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Aplicar Modelo</h1>
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
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="predictionName" className="block text-sm font-medium mb-2">
                Nome da Predição:
              </label>
              <input
                type="text"
                id="predictionName"
                name="predictionName"
                value={filters.predictionName}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="spectralDataId" className="block text-sm font-medium mb-2">
                Dados Espectrais:
              </label>
              <select
                id="spectralDataId"
                name="spectralDataId"
                value={filters.spectralDataId}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Selecione os dados espectrais</option>
                {Array.isArray(spectralDataList) &&
                  spectralDataList.map((data: SpectralData) => (
                    <option key={data.id} value={data.id}>
                      {`${data.name} - ${data.variety} - ${data.filter}`}
                    </option>
                  ))}
              </select>
              {selectedSpectralData && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                  <h3 className="font-bold">Detalhes do Dado Espectral:</h3>
                  <p><strong>Nome:</strong> {selectedSpectralData.name}</p>
                  <p><strong>Variedade:</strong> {selectedSpectralData.variety}</p>
                  <p><strong>Filtro:</strong> {selectedSpectralData.filter}</p>
                  <div className="mt-2">
                    <strong>Gráfico:</strong>
                    <img
                      src={`data:image/png;base64,${selectedSpectralData.graph}`}
                      alt="Gráfico do dado espectral"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
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
}

export default withAuth(ApplyModels);