"use client";

import React, { useState } from "react";
import ExcelJS from "exceljs";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import { UploadCloud, CheckCircle2, XCircle, File as FileIcon, LoaderCircle } from "lucide-react";

type UploadStatus = 'idle' | 'processing' | 'ready' | 'submitting' | 'success' | 'error';

function SaveTargets() {
  const [atributoNome, setAtributoNome] = useState("");
  const [YData, setYData] = useState<number[]>([]); // Atualizar para um array de arrays
  const [erro, setErro] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  

  const processFile = async (selectedFile: File) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadStatus('processing'); // <-- 1. MOSTRA A RODINHA DE CARREGAMENTO
    setFeedbackMessage('Lendo seu arquivo...');

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = async () => {
      const buffer = reader.result as ArrayBuffer;
      const workbook = new ExcelJS.Workbook();
      try {
        await workbook.xlsx.load(buffer);
        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
          throw new Error("Planilha não encontrada.");
        }

        let yData: number[] = [];
        worksheet.eachRow((row) => {
          if (Array.isArray(row.values)) {
            const rowData = row.values.map(Number).filter(val => !isNaN(val));
            yData.push(...rowData);
          }
        });

        setYData(yData);
        setErro(null);
        setUploadStatus('ready'); // <-- 2. ARQUIVO PRONTO
        setFeedbackMessage('Arquivo processado. Pronto para salvar.');

      } catch (error: any) {
        setErro(error.message || "Erro ao processar o arquivo.");
        setUploadStatus('error'); // <-- MOSTRA ERRO
        setFeedbackMessage(error.message || "Erro ao processar o arquivo.");
        setFile(null);
      }
    };

    reader.onerror = () => {
        setUploadStatus('error');
        setFeedbackMessage('Não foi possível ler o arquivo.');
    }
  };

  // onDrop agora apenas chama a função de processamento
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": []
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificação para garantir que o arquivo esteja pronto
    if (uploadStatus !== 'ready' || !atributoNome) {
      toast.error("Por favor, preencha o nome e carregue um arquivo válido.");
      return;
    }
    
    setUploadStatus('submitting'); // <-- 3. MOSTRA A RODINHA DE ENVIO
    setFeedbackMessage('Salvando dados...');

    const payload = {
      attribute: atributoNome,
      y: YData,
    };

    try {
      // O toast.info não é mais necessário, pois o status já informa o usuário
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-targets/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", response.status, errorText);
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      toast.success("Features salvas com sucesso!");
      setUploadStatus('success'); // <-- 4. DÁ O CHECK DE SUCESSO
      setFeedbackMessage('Dados salvos com sucesso!');

      // Limpa o formulário após o sucesso
      setAtributoNome("");
      setYData([]);
      // Não resete o 'file' para que o nome continue aparecendo após o sucesso

    } catch (error) {
      toast.error("Erro ao salvar os dados.");
      setUploadStatus('error'); // <-- MOSTRA ERRO
      setFeedbackMessage('Erro ao salvar os dados.');
      console.error(error);
    }
  };

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

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-gray-900">
      <CustomSidebar />
      <ToastContainer /> {/* Adiciona o ToastContainer para exibir notificações */}
      <main className="flex-1 flex justify-center mt-10">
        <div className="bg-white/10 w-full max-w-2xl max-h-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Salvar Atributos</h1>

          {erro && <div className="text-red-500 text-center mb-4">{erro}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="atributoNome" className="block text-sm font-medium mb-2">
                Nome:
              </label>
              <input
                id="atributoNome"
                value={atributoNome}
                onChange={(e) => setAtributoNome(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: pH"
              />
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
