"use client";

import React, { useState, useEffect } from "react";
import ExcelJS from "exceljs";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import Select, { StylesConfig, Theme } from "react-select";

interface Option {
  label: string;
  value: string;
}

function SaveWavelengths() {
  const [dataSet, setDataSet] = useState("");
  const [wavelengths, setWavelengths] = useState<number[]>([]);
  const [xData, setXData] = useState<number[][]>([]);
  const [filter, setFilter] = useState<string | "Nenhum">("Selecionar filtro");
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
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    console.log("Wavelengths atualizado:", wavelengths);
    console.log("X Data atualizado:", xData);
  }, [wavelengths, xData]);

  const handleFile = async (selectedFile: File) => {
    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = async () => {
        const buffer = reader.result as ArrayBuffer;
        const workbook = new ExcelJS.Workbook();
  
        try {
          await workbook.xlsx.load(buffer);
  
          const worksheet = workbook.getWorksheet(1);
          if (!worksheet) {
            toast.error("Planilha não encontrada.");
            return;
          }
          toast.success("Planilha carregada com sucesso!");
  
          // Process the wavelengths (first row)
          const firstRow = worksheet.getRow(1);
          if (firstRow && Array.isArray(firstRow.values)) {
            const wavelengthsData = firstRow.values
              .slice(1) // Ignore the first value (label/index)
              .map(val => Number(val))
              .filter(val => !isNaN(val)); // Filter invalid values
  
            if (wavelengthsData.length > 0) {
              setWavelengths(wavelengthsData);
              setErro(null); // Clear previous errors
            } else {
              toast.error("Valores da primeira linha são inválidos.");
              return;
            }
  
            // Process the X data (remaining rows)
            const xDataArray: number[][] = [];
            worksheet.eachRow((row, rowNumber) => {
              if (rowNumber > 1) { // Skip the first row (wavelengths)
                const rowValues = row.values as any[];
                const rowData = rowValues
                  .slice(1) // Ignore the first value (label/index)
                  .map(val => Number(val))
                  .filter(val => !isNaN(val)); // Filter invalid values
  
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
        } catch (error) {
          toast.error("Erro ao processar o arquivo.");
          console.error(error);
        }
      };
  
      reader.readAsArrayBuffer(selectedFile);
    }
  };  

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
      setFilter("Selecionar filtro");
    } catch (error) {
      toast.error("Erro ao salvar os dados.");
      console.error(error);
    }
  };

  // Usando o React Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": []
    },
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        setFile(selectedFile);
        handleFile(selectedFile); // <- Você cria essa função baseada no que hoje está no seu handleFileChange
      }
    }
  });

    const customStyles: StylesConfig<Option, false> = {
      control: (base) => ({ ...base, borderRadius: 8, padding: "0.25rem" }),
      option:  (base, state) => ({
        ...base,
        background: state.isFocused ? "#e6ffe6" : "white",
        color: "#001E01",
      }),
    };
    
    const customTheme = (theme: Theme) => ({
      ...theme,
      colors: { ...theme.colors, primary25: "#e6ffe6", primary: "#165a16" },
      borderRadius: 8,
    });

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
              {/* Usando o React Dropzone */}
              <div
                  {...getRootProps()}
                  className="text-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Solte o arquivo aqui...</p>
                  ) : (
                    <p>Arraste e solte o arquivo aqui, ou clique para selecionar.</p>
                  )}
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Escolha um Filtro</label>
              <Select
                instanceId={"filtro-select"}
                value={{ label: filter || "Nenhum", value: filter || "Nenhum" }}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setFilter(selectedOption.value);
                  } else {
                    setFilter("Nenhum"); // Quando não há seleção, define o filtro como "Nenhum"
                  }
                }}
                options={[
                  { label: "Nenhum", value: "Nenhum" },
                  { label: "MSC", value: "MSC" },
                  { label: "SNV", value: "SNV" },
                  { label: "SG", value: "SG" },
                ]}
                className="w-full"
                placeholder="Selecione o filtro"
                isClearable
                styles={customStyles}
                theme={customTheme}
              />

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
