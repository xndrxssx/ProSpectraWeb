"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse"; // Biblioteca para manipular CSVs
import ExcelJS from "exceljs"; // Biblioteca para manipular arquivos Excel
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { Variety } from "@prisma/client";

function SentLocalData() {
  const [file, setFile] = useState<File | null>(null);
  const [tableData, setTableData] = useState<number[][]>([]); // Alterado para number[][] em vez de string[][]
  const [formData, setFormData] = useState({
    nome_reg: "",
    variedade: "",
    data: "",
    local: "",
    filtro: "nenhum", // Filtro selecionado
    sgParams: {
      window_length: 5,
      polyorder: 2,
      deriv: 0,
      delta: 1,
      axis: -1,
      mode: "interp",
      cval: 0,
    },
  });
  const [error, setError] = useState("");
  const [variety, setVariedades] = useState<Variety[]>([]);

  useEffect(() => {
  const fetchVariedades = async () => {
    try {
      const response = await fetch("/api/edit-variety");
      const data = await response.json();
      // console.log("Variedades encontradas no banco:", data);
      setVariedades(data);
    } catch (error) {
      console.error("Erro ao buscar variedades:", error);
    }
  };
    fetchVariedades();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setError("");
  
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const binaryStr = e.target?.result as ArrayBuffer;
  
        if (selectedFile.type.includes("excel")) {
          // Process Excel with ExcelJS
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(binaryStr); // Load the Excel file
  
          const worksheet = workbook.worksheets[0]; // Get the first sheet
          const data: string[][] = [];
  
          worksheet.eachRow((row, rowNumber) => {
            const rowData: string[] = [];
            row.eachCell({ includeEmpty: true }, (cell) => {
              rowData.push(cell.text); // Extract the text from the cell
            });
            data.push(rowData);
          });
  
          // Convert data to numbers
          const dadosComoNumeros = converterParaNumeros(data);
          setTableData(dadosComoNumeros);
        } else if (selectedFile.type.includes("csv")) {
          // Process CSV with PapaParse
          Papa.parse<string[]>(selectedFile, {
            complete: (results) => {
              const dadosComoStrings = results.data;
              const dadosComoNumeros = converterParaNumeros(dadosComoStrings);
              setTableData(dadosComoNumeros);
            },
            skipEmptyLines: true,
          });
        }
      };
      reader.readAsArrayBuffer(selectedFile); // Use readAsArrayBuffer for Excel processing
    }
  };    

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const converterParaNumeros = (dados: string[][]): number[][] => {
    return dados.map(linha =>
      linha.map(valor =>
        parseFloat(valor.replace(',', '.'))  // Substitui a vírgula por ponto e converte para número
      )
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError("Por favor, selecione um arquivo.");
      return;
    }
  
    try {
      // Enviar os dados brutos para o backend, sem aplicar os filtros no frontend
      const dataToSend = {
        name: file.name,
        content: tableData,  // Dados espectrais
        variety: formData.variedade,
        datetime: formData.data, // Enviando a data correta
        local: formData.local,
        filter: formData.filtro, // Filtro selecionado
        sgParams: formData.sgParams, // Parâmetros do SG
      };
      
      console.log("Dados enviados:", dataToSend); // Verificando os dados no console
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) throw new Error("Erro ao enviar os dados.");
      alert("Dados enviados com sucesso!");
      setFile(null);
      setTableData([]);
      setFormData({
        nome_reg: "",
        variedade: "",
        data: "",
        local: "",
        filtro: "nenhum",
        sgParams: { window_length: 5, polyorder: 2, deriv: 0, delta: 1, axis: -1, mode: "interp", cval: 0 },
      });
    } catch (err) {
      setError("Erro ao enviar os dados. Tente novamente.");
    }
  };  

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className=" bg-white/10 w-3/5 backdrop-blur-sm rounded-lg p-16 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Enviar Dados Espectrais Locais
          </h1>
          <p className="text-center text-sm mb-6">
            Insira os dados espectrais locais para análise.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Registro:</label>
              <input
                type="text"
                name="nome_reg"
                value={formData.nome_reg}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Anexar Arquivo (CSV ou Excel):</label>
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Variedade da Uva:</label>
              <select
                name="variedade"
                value={formData.variedade}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Selecione a variedade</option>
                {variety && variety.length > 0 ? (
                  variety.map((variety) => (
                    <option key={variety.id} value={variety.name}>
                      {variety.name}
                    </option>
                  ))
                ) : (
                  <option value="">Nenhuma variedade disponível</option>
                )}
              </select>
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Escolha um filtro:</label>
              <select
                name="filtro"
                value={formData.filtro}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="nenhum">Nenhum</option>
                <option value="MSC">Correção de dispersão multiplicativa (MSC)</option>
                <option value="SNV">Padrão Normal Variável (SNV)</option>
                <option value="SG">Filtro Savitzky–Golay</option>
              </select>
            </div>

            {formData.filtro === "SG" && (
              <div className="p-4 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="window_length" className="block text-sm font-medium text-gray-700">Window Length</label>
                    <input
                      type="number"
                      id="window_length"
                      name="window_length"
                      value={formData.sgParams.window_length}
                      onChange={(e) => {
                        const value = e.target.value ? +e.target.value : 0; // Garantir que seja um número
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, window_length: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Window Length"
                    />
                  </div>

                  <div>
                    <label htmlFor="polyorder" className="block text-sm font-medium text-gray-700">Polyorder</label>
                    <input
                      type="number"
                      id="polyorder"
                      name="polyorder"
                      value={formData.sgParams.polyorder}
                      onChange={(e) => {
                        const value = e.target.value ? +e.target.value : 0; // Garantir que seja um número
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, polyorder: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Polyorder"
                    />
                  </div>

                  <div>
                    <label htmlFor="deriv" className="block text-sm font-medium text-gray-700">Deriv</label>
                    <input
                      type="number"
                      id="deriv"
                      name="deriv"
                      value={formData.sgParams.deriv}
                      onChange={(e) => {
                        const value = e.target.value ? +e.target.value : 0; // Garantir que seja um número
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, deriv: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Deriv"
                    />
                  </div>

                  <div>
                    <label htmlFor="delta" className="block text-sm font-medium text-gray-700">Delta</label>
                    <input
                      type="number"
                      id="delta"
                      name="delta"
                      value={formData.sgParams.delta}
                      onChange={(e) => {
                        const value = e.target.value ? +e.target.value : 0;
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, delta: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Delta"
                    />
                  </div>

                  <div>
                    <label htmlFor="axis" className="block text-sm font-medium text-gray-700">Axis</label>
                    <input
                      type="number"
                      id="axis"
                      name="axis"
                      value={formData.sgParams.axis}
                      onChange={(e) => {
                        const value = e.target.value ? +e.target.value : 0;
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, axis: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Axis"
                    />
                  </div>

                  <div>
                    <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Mode</label>
                    <input
                      type="text"
                      id="mode"
                      name="mode"
                      value={formData.sgParams.mode}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, mode: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Mode"
                    />
                  </div>

                  <div>
                    <label htmlFor="cval" className="block text-sm font-medium text-gray-700">Cval</label>
                    <input
                      type="number"
                      id="cval"
                      name="cval"
                      value={formData.sgParams.cval}
                      onChange={(e) => {
                        const value = e.target.value ? +e.target.value : 0;
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, cval: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Cval"
                    />
                  </div>
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

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

export default withAuth(SentLocalData);
