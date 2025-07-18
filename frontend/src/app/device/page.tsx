// Arquivo: page.tsx (Next.js com React)
"use client";

import { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import Select, { StylesConfig, Theme } from "react-select";
import { Variety } from "@prisma/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Option { label: string; value: string }

function SentDataDevice() {
  // Estados para dados do formulário e leituras
  const [rawId, setRawId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome_reg: "",
    variedade: "",
    data: "",
    local: "",
    filtro: "nenhum",
    sgParams: {
      window_length: 5, polyorder: 2, deriv: 0,
      delta: 1, axis: -1, mode: "interp", cval: 0,
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

  // Chama API para conectar ao espectrômetro
  const handleConnect = async () => {
    if (!formData.variedade || !formData.data || !formData.local) {
      setError("Preencha todos os campos antes de conectar.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/connect/`);
      const result = await res.json();
      if (result.ok) {
        setConnected(true);
        setError("");
        toast.success("Espectrômetro conectado com sucesso!");
      } else {
        setError("Não foi possível conectar: " + (result.error || ""));
        toast.error("Falha ao conectar espectrômetro.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro de comunicação ao tentar conectar.");
      toast.error("Erro ao tentar conectar.");
    }
  };

  // Chama API para ler dados do espectrômetro
  const handleReadData = async () => {
    if (!formData.nome_reg || !formData.variedade || !formData.data || !formData.local) {
      toast.error("Preencha todos os campos antes de ler.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scan_and_save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nome_reg,
          local: formData.local,
          varietyId: Number(formData.variedade),
          data: formData.data
        })
      });
      const result = await res.json();
      if (!result.ok) throw new Error("Falha na leitura");
      setRawId(result.rawId);
      // Prepara tabela de leituras [wavelength, intensidade]
      setTableData(result.wavelengths.map((w: number, i: number) => [w, result.values[i]]));
      setSpectralData("Leitura concluída e salva com sucesso!");
      toast.success("Dados lidos e salvos localmente.");
      setConnected(false);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao ler/escrever dados.");
    }
  };

  // Envia dados processados para o backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!tableData.length) {
      toast.warning("Nenhum dado espectral disponível para envio.");
      return;
    }
    try {
      const dataToSend = {
        name: formData.nome_reg,
        content: tableData,
        variety: Number(formData.variedade),
        datetime: formData.data,
        local: formData.local,
        filter: formData.filtro === "nenhum" ? "none" : formData.filtro,
        sgParams: formData.sgParams,
        rawId
      };
      const toastId = toast.loading("Enviando dados...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) throw new Error("Erro ao enviar os dados.");
      toast.update(toastId, {
        render: "Dados enviados com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      // Limpa formulário após envio
      setTableData([]);
      setFormData({
        nome_reg: "", variedade: "", data: "", local: "", filtro: "nenhum",
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

  // Atualiza estado do formulário
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Carrega lista de variedades do banco
  const varietyOptions: Option[] = variety.map(v => ({
    label: v.name,
    value: v.id.toString(),
  }));
  useEffect(() => {
    const fetchVariedades = async () => {
      try {
        const response = await fetch("/api/edit-variety");
        const data = await response.json();
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

            {/* Botões para conectar e ler do espectrômetro */}
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleConnect}
                className="flex-1 bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f]"
                disabled={connected}
              >
                {connected ? "Conectado" : "Conectar Espectrômetro"}
              </button>
              <button
                onClick={handleReadData}
                className="flex-1 bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f]"
                disabled={!connected}
              >
                Realizar Leitura
              </button>
            </div>

            {/* Exibe resumo e erros */}
            {spectralData && (
              <div className="mt-4 bg-white/20 p-4 rounded-lg">
                <h2 className="text-sm font-medium mb-2">Resumo dos Dados Espectrais:</h2>
                <p className="text-sm">{spectralData}</p>
              </div>
            )}
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
                    <label htmlFor="window_length" className="block text-sm font-medium">
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
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Window Length"
                    />
                  </div>
                  <div>
                    <label htmlFor="polyorder" className="block text-sm font-medium">
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
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Polyorder"
                    />
                  </div>
                  <div>
                    <label htmlFor="deriv" className="block text-sm font-medium">
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
                      className="p-2 border border-gray-300 rounded-lg w-full min-w-[120px]"
                      placeholder="Deriv"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Botão para enviar ao servidor */}
            <button
              type="submit"
              className="mt-6 w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f]"
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
