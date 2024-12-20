// src/app/enviar-dados/local/page.tsx
"use client";

import { useState } from "react";
import CustomSidebar from "@/components/Sidebar";

export default function EnviarDadosLocais() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    variedade: "",
    data: "",
    local: "",
  });
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setError("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError("Por favor, anexe um arquivo CSV ou Excel válido.");
      return;
    }

    // Simula o envio dos dados (substitua por lógica real se necessário)
    console.log("Arquivo:", file);
    console.log("Dados do formulário:", formData);
    alert("Dados enviados com sucesso!");
    setFile(null);
    setFormData({ variedade: "", data: "", local: "" });
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Enviar Dados Espectrais Locais
          </h1>
          <p className="text-center text-sm mb-6">
            Insira os dados espectrais locais para análise.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo para anexar arquivo */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Anexar Arquivo (CSV ou Excel):
              </label>
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>

            {/* Campos adicionais */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Variedade da Uva:
              </label>
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
              <label className="block text-sm font-medium mb-2">
                Data da Coleta:
              </label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Local da Coleta:
              </label>
              <input
                type="text"
                name="local"
                value={formData.local}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Vale dos Vinhedos"
              />
            </div>

            {/* Mensagem de erro */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Botão de envio */}
            <button
              type="submit"
              className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#208120] transition-all duration-300 ease-in-out"
            >
              Enviar Dados
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
