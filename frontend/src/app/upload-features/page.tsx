"use client";

import React, { useState, useEffect, useCallback } from "react";
import ExcelJS from "exceljs";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, CheckCircle2, XCircle, File as FileIcon, LoaderCircle } from "lucide-react";
import Select, { StylesConfig, Theme } from "react-select";

interface Option {
  label: string;
  value: string;
}

type UploadStatus = 'idle' | 'processing' | 'ready' | 'submitting' | 'success' | 'error';

function SaveWavelengths() {
  const [dataSet, setDataSet] = useState("");
  const [wavelengths, setWavelengths] = useState<number[]>([]);
  const [xData, setXData] = useState<number[][]>([]);
  const [filter, setFilter] = useState<string | "Nenhum">("Selecionar filtro");
  const [sgParams, setSgParams] = useState({
    window_length: 5,
    polyorder: 2,
    deriv: 0
  });
  const [erro, setErro] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    console.log("Wavelengths atualizado:", wavelengths);
    console.log("X Data atualizado:", xData);
  }, [wavelengths, xData]);

  const processFile = async (selectedFile: File) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadStatus('processing'); // <- Informa que o processamento começou
    setFeedbackMessage('Lendo arquivo Excel...');

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = async () => {
      const buffer = reader.result as ArrayBuffer;
      const workbook = new ExcelJS.Workbook();
      try {
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
          throw new Error("Planilha não encontrada no arquivo.");
        }

        const firstRow = worksheet.getRow(1);
        if (!firstRow || !Array.isArray(firstRow.values)) {
            throw new Error("Primeira linha (wavelengths) não encontrada ou inválida.");
        }
        
        const wavelengthsData = (firstRow.values as any[]).slice(1).map(Number).filter(v => !isNaN(v));
        if (wavelengthsData.length === 0) {
            throw new Error("Nenhum comprimento de onda válido encontrado na primeira linha.");
        }
        setWavelengths(wavelengthsData);

        const xDataArray: number[][] = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                const rowData = (row.values as any[]).slice(1).map(Number).filter(v => !isNaN(v));
                if (rowData.length > 0) xDataArray.push(rowData);
            }
        });
        setXData(xDataArray);

        // Sucesso no processamento
        setUploadStatus('ready');
        setFeedbackMessage('Arquivo processado. Pronto para salvar.');

      } catch (error: any) {
        console.error(error);
        setUploadStatus('error');
        setFeedbackMessage(error.message || 'Erro ao processar o arquivo.');
        setFile(null); // Limpa o arquivo em caso de erro
      }
    };
    reader.onerror = () => {
        setUploadStatus('error');
        setFeedbackMessage('Não foi possível ler o arquivo.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadStatus !== 'ready' || !file) {
      toast.error("Por favor, carregue e processe um arquivo válido primeiro.");
      return;
    }

    setUploadStatus('submitting');
    setFeedbackMessage('Salvando dados no servidor...');

    const payload = {
      dataset: dataSet,
      wavelengths: wavelengths,
      X: xData,
      filter: filter,
      sgParams
    };
    if (filter==="SG" && sgParams){
      payload.sgParams=sgParams
    }

    console.log("Payload a ser enviado:", payload);

    try {
      toast.info("Enviando dados...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-wavelengths/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || `Erro do servidor: ${response.statusText}`);
      }
      toast.success('Features criadas!')
      setUploadStatus('success');
      setFeedbackMessage('Dados salvos com sucesso!');
      handleReset();
    } catch (error: any) {
      setUploadStatus('error');
      setFeedbackMessage(error.message || "Erro ao salvar os dados.");
      console.error(error);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    // Reseta o estado para um novo upload 
    
    if (fileRejections.length > 0) {
        setUploadStatus('error');
        setFeedbackMessage('Arquivo inválido. Verifique o tipo ou tamanho.');
        return;
    }
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  const renderDropzoneContent = () => {
    switch (uploadStatus) {
      case 'processing':
        return <><LoaderCircle className="animate-spin h-8 w-8 text-gray-500 mb-2" /><p className="font-semibold">{feedbackMessage}</p></>;
      case 'submitting':
        return <><LoaderCircle className="animate-spin h-8 w-8 text-blue-500 mb-2" /><p className="font-semibold">{feedbackMessage}</p></>;
      case 'ready':
        return <><CheckCircle2 className="h-8 w-8 text-green-500 mb-2" /><p className="font-semibold">{feedbackMessage}</p><p className="text-sm text-gray-500">{file?.name}</p></>;
      case 'success':
        return <><CheckCircle2 className="h-8 w-8 text-green-600 mb-2" /><p className="font-semibold">{feedbackMessage}</p><p className="text-sm text-gray-500">{file?.name}</p></>;
      case 'error':
        return <><XCircle className="h-8 w-8 text-red-600 mb-2" /><p className="font-semibold text-red-700">{feedbackMessage}</p></>;
      case 'idle':
      default:
        return (
          <>
            <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
            <p className="font-semibold">{isDragActive ? 'Solte o arquivo aqui...' : 'Arraste e solte o arquivo ou clique para selecionar'}</p>
            <p className="text-xs text-gray-500">Apenas arquivos .xlsx</p>
          </>
        );
    }
  };
  
  // Função para resetar tudo
  const handleReset = () => {
      setDataSet("");
      setWavelengths([]);
      setXData([]);
      setFilter("Selecionar filtro");
      setFile(null);
      setUploadStatus('idle');
      setFeedbackMessage('');
  };

    const customStyles: StylesConfig<Option, false> = {
      control: (base) => ({ ...base, borderRadius: 8, padding: "0.25rem" }),
      option:  (base, state) => ({
        ...base,
        background: state.isFocused ? "#f3f4f6" : "white", // Cinza claro em vez de verde
        color: "#001E01",
      }),
    };
    
    const customTheme = (theme: Theme) => ({
      ...theme,
      colors: { ...theme.colors, primary25: "#f3f4f6", primary: "#165a16" }, // Cinza claro em vez de verde
      borderRadius: 8,
    });

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-gray-900">
      <CustomSidebar />
      <ToastContainer />
      <main className="flex-1 flex justify-center mt-10">
        <div className="bg-white/10 w-full max-w-2xl max-h-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Salvar Espectros</h1>

          {erro && <div className="text-red-500 text-center mb-4">{erro}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input de Nome do Atributo */}
            <div>
              <label htmlFor="atributoNome" className="block text-sm font-medium mb-2">Nome:</label>
              <input id="atributoNome" value={dataSet} onChange={(e) => setDataSet(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Ex: Uvas Thompson Safra 2024" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Carregar Arquivo de Dados</label>
              <div {...getRootProps()}
                className={`text-center w-full p-6 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 
                  ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
                  ${uploadStatus === 'ready' ? 'border-green-400 bg-green-50' : ''}
                  ${uploadStatus === 'success' ? 'border-green-600 bg-green-100' : ''}
                  ${uploadStatus === 'error' ? 'border-red-500 bg-red-50' : ''}
                `}>
                <input {...getInputProps()} />
                {renderDropzoneContent()}
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
              {uploadStatus === 'success' || uploadStatus === 'error' ? (
                <button type="button" onClick={handleReset} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Enviar Novo Arquivo
                </button>
              ) : (
                <button type="submit" disabled={uploadStatus !== 'ready'} className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#208120] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                  Salvar Dados
                </button>
              )}
            </div>
          </form>
          </div>
      </main>
    </div>
  );
}

export default withAuth(SaveWavelengths);
