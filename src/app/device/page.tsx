"use client";

import { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import Select, { StylesConfig, Theme } from "react-select";
import {Variety} from "@prisma/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface Option { label: string; value: string }

function SentDataDevice() {
  const [file, setFile] = useState<File | null>(null);
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
  const [tableData, setTableData] = useState<number[][]>([]); 
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [spectralData, setSpectralData] = useState<string | null>(null);
  const filterOptions: Option[] = [
    { label: "Nenhum", value: "nenhum" },
    { label: "MSC",     value: "MSC" },
    { label: "SNV",     value: "SNV" },
    { label: "Savitzky–Golay", value: "SG" },
  ];
  const [variety, setVariedades] = useState<Variety[]>([]);

  const handleConnect = async () => {
    if (!formData.variedade || !formData.data || !formData.local) {
      setError("Preencha todos os campos antes de conectar.");
      return;
    }
  
    try {
      const res = await fetch("/api/connect");
      const result = await res.json();
  
      if (result.connected) {
        setConnected(true);
        setError("");
        toast.success("Espectrômetro conectado com sucesso!");
      } else {
        setError("Não foi possível conectar ao espectrômetro: " + (result.error || ""));
        toast.error("Falha ao conectar espectrômetro.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro de comunicação ao tentar conectar.");
      toast.error("Erro ao tentar conectar.");
    }
  };  

  const handleReadData = async () => {
    try {
      const resStatus = await fetch("/api/status");
      const status = await resStatus.json();
      if (status.scan_in_progress) {
        setError("Aguardando a varredura terminar...");
        return;
      }
  
      const resData = await fetch("/api/read_data?conversion=reflectance"); // ou absorbance se o usuário escolher
      const data = await resData.json();
  
      setTableData(data.intensities.map((y: number, i: number) => [data.wavelengths[i], y]));
      setSpectralData("Dados lidos e processados.");
    } catch (error) {
      console.error(error);
      setError("Erro na leitura dos dados espectrais.");
    }
  };
  

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!tableData.length) {
      toast.warning("Nenhum dado espectral disponível para envio.");
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

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <ToastContainer />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Enviar Dados Espectrais
          </h1>
          <p className="text-center text-sm mb-6">
            Conecte o espectrômetro e envie os dados para o servidor.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
          {/* Formulário de coleta de informações */}
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
                placeholder="Ex: Vale dos Vinhedos"
              />
            </div>

          {/* Botões para conectar e realizar a leitura */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleConnect}
              className="flex-1 bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-350 ease-in-out"
              disabled={connected}
            >
              {connected ? "Conectado" : "Conectar Espectrômetro"}
            </button>
            <button
              onClick={handleReadData}
              className="flex-1 bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-350 ease-in-out"
              disabled={!connected}
            >
              Realizar Leitura
            </button>
          </div>

          {/* Exibição de dados espectrais */}
          {spectralData && (
            <div className="mt-4 bg-white/20 p-4 rounded-lg">
              <h2 className="text-sm font-medium mb-2">Resumo dos Dados Espectrais:</h2>
              <p className="text-sm">{spectralData}</p>
            </div>
          )}

          {/* Mensagem de erro */}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
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

          {/* Botão de envio */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
            disabled={!spectralData}
          >
            Enviar Dados para o Servidor
          </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withAuth(SentDataDevice);