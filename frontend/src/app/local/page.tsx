"use client";

import { useState, useEffect } from "react";
import ExcelJS from "exceljs"; // Biblioteca para manipular arquivos Excel
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { Variety } from "@/generated/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select, { StylesConfig, Theme } from "react-select";
import { useDropzone } from "react-dropzone";
import { UploadCloud, CheckCircle2, XCircle, File as FileIcon, LoaderCircle } from "lucide-react";

interface Option { label: string; value: string }

type UploadStatus = 'idle' | 'processing' | 'ready' | 'submitting' | 'success' | 'error';

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
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const filterOptions: Option[] = [
    { label: "Nenhum", value: "nenhum" },
    { label: "MSC",     value: "MSC" },
    { label: "SNV",     value: "SNV" },
    { label: "Savitzky–Golay", value: "SG" },
  ];

  useEffect(() => {
    const fetchVariedades = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        const response = await fetch(`${apiUrl}/api/edit-variety`);
        const data = await response.json();
        setVariedades(data);
      } catch (error) {
        toast.error("Erro ao buscar variedades.");
        console.error("Erro ao buscar variedades:", error);
      }
    };
    fetchVariedades();
  }, []);

  const processFile = async (selectedFile: File) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploadStatus('processing');
    setFeedbackMessage('Lendo seu arquivo...');
    setError("");

    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);

    reader.onload = async (e) => {
      const result = e.target?.result;
      
      if (!result) {
        setError("Erro ao carregar o arquivo.");
        setUploadStatus('error');
        setFeedbackMessage('Erro ao carregar o arquivo.');
        return;
      }

      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
        setError("Por favor, selecione um arquivo Excel válido.");
        setUploadStatus('error');
        setFeedbackMessage('Por favor, selecione um arquivo Excel válido (.xlsx ou .xls).');
        setFile(null);
        return;
      }

      try {
        const binaryStr = result as ArrayBuffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(binaryStr);

        if (workbook.worksheets.length === 0) {
          setError("O arquivo não contém planilhas.");
          setUploadStatus('error');
          setFeedbackMessage('O arquivo não contém planilhas.');
          setFile(null);
          return;
        }

        const worksheet = workbook.worksheets[0];
        const data: string[][] = [];
        
        worksheet.eachRow((row, rowNumber) => {
          const rowData: string[] = [];
          row.eachCell({ includeEmpty: true }, (cell) => {
            const value = cell.value ? cell.value.toString() : "";
            rowData.push(value);
          });
          data.push(rowData);
        });

        const dadosComoNumeros = converterParaNumeros(data);
        setTableData(dadosComoNumeros);
        setUploadStatus('ready');
        setFeedbackMessage('Arquivo processado. Pronto para enviar.');

      } catch (error) {
        console.error("Erro ao carregar o arquivo Excel:", error);
        setError("Não foi possível processar o arquivo. Verifique o formato.");
        setUploadStatus('error');
        setFeedbackMessage('Erro ao processar o arquivo. Verifique o formato.');
        setFile(null);
      }
    };

    reader.onerror = () => {
      setUploadStatus('error');
      setFeedbackMessage('Não foi possível ler o arquivo.');
      setFile(null);
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        processFile(acceptedFiles[0]);
      }
    },
    accept: { 
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": []
    },
    maxFiles: 1,
  });

  const customStyles: StylesConfig<Option, false> = {
    control: (base) => ({ ...base, borderRadius: 8, padding: "0.25rem" }),
    option:  (base, state) => ({
      ...base,
      background: state.isFocused ? "#e6ffe6" : "white", // Verde claro no hover
      color: "#001E01",
    }),
  };
  
  const customTheme = (theme: Theme) => ({
    ...theme,
    colors: { ...theme.colors, primary25: "#e6ffe6", primary: "#165a16" }, // Verde claro no hover
    borderRadius: 8,
  });
  
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const varietyOptions: Option[] = variety.map(v => ({
    label: v.name,
    value: v.id.toString(),
  }));

  const converterParaNumeros = (dados: string[][]): number[][] => {
    return dados
        .filter((linha) => linha.length > 0) // Filtra linhas vazias
        .map((linha) =>
            linha
                .map((valor) => parseFloat(valor.replace(",", ".")))
                .filter((valor) => !isNaN(valor)) // Remove valores não numéricos
        );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (uploadStatus !== 'ready' || !formData.nome_reg || !formData.variedade || !formData.data || !formData.local) {
      toast.error("Por favor, preencha todos os campos e carregue um arquivo válido.");
      return;
    }
  
    setUploadStatus('submitting');
    setFeedbackMessage('Enviando dados...');

    try {
      const dataToSend = {
        name: formData.nome_reg,
        content: tableData,
        variety: formData.variedade,
        datetime: formData.data,
        local: formData.local,
        filter: formData.filtro,
        sgParams: formData.sgParams,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Erro ao enviar os dados.");

      toast.success("Dados enviados com sucesso!");
      setUploadStatus('success');
      setFeedbackMessage('Dados enviados com sucesso!');

      // Limpa o formulário após o sucesso
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
      console.error(err);
      setError("Erro ao enviar os dados. Tente novamente.");
      setUploadStatus('error');
      setFeedbackMessage('Erro ao enviar os dados. Tente novamente.');
      toast.error("Erro ao enviar os dados. Tente novamente.");
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
      <ToastContainer />
      <main className="flex-1 flex justify-center mt-10 mb-20">
        <div className="bg-white/10 w-full max-w-2xl max-h-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Enviar Dados Espectrais Locais</h1>
          <p className="text-center text-sm mb-6">
            Insira os dados espectrais locais para análise.
          </p>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome_reg" className="block text-sm font-medium mb-2">
                Nome do Registro:
              </label>
              <input
                id="nome_reg"
                type="text"
                name="nome_reg"
                value={formData.nome_reg}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Amostra_001"
              />
            </div>

            <div>
              <label htmlFor="variedade" className="block text-sm font-medium mb-2">
                Variedade da Uva:
              </label>
              <Select
                instanceId="variedade-select"
                options={varietyOptions}
                value={varietyOptions.find(o => o.value === formData.variedade) || null}
                onChange={(opt) => setFormData(f => ({ ...f, variedade: opt?.value || "" }))}
                isClearable
                placeholder="Selecione a variedade"
                styles={customStyles}
                theme={customTheme}
                isLoading={!varietyOptions.length}
                noOptionsMessage={() => "Nenhuma variedade disponível"}
              />
            </div>

            <div>
              <label htmlFor="data" className="block text-sm font-medium mb-2">
                Data da Coleta:
              </label>
              <input
                id="data"
                type="date"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="local" className="block text-sm font-medium mb-2">
                Local da Coleta:
              </label>
              <input
                id="local"
                type="text"
                name="local"
                value={formData.local}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: Vale dos Vinhedos"
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

            <div>
              <label className="block text-sm font-medium mb-2">Escolha um filtro:</label>
              <Select
                instanceId="filtro-select"
                options={filterOptions}
                value={filterOptions.find(o => o.value === formData.filtro) || null}
                onChange={opt => setFormData(f => ({ ...f, filtro: opt?.value || "nenhum" }))}
                isClearable={false}
                placeholder="Selecione um filtro"
                styles={customStyles}
                theme={customTheme}
              />
            </div>

            {formData.filtro === "SG" && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Parâmetros do Savitzky-Golay</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="window_length" className="block text-sm font-medium text-gray-700 mb-1">
                      Window Length
                    </label>
                    <input
                      type="number"
                      id="window_length"
                      name="window_length"
                      value={formData.sgParams.window_length}
                      onChange={(e) => {
                        const value = e.target.value ? +e.target.value : 0;
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, window_length: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full"
                      placeholder="Window Length"
                    />
                  </div>

                  <div>
                    <label htmlFor="polyorder" className="block text-sm font-medium text-gray-700 mb-1">
                      Polyorder
                    </label>
                    <input
                      type="number"
                      id="polyorder"
                      name="polyorder"
                      value={formData.sgParams.polyorder}
                      onChange={(e) => {
                        const value = e.target.value ? +e.target.value : 0;
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, polyorder: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full"
                      placeholder="Polyorder"
                    />
                  </div>

                  <div>
                    <label htmlFor="deriv" className="block text-sm font-medium text-gray-700 mb-1">
                      Deriv
                    </label>
                    <input
                      type="number"
                      id="deriv"
                      name="deriv"
                      value={formData.sgParams.deriv}
                      onChange={(e) => {
                        const value = e.target.value ? +e.target.value : 0;
                        setFormData((prev) => ({
                          ...prev,
                          sgParams: { ...prev.sgParams, deriv: value },
                        }));
                      }}
                      className="p-2 border border-gray-300 rounded-lg w-full"
                      placeholder="Deriv"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#208120] transition-all duration-300 ease-in-out"
                disabled={uploadStatus === 'processing' || uploadStatus === 'submitting'}
              >
                Enviar Dados
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withAuth(SentLocalData);
