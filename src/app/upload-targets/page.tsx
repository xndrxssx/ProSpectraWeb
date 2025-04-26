"use client";

import React, { useState } from "react";
import ExcelJS from "exceljs";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SaveTargets() {
  const [atributoNome, setAtributoNome] = useState("");
  const [YData, setYData] = useState<number[]>([]); // Atualizar para um array de arrays
  const [erro, setErro] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = async () => {
        const buffer = reader.result as ArrayBuffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
  
        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
          setErro("Planilha não encontrada.");
          return;
        }
  
        let yData: number[] = [];  // Array para armazenar os dados como números
        worksheet.eachRow((row, rowNumber) => {
          if (Array.isArray(row.values)) {
            // Agora pegamos todos os valores, sem ignorar o título
            const rowData = row.values.map(Number).filter(val => !isNaN(val)); // Converte para números e filtra valores inválidos
            yData.push(...rowData);  // Adiciona todos os valores ao array simples
          }
        });
  
        setYData(yData);  // Atualiza YData com todos os valores do arquivo
        setErro(null);  // Limpa o erro caso o arquivo tenha sido carregado corretamente
      };
  
      reader.readAsArrayBuffer(file);
    }
  };  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificação para garantir que todos os campos estejam preenchidos corretamente
    if (!atributoNome || YData.length === 0 ) {
      toast.error("Por favor, preencha todos os campos e carregue o arquivo.");
      return;
    }

    const payload = {
      attribute: atributoNome,
      y: YData,  // Envia o array de arrays de números
    };
    console.log("Payload", payload);

    try {
      toast.info("Salvando targets...");
      // Enviar os dados ao backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-targets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao enviar os dados.");
      toast.success("Features salvas com sucesso!");
      setAtributoNome("");
      setYData([]);
    } catch (error) {
      toast.error("Erro ao salvar os dados.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <ToastContainer /> {/* Adiciona o ToastContainer para exibir notificações */}
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Salvar Targets</h1>

          {erro && <div className="text-red-500 text-center mb-4">{erro}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="atributoNome" className="block text-sm font-medium mb-2">
                Nome do dataset:
              </label>
              <input
                id="atributoNome"
                value={atributoNome}
                onChange={(e) => setAtributoNome(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Digite o nome do atributo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Carregar Arquivo de Targets
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#208120] transition-all duration-300 ease-in-out"
              >
                Salvar Features
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withAuth(SaveTargets);
