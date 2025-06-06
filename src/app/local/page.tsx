"use client";

import { useState, useEffect } from "react";
import ExcelJS from "exceljs"; // Biblioteca para manipular arquivos Excel
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { Variety } from "@prisma/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error("Erro ao buscar variedades.");
      console.error("Erro ao buscar variedades:", error);
    }
  };
    fetchVariedades();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setError("");

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
  
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
              <input
                type="file"
                accept=".xlsx, .xls"
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
