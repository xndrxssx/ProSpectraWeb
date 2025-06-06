"use client";

import React, { useState, useEffect } from "react";
import ExcelJS from "exceljs";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SaveWavelengths() {
  const [dataSet, setDataSet] = useState("");
  const [wavelengths, setWavelengths] = useState<number[]>([]);
  const [xData, setXData] = useState<number[][]>([]);
  const [filter, setFilter] = useState<string | "Nenhum">("null");
  const [sgParams, setSgParams] = useState({
    window_length: 5,
    polyorder: 2,
    deriv: 0,
    delta: 1,
    axis: -1,
    mode: "interp",
    cval: 0,
  });
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
          toast.error("Planilha não encontrada.");
          return;
        }
        toast.success("Planilha carregada com sucesso!");
  
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
            toast.error("Valores da primeira linha são inválidos.");
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

  useEffect(() => {
    console.log("Wavelengths atualizado:", wavelengths);
    console.log("X Data atualizado:", xData);
  }, [wavelengths, xData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataSet || wavelengths.length === 0 || xData.length === 0) {
      toast.error("Preencha todos os campos e carregue um arquivo.");
      return;
    }

    const payload: any = {
      dataset: dataSet,
      wavelengths: wavelengths.map(Number),
      X: xData.map(row => row.map(Number)),
      filter,
      sgParams
    };

    if (filter === "SG" && sgParams) {
      payload.sgParams = sgParams;
    }

    console.log("Payload a ser enviado:", payload);

    try {
      toast.info("Enviando dados...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-wavelengths/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao salvar os dados.");
      toast.success("Dados salvos com sucesso!");
      setDataSet("");
      setWavelengths([]);
      setXData([]);
      setFilter("null");
    } catch (error) {
      toast.error("Erro ao salvar os dados.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-gray-900">
      <CustomSidebar />
      <ToastContainer />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 w-3/5 backdrop-blur-sm rounded-lg p-16 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Salvar Comprimentos de Onda</h1>

          {erro && <div className="text-red-500 text-center mb-4">{erro}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="atributoNome" className="block text-sm font-medium mb-2">
                Nome do Atributo:
              </label>
              <input
                id="atributoNome"
                value={dataSet}
                onChange={(e) => setDataSet(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Digite o nome do atributo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Carregar Arquivo de Dados</label>
              <input type="file" onChange={handleFileUpload} className="w-full p-2 border border-gray-300 rounded-lg" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Escolha um Filtro</label>
              <select
                value={filter || "Nenhum"}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="Nenhum">Nenhum</option>
                <option value="MSC">MSC</option>
                <option value="SNV">SNV</option>
                <option value="SG">Savitzky-Golay (SG)</option>
              </select>
            </div>

            {filter === "SG" && (
              <div className="p-4 max-w-4xl mx-auto">
                <h2 className="text-lg font-semibold">Parâmetros do SG</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                
                
                <label>Window Length:</label>
                <input type="number" value={sgParams.window_length} onChange={(e) => setSgParams({ ...sgParams, window_length: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                <label>Polyorder:</label>
                <input type="number" value={sgParams.polyorder} onChange={(e) => setSgParams({ ...sgParams, polyorder: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                <label>Derivative:</label>
                <input type="number" value={sgParams.deriv} onChange={(e) => setSgParams({ ...sgParams, deriv: Number(e.target.value) })} className="w-full p-2 border border-gray-300 rounded-lg" required />
                </div>
              </div>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#208120] transition-all duration-300 ease-in-out"
              >
                Salvar Dados
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withAuth(SaveWavelengths);
