"use client"

import React, { useState } from "react";
import ExcelJS from "exceljs";
import CustomSidebar from "@/components/Sidebar"; 
import withAuth from "@/components/withAuth";

function SaveWavelengths() {
  const [dataSet, setDataSet] = useState("");
  const [wavelengths, setWavelengths] = useState<number[]>([]);
  const [xData, setXData] = useState<number[][]>([]); // Armazenar X DATA
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
  
        // Pegando a primeira linha como comprimento de onda
        const firstRow = worksheet.getRow(1);
        if (firstRow && Array.isArray(firstRow.values)) {
          // Converter os valores da primeira linha para números
          const wavelengthsData = firstRow.values
            .slice(1) // Ignora o primeiro valor (rótulo ou índice)
            .map(val => Number(val)) // Converte para número
            .filter(val => !isNaN(val)); // Filtra valores inválidos
  
          if (wavelengthsData.length > 0) {
            setWavelengths(wavelengthsData);
            setErro(null); // Limpa qualquer erro anterior
          } else {
            setErro("Valores da primeira linha são inválidos.");
            return;
          }
  
          // Pegando as linhas restantes para X DATA
          const xDataArray: number[][] = [];
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) { // Ignorando a primeira linha
              const rowValues = row.values as any[]; // Garantir que row.values seja tratado como um array
  
              // Converter os valores da linha para números
              const rowData = rowValues
                .slice(1) // Ignora o primeiro valor (rótulo ou índice)
                .map(val => Number(val)) // Converte para número
                .filter(val => !isNaN(val)); // Filtra valores inválidos
  
              if (rowData.length > 0) {
                xDataArray.push(rowData);
              } else {
                console.warn(`Linha ${rowNumber} tem dados inválidos, ignorando...`);
              }
            }
          });
  
          setXData(xDataArray);
        } else {
          setErro("Primeira linha não encontrada ou inválida.");
        }
      };
  
      reader.readAsArrayBuffer(file);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!dataSet || !wavelengths.length || !xData.length) {
        setErro("Por favor, preencha todos os campos e carregue o arquivo.");
        return;
      }

      const payload = {
        dataset: String(dataSet), // Certifique-se de que é uma string
        wavelengths: wavelengths.map(Number), // Converta para números inteiros
        X: xData.map(row => row.map(Number)), // Converta cada elemento para número de ponto flutuante
      };
      console.log("Payload", payload);

      // Enviar os dados ao backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-wavelengths/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao enviar os dados.");
      alert("Comprimentos de onda e dados salvos com sucesso!");
      setDataSet("");
      setWavelengths([]);
      setXData([]);
    } catch (error) {
      setErro("Erro ao salvar os dados.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Salvar Comprimentos de Onda</h1>

          {erro && <div className="text-red-500 text-center mb-4">{erro}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="atributoNome" className="block text-sm font-medium mb-2">
                Nome do atributo:
              </label>
              <input
                id="atributoNome"
                value={dataSet}
                onChange={(e) => setDataSet(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Digite o nome do atributo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Carregar Arquivo de Comprimentos de Onda
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
                Salvar Comprimentos de Onda
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withAuth(SaveWavelengths);