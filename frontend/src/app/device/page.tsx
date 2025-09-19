// Arquivo: page.tsx (Next.js com React)
"use client";

import { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import Select, { StylesConfig, Theme } from "react-select";
import { Variety } from "@/generated/client";
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
      window_length: 5, polyorder: 2, deriv: 0
    },
    modo: "",
    additionalParam: "",
  });
  const [tableData, setTableData] = useState<number[][]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [spectralData, setSpectralData] = useState<string | null>(null);
  const [calibrationValue, setCalibrationValue] = useState<number | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrations, setCalibrations] = useState<any[]>([]);
  const [selectedCalibration, setSelectedCalibration] = useState<any>(null);

  const filterOptions: Option[] = [
    { label: "Nenhum", value: "nenhum" },
    { label: "MSC",     value: "MSC" },
    { label: "SNV",     value: "SNV" },
    { label: "Savitzky–Golay", value: "SG" },
  ];

  const [variety, setVariedades] = useState<Variety[]>([]);

  // Add mode options
  const modeOptions: Option[] = [
    { label: "Absorbância", value: "absorbancia" },
    { label: "Reflectância", value: "reflectancia" },
    { label: "Intensidade", value: "intensidade" },
  ];

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

  // Chama API para calibrar o espectrômetro
  const handleCalibrate = async () => {
    if (!connected) {
      toast.error("Conecte o espectrômetro antes de calibrar.");
      return;
    }
    
    setIsCalibrating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/calibrate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      
      if (result.ok) {
        setCalibrationValue(result.reference_value);
        setSelectedCalibration({
          calibration_id: result.calibration_id,
          reference_value: result.reference_value,
          timestamp: Date.now()
        });
        toast.success(`Calibração realizada! Valor de referência: ${result.reference_value.toFixed(2)}`);
        // Preenche automaticamente o campo de parâmetro adicional se necessário
        if (formData.modo === "absorbancia" || formData.modo === "reflectancia") {
          setFormData(prev => ({ ...prev, additionalParam: result.reference_value.toString() }));
        }
        // Recarrega a lista de calibrações
        loadCalibrations();
      } else {
        toast.error("Falha na calibração: " + (result.error || ""));
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao calibrar o dispositivo.");
    } finally {
      setIsCalibrating(false);
    }
  };

  // Chama API para ler dados do espectrômetro
  const handleReadData = async () => {
    if (!formData.nome_reg || !formData.variedade || !formData.data || !formData.local || !formData.modo) {
      toast.error("Preencha todos os campos, incluindo o modo, antes de ler.");
      return;
    }
    
    // Verifica se precisa de calibração para absorbância/reflectância
    if ((formData.modo === "absorbancia" || formData.modo === "reflectancia") && !calibrationValue) {
      toast.error("Realize a calibração antes de fazer leituras de " + formData.modo + ".");
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
          data: formData.data,
          conversion: formData.modo,
          ...(formData.additionalParam && { conversionParam: formData.additionalParam }),
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
        sgParams: { window_length: 5, polyorder: 2, deriv: 0 },
        modo: "",
        additionalParam: "",
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
      background: state.isFocused ? "#e6ffe6" : "white", // Verde claro no hover
      color: "#001E01",
    }),
  };
  const customTheme = (theme: Theme) => ({
    ...theme,
    colors: { ...theme.colors, primary25: "#e6ffe6", primary: "#165a16" }, // Verde claro no hover
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

  // Carrega calibrações existentes
  const loadCalibrations = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/calibrations`);
      const data = await response.json();
      if (data.ok) {
        setCalibrations(data.calibrations);
      }
    } catch (error) {
      console.error("Erro ao carregar calibrações:", error);
    }
  };

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
    loadCalibrations();
  }, []);
  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <ToastContainer />
      <main className="flex-1 flex justify-center mt-10 mb-20">
        <div className="bg-white/10 w-full max-w-2xl max-h-full">
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
                onChange={(opt: Option | null) => setFormData(f => ({ ...f, variedade: opt?.value || "" }))}
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

            <div>
              <label className="block text-sm font-medium mb-2">Modo de Leitura:</label>
              <Select
                instanceId="modo-select"
                options={modeOptions}
                value={modeOptions.find(o => o.value === formData.modo) || null}
                onChange={(opt: Option | null) => setFormData(f => ({ ...f, modo: opt?.value || "" }))}
                isClearable
                placeholder="Selecione o modo"
                styles={customStyles}
                theme={customTheme}
              />
            </div>

            {/* Seção de Calibração */}
            {(formData.modo === "absorbancia" || formData.modo === "reflectancia") && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-sm font-medium text-blue-800 mb-2">
                  Calibração para {formData.modo.charAt(0).toUpperCase() + formData.modo.slice(1)}
                </h3>
                <p className="text-xs text-blue-600 mb-3">
                  Para leituras de {formData.modo}, é necessário realizar uma calibração para obter o valor de referência (I0).
                </p>
                
                {/* Calibrações disponíveis */}
                {calibrations.length > 0 && (
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-blue-700 mb-1">
                      Calibrações disponíveis:
                    </label>
                    <select
                      className="w-full p-2 text-xs border border-blue-300 rounded"
                      value={selectedCalibration?.calibration_id || ""}
                      onChange={(e) => {
                        const calib = calibrations.find(c => c.calibration_id === e.target.value);
                        if (calib) {
                          setSelectedCalibration(calib);
                          setCalibrationValue(calib.reference_value);
                          setFormData(prev => ({ ...prev, additionalParam: calib.reference_value.toString() }));
                        }
                      }}
                    >
                      <option value="">Selecione uma calibração...</option>
                      {calibrations.map((calib) => (
                        <option key={calib.calibration_id} value={calib.calibration_id}>
                          {new Date(calib.timestamp * 1000).toLocaleString()} - Ref: {calib.reference_value.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                {calibrationValue ? (
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-sm text-green-800">
                      <strong>Valor de referência selecionado:</strong> {calibrationValue.toFixed(2)}
                    </p>
                    <button
                      onClick={handleCalibrate}
                      className="mt-2 text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      disabled={isCalibrating}
                    >
                      {isCalibrating ? "Calibrando..." : "Nova Calibração"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleCalibrate}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={!connected || isCalibrating}
                  >
                    {isCalibrating ? "Realizando Calibração..." : "Realizar Calibração"}
                  </button>
                )}
              </div>
            )}

            {/* Botões para conectar e ler do espectrômetro */}
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleConnect}
                className="flex-1 bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f]"
                disabled={connected}
              >
                {connected ? "Conectado" : "Conectar Espectrômetro"}
              </button>
              {/* <button
                // Alteração para demonstração: Força a exibição do formulário de calibração
                onClick={() => setFormData((prev) => ({ ...prev, modo: "absorbancia" }))}
                className="flex-1 bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f]"
              >
                Conectar Espectrômetro (Demonstração)
              </button> */}

              <button
                onClick={handleReadData}
                className="flex-1 bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f]"
                disabled={!connected || !formData.modo}
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
                onChange={(opt: Option | null) => setFormData(f => ({ ...f, filtro: opt?.value || "nenhum" }))}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
