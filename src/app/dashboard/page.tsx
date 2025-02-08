"use client";

import { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { ReactNode } from "react";

type ModelMetrics = {
  train: Record<string, number | string>;
  cv: Record<string, number | string>;
  test: Record<string, number | string>;
  time: Record<string, number | string>; // Corrigido
  variety_name: Record<string, string>;
};

type Model = {
  id: number;
  model_name: string;
  attribute: string;
  variety_name: string;
  metrics: ModelMetrics;
};

type ReportData = {
  total_predictions: number;
  predictions_by_day: Record<string, number>;
  last_prediction: { prediction: string; createdAt: string } | null;
};

type SpectralImageData = {
  name: string;
  image: string;
}

type PredictedSpecs = {
  name: string;
  variety: string;
  filter: string;
  graph: string;
}

type DashboardData = {
  spectral_images_data: SpectralImageData[];
  report: ReportData;
  train_images: string[];
  test_images: string[];
  predicted_specs: PredictedSpecs[];
  models_metrics: Model[];
  models_varieties: ModelVariety[];
};

type ModelVariety = {
  variety_name: string;
  models: string[];
};

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState("gráficos");
  const [selectedAttribute, setSelectedAttribute] = useState("Todos");
  const [selectedVariety, setSelectedVariety] = useState<string>("Todos");
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [selectedSpectrum1, setSelectedSpectrum1] = useState<string>("");
  const [selectedSpectrum2, setSelectedSpectrum2] = useState<string>("");

  const formatMetrics = (metrics: Record<string, number | string>): ReactNode => {
    if (metrics) {
      return Object.entries(metrics).map(([key, value], index) => (
        <div key={index}>
          <strong>{key}:</strong> {typeof value === 'number' ? value.toFixed(2) : value}
        </div>
      ));
    }
    return <span>Dados não disponíveis</span>;
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/`);
      if (!response.ok) throw new Error("Erro ao carregar dados do dashboard");
      
      const data: DashboardData = await response.json();
  
      // Verifica se os dados mudaram antes de atualizar o estado
      setDashboardData((prevData) => JSON.stringify(prevData) !== JSON.stringify(data) ? data : prevData);
  
      // if (data.models_metrics.length > 0) {
      //   setSelectedModel((prev) => prev || data.models_metrics[0].model_name);
      // }
    } catch (err) {
      console.error("Erro ao buscar dados do dashboard", err);
    }
  };
  if (!dashboardData) return <div className="text-center text-red-500">Nenhum dado disponível</div>;

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = parseInt(event.target.value, 10);
    setSelectedModel(modelId);
  };

  // Encontrar os dados do modelo selecionado
  const selectedModelData = dashboardData.models_metrics.find(model => model.id === selectedModel);

  // Buscar imagens de treino e teste com base no nome e atributo do modelo selecionado
  const trainImage = selectedModelData
    ? dashboardData.train_images.find(img =>
        img.includes(`${selectedModelData.attribute}_${selectedModelData.model_name}_regression_comparison_plot`)
      )
    : null;

  const testImage = selectedModelData
    ? dashboardData.test_images.find(img =>
        img.includes(`${selectedModelData.attribute}_${selectedModelData.model_name}_plot_test_predictions`)
      )
    : null;
  
  const renderCharts = () => {
    if (!dashboardData) return <div className="text-center text-red-500">Nenhum dado disponível</div>;
  
    // Dados para os gráficos
    const modelNames = dashboardData?.models_metrics?.map((model) => model.model_name) || [];
    const executionTimes = dashboardData.models_metrics.map((model) => model.metrics.time.execution_time || 0);
  
    // Opções comuns para todos os gráficos
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false, // Permitir controlar o tamanho manualmente
      plugins: {
        legend: {
          position: "top" as const,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    // Gráfico do R² (Train vs Test)
    const filteredModels = selectedAttribute === "Todos"
    ? dashboardData.models_metrics
    : dashboardData.models_metrics.filter((m) => m.attribute === selectedAttribute);

    const r2ChartData = {
      labels: filteredModels.map((model) => model.model_name),
      datasets: [
        {
          label: "R² (Teste)",
          data: filteredModels.map((model) => model.metrics.test["R²"] || 0),
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 2,
        },
        {
          label: "MAE (Teste)",
          data: filteredModels.map((model) => model.metrics.test.MAE || 0),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
        },
        {
          label: "RMSE (Teste)",
          data: filteredModels.map((model) => model.metrics.test.RMSE || 0),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
      ],
    };
  
    // Gráfico de Tempo de Execução por Modelo
    const executionTimeData = {
      labels: modelNames,
      datasets: [
        {
          label: "Tempo de Execução (s)",
          data: executionTimes,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    const predictionsByDay = Object.entries(dashboardData.report.predictions_by_day || {}).map(([date, count]) => ({
      date,
      count,
    }));
    
    const predictionsByDayData = {
      labels: predictionsByDay.map((d) => d.date),
      datasets: [
        {
          label: "Número de Predições por Dia",
          data: predictionsByDay.map((d) => d.count),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: true,
        },
      ],
    };

    const modelsVarietiesArray = Object.entries(dashboardData.models_varieties || {}).map(
      ([variety_name, models]) => ({
        variety_name,
        models,
      })
    );    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Primeira linha: Tempo de Execução por Modelo e Desempenho nos testes */}
          <div className="bg-white p-6 rounded-lg shadow h-97 relative">
            <h2 className="text-lg font-bold mb-4">Tempo de Execução por Modelo</h2>
            <div className="w-full h-[250px]">
              <Line data={executionTimeData} options={chartOptions} />
            </div>
          </div>
      
          <div className="bg-white p-6 rounded-lg shadow h-97 relative">
            <h2 className="text-lg font-bold mb-4">Desempenho nos testes</h2>
            <select value={selectedAttribute} onChange={(e) => setSelectedAttribute(e.target.value)} className="p-2 border rounded">
              <option value="Todos">Todos</option>
              {[...new Set(dashboardData.models_metrics.map((m) => m.attribute))].map((attr) => (
                <option key={attr} value={attr}>{attr}</option>
              ))}
            </select>
            <div className="w-full h-[250px]">
              <Bar data={r2ChartData} options={chartOptions} style={{ height: "100%", width: "100%" }} />
            </div>
          </div>
      
          {/* Segunda linha: Total de Predições */}
          <div className="bg-white p-6 rounded-lg shadow h-97 relative">
            <h2 className="text-lg font-bold mb-4">Total de Predições</h2>
            <div className="w-full h-[250px]">
              <Bar data={predictionsByDayData} options={chartOptions} style={{ height: "100%", width: "100%" }} />
            </div>
          </div>
        </div>
      );      
  };

  const renderSpectraTab = () => {
    if (!dashboardData) return <div className="text-center text-red-500">Nenhum dado disponível</div>;

    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold text-center mb-4">Visualização de Espectros</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Seletor para o primeiro espectro */}
          <div>
            <label className="font-semibold">Selecione o primeiro espectro: </label>
            {/* Seletor para o primeiro espectro */}
            <select
              value={selectedSpectrum1}
              onChange={(e) => setSelectedSpectrum1(e.target.value)}
              className="ml-2 p-2 border rounded"
            >
              <option value="">Selecione</option>
              {dashboardData.predicted_specs.map((spectrum, index) => (
                <option key={index} value={spectrum.graph}>
                  {`${spectrum.name} - ${spectrum.variety} - ${spectrum.filter}`}
                </option>
              ))}
            </select>


          </div>

          {/* Seletor para o segundo espectro */}
          <div>
            <label className="font-semibold">Selecione o segundo espectro: </label>
            <select
              value={selectedSpectrum2}
              onChange={(e) => setSelectedSpectrum2(e.target.value)}
              className="ml-2 p-2 border rounded"
            >
              <option value="">Selecione</option>
              {dashboardData.spectral_images_data.map((spectrum, index) => (
                <option key={index} value={spectrum.image}>{spectrum.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Exibição do primeiro espectro */}
          <div className="w-full border p-2 rounded-lg shadow-sm text-center">
            {selectedSpectrum1 ? (
              <img
              src={`data:image/png;base64,${selectedSpectrum1}`}
              alt="Espectro 1"
              className="w-full h-auto rounded-lg"
            />                        
            ) : (
              <p className="text-center text-gray-500">Nenhum espectro selecionado</p>
            )}
          </div>

          {/* Exibição do segundo espectro */}
          <div className="w-full border p-2 rounded-lg shadow-sm text-center">
            {selectedSpectrum2 ? (
              <img
                  src={selectedSpectrum2}  // Usando o caminho da imagem diretamente
                  alt="Espectro 2"
                  className="w-full h-auto rounded-lg"
                />
            ) : (
              <p className="text-center text-gray-500">Nenhum espectro selecionado</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (!dashboardData) return <p className="text-center">Carregando...</p>;

    switch (activeTab) {
      case "gráficos":
        return <div className="mt-8">{renderCharts()}</div>;

      case "relatórios":
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold">Relatório Resumido</h2>
            <h3>Total de predições: {dashboardData.report.total_predictions}</h3>
            <div>
              Última predição: {dashboardData.report.last_prediction?.prediction ?? "N/A"} (
                {dashboardData.report.last_prediction
                  ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(dashboardData.report.last_prediction.createdAt))
                  : "N/A"})
            </div>

            {/* Exibição das métricas dos modelos treinados */}
            <h2 className="text-lg font-bold mt-6">Métricas dos Modelos Treinados</h2>
              {dashboardData?.models_metrics?.length > 0 ? (
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2">Modelo</th>
                        <th className="border p-2">Atributo</th>
                        <th className="border p-2">Train</th>
                        <th className="border p-2">Cross-Validation</th>
                        <th className="border p-2">Test</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.models_metrics.map((model: any, index: number) => (
                        <tr key={index} className="text-center border-t">
                          <td className="border p-2 font-semibold">{model.model_name}</td>
                          <td className="border p-2">{model.attribute}</td>
                          <td className="border p-2">{formatMetrics(model.metrics.train)}</td>
                          <td className="border p-2">{formatMetrics(model.metrics.cv)}</td>
                          <td className="border p-2">{formatMetrics(model.metrics.test)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>Nenhum modelo encontrado.</div>
              )}

          </div>
        );

        case "comparações":
        return (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold text-center mb-4">Comparação de Modelos</h2>

            {/* Seletor de modelo */}
            <div className="mb-4 text-center">
              <label className="font-semibold">Escolha um modelo: </label>
              <select
                value={selectedModel ?? ""}
                onChange={handleModelChange}
                className="ml-2 p-2 border rounded"
              >
                <option value="" disabled>Selecione um modelo</option>
                {dashboardData.models_metrics.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.model_name} - {model.attribute}
                  </option>
                ))}
              </select>
            </div>

            {/* Exibição das imagens */}
            {trainImage && testImage ? (
              <div className="w-full grid grid-cols-2 gap-2">
                {/* Imagem de Treino */}
                <div className="w-full border p-2 rounded-lg shadow-sm text-center">
                  <img
                    src={`/static/images/${trainImage}`}
                    alt={`Treino - ${selectedModelData?.model_name}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                {/* Imagem de Teste */}
                <div className="w-full border p-2 rounded-lg shadow-sm text-center">
                  <img
                    src={`/static/images/${testImage}`}
                    alt={`Teste - ${selectedModelData?.model_name}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <p className="text-center text-red-500">Imagens não encontradas para este modelo.</p>
            )}
          </div>
        );
        case "espectros":
          return renderSpectraTab();
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f4f4f4] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 p-10 items-center justify-center">
        <div className="bg-white/10 w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-6">
            {["gráficos", "relatórios", "comparações", "espectros"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-lg ${activeTab === tab ? "border-2 border-green-600" : "bg-gray-200 text-gray-700"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default withAuth(Dashboard);