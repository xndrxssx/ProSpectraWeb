// src/app/enviar-dados/dispositivo/page.tsx
"use client";

import { useState } from "react";
import CustomSidebar from "@/components/Sidebar";

export default function EnviarDadosDispositivo() {
  const [formData, setFormData] = useState({
    variedade: "",
    data: "",
    local: "",
  });
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [spectralData, setSpectralData] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConnect = () => {
    // Simula a tentativa de conexão com o espectrômetro
    const success = Math.random() > 0.2; // 80% de chance de sucesso
    if (success) {
      setConnected(true);
      setError("");
    } else {
      setError("Não foi possível conectar ao espectrômetro. Verifique a conexão e tente novamente.");
    }
  };

  const handleReadData = () => {
    if (!connected) {
      setError("Conecte o espectrômetro antes de realizar a leitura.");
      return;
    }

    // Simula a leitura de dados espectrais
    const data = "Dados espectrais simulados: [500, 520, 530, 540]";
    setSpectralData(data);
    setError("");
  };

  const handleSubmit = () => {
    if (!spectralData) {
      setError("Nenhum dado espectral disponível para envio.");
      return;
    }

    // Simula o envio dos dados
    const success = Math.random() > 0.2; // 80% de chance de sucesso
    if (success) {
      alert("Dados enviados com sucesso para o servidor remoto!");
      setSpectralData(null);
      setFormData({ variedade: "", data: "", local: "" });
      setConnected(false);
      setError("");
    } else {
      setError("Falha no envio dos dados. Verifique a rede e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Enviar Dados Espectrais para o Servidor
          </h1>
          <p className="text-center text-sm mb-6">
            Conecte o espectrômetro e envie os dados para o servidor remoto.
          </p>

          {/* Formulário de coleta de informações */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Variedade da Uva:</label>
              <input
                type="text"
                name="variedade"
                value={formData.variedade}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Cabernet Sauvignon"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Data da Coleta:</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Local da Coleta:</label>
              <input
                type="text"
                name="local"
                value={formData.local}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Vale dos Vinhedos"
              />
            </div>
          </div>

          {/* Botões para conectar e realizar a leitura */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleConnect}
              className="flex-1 bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-350 ease-in-out"
              disabled={connected}
            >
              {connected ? "Conectado" : "Conectar Espectrômetro"}
            </button>
            <button
              onClick={handleReadData}
              className="flex-1 bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-350 ease-in-out"
            >
              Realizar Leitura
            </button>
          </div>

          {/* Exibição de dados espectrais */}
          {spectralData && (
            <div className="mt-4 bg-white/20 p-4 rounded-lg">
              <h2 className="text-sm font-medium mb-2">Resumo dos Dados Espectrais:</h2>
              <p className="text-sm">{spectralData}</p>
            </div>
          )}

          {/* Mensagem de erro */}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          {/* Botão de envio */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
          >
            Enviar Dados para o Servidor
          </button>
        </div>
      </main>
    </div>
  );
}
