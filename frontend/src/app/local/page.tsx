"use client";

import { useState, useEffect } from "react";
import ExcelJS from "exceljs"; // Biblioteca para manipular arquivos Excel
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { Variety } from "@prisma/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select, { StylesConfig, Theme } from "react-select";
import { useDropzone } from "react-dropzone";


interface Option { label: string; value: string }


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
  const filterOptions: Option[] = [
    { label: "Nenhum", value: "nenhum" },
    { label: "MSC",     value: "MSC" },
    { label: "SNV",     value: "SNV" },
    { label: "Savitzky–Golay", value: "SG" },
  ];
  

  useEffect(() => {
  const fetchVariedades = async () => {
    try {
      const response = await fetch("/api/edit-variety");
      const data = await response.json();
      // console.log("Variedades encontradas no banco:", data);
      setVariedades(data);
    } catch (error) {
      toast.error("Erro ao buscar variedades.");
      console.error("Erro ao buscar variedades:", error);
    }
  };
    fetchVariedades();
  }, []);

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

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setError("");
    // Daqui pra frente, é igual ao seu handleFileChange atual, mas usando selectedFile
    // Em vez de pegar de event.target.files
    console.log("Início do processamento do arquivo");

    if (selectedFile) {
      console.log("Reconheceu anexo");
      const reader = new FileReader();

      // Mostra um toast de "processando"
      const processingToastId = toast.loading("Processando arquivo...");

      reader.onload = async (e) => {
        const result = e.target?.result;
        console.log("Arquivo carregado:", result);

        if (!result) {
          console.error("Erro: o arquivo não foi carregado corretamente.");
          setError("Erro ao carregar o arquivo.");
          toast.update(processingToastId, {
            render: "Erro ao carregar o arquivo.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          return;
        }

        const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
        if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
          setError("Por favor, selecione um arquivo Excel válido.");
          toast.update(processingToastId, {
            render: "Por favor, selecione um arquivo Excel válido (.xlsx ou .xls).",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          return;
        }

        console.log("Tipo de arquivo:", selectedFile.type);
        if (
          selectedFile.type.includes("excel") ||
          selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          try {
            const binaryStr = e.target?.result as ArrayBuffer;
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(binaryStr);

            console.log("Workbook carregado com sucesso:", workbook);

            if (workbook.worksheets.length === 0) {
              console.error("Não há planilhas no arquivo.");
              setError("O arquivo não contém planilhas.");
              toast.update(processingToastId, {
                render: "O arquivo não contém planilhas.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
              });
              return;
            }

            const worksheet = workbook.worksheets[0];
            console.log("Planilha carregada:", worksheet);

            const data: string[][] = [];
            worksheet.eachRow((row, rowNumber) => {
              const rowData: string[] = [];
              row.eachCell({ includeEmpty: true }, (cell) => {
                const value = cell.value ? cell.value.toString() : "";
                rowData.push(value);
              });
              console.log(`Linha ${rowNumber}:`, rowData);
              data.push(rowData);
            });

            const dadosComoNumeros = converterParaNumeros(data);
            setTableData(dadosComoNumeros);

            // Sucesso: atualiza o toast para sucesso
            toast.update(processingToastId, {
              render: "Arquivo Excel carregado com sucesso!",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });

          } catch (error) {
            console.error("Erro ao carregar o arquivo Excel:", error);
            setError("Não foi possível processar o arquivo. Verifique o formato.");
            toast.update(processingToastId, {
              render: "Erro ao processar o arquivo. Verifique o formato.",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
            return;
          }
        } else {
          setError("O arquivo selecionado não é um arquivo Excel válido.");
          toast.update(processingToastId, {
            render: "O arquivo selecionado não é válido.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  };

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
    
    if (!file) {
      toast.warning("Por favor, selecione um arquivo.");
      return;
    }
  
    try {
      console.log("Tabela de Dados:", tableData);
  
      const dataToSend = {
        name: formData.nome_reg,
        content: tableData,
        variety: formData.variedade,
        datetime: formData.data,
        local: formData.local,
        filter: formData.filtro,
        sgParams: formData.sgParams,
      };
  
      console.log("Dados enviados:", dataToSend);
  
      // Mostrar toast de carregamento
      const submitToastId = toast.loading("Enviando dados...");
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) throw new Error("Erro ao enviar os dados.");
  
      // Atualizar para sucesso
      toast.update(submitToastId, {
        render: "Dados enviados com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
  
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
      toast.error("Erro ao enviar os dados. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <ToastContainer />
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
              <label className="block text-sm font-medium mb-2">Anexar Arquivo (Excel):</label>
              <div
                  {...getRootProps()}
                  className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
              <label className="block text-sm font-medium mb-2">Variedade da Uva:</label>
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
              <div className="p-4 max-w-4xl mx-auto">
                <h2 className="text-lg font-semibold">Parâmetros do SG</h2>
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
