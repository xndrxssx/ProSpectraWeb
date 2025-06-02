"use client";

import { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../components/ui/select";

type ModelMetrics = {
  train: Record<string, number | string>;
  cv: Record<string, number | string>;
  test: Record<string, number | string>;
  time: Record<string, number | string>;
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
};

type PredictedSpecs = {
  name: string;
  variety: string;
  filter: string;
  graph: string;
};

type ModelVariety = {
  variety_name: string;
  models: string[];
};

type DashboardData = {
  spectral_images_data: SpectralImageData[];
  report: ReportData;
  train_images: string[];
  test_images: string[];
  predicted_specs: PredictedSpecs[];
  models_metrics: Model[];
  models_varieties: ModelVariety[];
};

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string>("Todos");
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [selectedSpectrum1, setSelectedSpectrum1] = useState<string>("");
  const [selectedSpectrum2, setSelectedSpectrum2] = useState<string>("");

  // Formata métricas para exibição em tabela
  const formatMetrics = (metrics: Record<string, number | string>): ReactNode => {
    if (metrics) {
      return Object.entries(metrics).map(([key, value], index) => (
        <div key={index} className="px-1">
          <strong>{key}:</strong> {typeof value === 'number' ? value.toFixed(2) : value}
        </div>
      ));
    }
    return <span>Dados não disponíveis</span>;
  };

  useEffect(() => {
    // Busca dados do dashboard na API
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/`);
        if (!response.ok) throw new Error("Erro ao carregar dados do dashboard");
        const data: DashboardData = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard", err);
      }
    };
    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    // Mostra carregando enquanto os dados chegam
    return (
      <div className="min-h-screen flex bg-[#f4f4f4] text-[#001E01]">
        <CustomSidebar />
        <main className="flex-1 p-10">
          <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
          <p className="text-center">Carregando...</p>
        </main>
      </div>
    );
  }

  // Dados comuns para os gráficos
  const modelNames = dashboardData.models_metrics.map((model) => model.model_name);
  const executionTimes = dashboardData.models_metrics.map((model) => model.metrics.time.execution_time || 0);

  // Chart.js opções comuns
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Filtra modelos pelo atributo selecionado para o gráfico de desempenho
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

  // Dados para comparação de imagens por modelo selecionado
  const selectedModelData = dashboardData.models_metrics.find(model => model.id === selectedModel);
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

  return (
    <div className="min-h-screen w-full ml-6 flex bg-[#f4f4f4] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>

        {/* Abas principais */}
        <Tabs defaultValue="desempenho">
          <TabsList className="flex justify-center space-x-4 mb-6">
            <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            <TabsTrigger value="comparacoes">Comparações</TabsTrigger>
            <TabsTrigger value="espectros">Espectros</TabsTrigger>
          </TabsList>

          {/* Aba Desempenho: Gráficos */}
          <TabsContent value="desempenho" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gráfico de Tempo de Execução */}
              <Card>
                <CardHeader>
                  <CardTitle>Tempo de Execução por Modelo</CardTitle>
                  <CardDescription>Comparação do tempo de processamento entre modelos</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <div className="w-full h-full">
                    <Line data={executionTimeData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico de Desempenho (R², MAE, RMSE) */}
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho nos Testes</CardTitle>
                  <CardDescription>Métricas de R², MAE e RMSE para cada modelo (teste)</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Seletor de Atributo */}
                  <div className="mb-4">
                    <label className="mr-2 font-semibold">Filtrar por Atributo:</label>
                    <Select value={selectedAttribute} onValueChange={setSelectedAttribute}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder={selectedAttribute} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Todos">Todos</SelectItem>
                        {/* Opções dinâmicas de atributos */}
                        {[...new Set(dashboardData.models_metrics.map((m) => m.attribute))].map((attr) => (
                          <SelectItem key={attr} value={attr}>{attr}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="h-[300px]">
                    <div className="w-full h-full">
                      <Bar data={r2ChartData} options={chartOptions} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Predições por Dia */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total de Predições</CardTitle>
                  <CardDescription>Número de predições realizadas por dia</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="w-full h-full">
                    <Bar data={predictionsByDayData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Relatórios: Resumo e Métricas */}
          <TabsContent value="relatorios" className="pt-4">
            <div className="grid grid-cols-1 gap-6">
              {/* Resumo do Relatório */}
              <Card>
                <CardHeader>
                  <CardTitle>Relatório Resumido</CardTitle>
                  <CardDescription>Resumo das predições realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Total de predições: <strong>{dashboardData.report.total_predictions}</strong></p>
                  <p>
                    Última predição: <strong>{dashboardData.report.last_prediction?.prediction ?? "N/A"}</strong>
                    {dashboardData.report.last_prediction && (
                      <>
                        {" ("}
                        {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" })
                          .format(new Date(dashboardData.report.last_prediction.createdAt))}
                        {")"}
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>

              {/* Tabela de Métricas dos Modelos */}
              <Card>
                <CardHeader>
                  <CardTitle>Métricas dos Modelos Treinados</CardTitle>
                  <CardDescription>Desempenho de treino, validação e teste por modelo</CardDescription>
                </CardHeader>
                <CardContent>
                  {dashboardData.models_metrics.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
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
                          {dashboardData.models_metrics.map((model, idx) => (
                            <tr key={idx} className="text-center border-t">
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Comparações: Seleção de Modelo e Imagens */}
          <TabsContent value="comparacoes" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Comparação de Modelos</CardTitle>
                <CardDescription>Selecione um modelo para visualizar as imagens de treino e teste</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-center">
                  <label className="font-semibold mr-2">Escolha um modelo:</label>
                  <select
                    value={selectedModel ?? ""}
                    onChange={(e) => setSelectedModel(parseInt(e.target.value, 10))}
                    className="p-2 border rounded"
                  >
                    <option value="" disabled>Selecione um modelo</option>
                    {dashboardData.models_metrics.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.model_name} - {model.attribute}
                      </option>
                    ))}
                  </select>
                </div>
                {trainImage && testImage ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-2 rounded-lg shadow-sm text-center">
                      <img
                        src={`/static/images/${trainImage}`}
                        alt={`Treino - ${selectedModelData?.model_name}`}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="mt-2 text-sm text-gray-600">Imagem de Treino</p>
                    </div>
                    <div className="border p-2 rounded-lg shadow-sm text-center">
                      <img
                        src={`/static/images/${testImage}`}
                        alt={`Teste - ${selectedModelData?.model_name}`}
                        className="w-full h-auto rounded-lg"
                      />
                      <p className="mt-2 text-sm text-gray-600">Imagem de Teste</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-red-500">Imagens não encontradas para este modelo.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Espectros: Visualização de Espectros */}
          <TabsContent value="espectros" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Visualização de Espectros</CardTitle>
                <CardDescription>Selecione espectros para comparação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="font-semibold">Primeiro espectro:</label>
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
                  <div>
                    <label className="font-semibold">Segundo espectro:</label>
                    <select
                      value={selectedSpectrum2}
                      onChange={(e) => setSelectedSpectrum2(e.target.value)}
                      className="ml-2 p-2 border rounded"
                    >
                      <option value="">Selecione</option>
                      {dashboardData.spectral_images_data.map((spectrum, index) => (
                        <option key={index} value={spectrum.image}>
                          {spectrum.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Exibe espectro 1 */}
                  <div className="border p-2 rounded-lg shadow-sm text-center">
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
                  {/* Exibe espectro 2 */}
                  <div className="border p-2 rounded-lg shadow-sm text-center">
                    {selectedSpectrum2 ? (
                      <img
                        src={selectedSpectrum2}
                        alt="Espectro 2"
                        className="w-full h-auto rounded-lg"
                      />
                    ) : (
                      <p className="text-center text-gray-500">Nenhum espectro selecionado</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default withAuth(Dashboard);
