'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, CheckCircle2, Clock, LoaderCircle } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MetricCard } from "@/components/dashboards/MetricCard";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AdminDashboard({ data,commonData }: { data: any, commonData:any }) {
  // Verificação de segurança mais robusta
  if (!data || !data.stats || !commonData) {
    return <div>Não foi possível carregar os dados do administrador ou os dados estão incompletos.</div>;
  }
  
  const { stats, charts, tables } = data;
  const { predicted_spectra_options, original_spectra_options } = commonData;
  const [selectedSpectrum1Id, setSelectedSpectrum1Id] = useState<number | null>(null);
  const [selectedSpectrum2Id, setSelectedSpectrum2Id] = useState<number | null>(null);

  // Estados para armazenar as URLs das imagens e o estado de carregamento
  const [spectrum1Url, setSpectrum1Url] = useState<string | null>(null);
  const [loadingSpectrum1, setLoadingSpectrum1] = useState(false);
  const [spectrum2Url, setSpectrum2Url] = useState<string | null>(null);
  const [loadingSpectrum2, setLoadingSpectrum2] = useState(false);

  // Estados para gráficos de treinamento
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [trainingGraphs, setTrainingGraphs] = useState<{
    regression_comparison_url: string | null;
    test_predictions_url: string | null;
  } | null>(null);
  const [loadingTrainingGraphs, setLoadingTrainingGraphs] = useState(false);

  // Efeito para buscar a URL da imagem do Espectro 1
  useEffect(() => {
    if (!selectedSpectrum1Id) {
        setSpectrum1Url(null);
        return;
    };
    const fetchImageUrl = async () => {
        setLoadingSpectrum1(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/spectra/${selectedSpectrum1Id}`);
            if (!response.ok) throw new Error("Imagem não encontrada");
            const data = await response.json();
            setSpectrum1Url(data.image_url); // Armazena a URL
        } catch (error) {
            console.error("Erro ao buscar URL do espectro 1:", error);
            setSpectrum1Url(null);
        } finally {
            setLoadingSpectrum1(false);
        }
    };
    fetchImageUrl();
  }, [selectedSpectrum1Id]);

  // Efeito para buscar a URL da imagem do Espectro 2
  useEffect(() => {
    if (!selectedSpectrum2Id) {
        setSpectrum2Url(null);
        return;
    };
    const fetchImageUrl = async () => {
        setLoadingSpectrum2(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/spectrum-data/${selectedSpectrum2Id}`);
            if (!response.ok) throw new Error("Imagem não encontrada");
            const data = await response.json();
            setSpectrum2Url(data.image_url); // Armazena a URL
        } catch (error) {
            console.error("Erro ao buscar URL do espectro 2:", error);
            setSpectrum2Url(null);
        } finally {
            setLoadingSpectrum2(false);
        }
    };
    fetchImageUrl();
  }, [selectedSpectrum2Id]);

  // Efeito para buscar os gráficos de treinamento do modelo selecionado
  useEffect(() => {
    if (!selectedModelId) {
      setTrainingGraphs(null);
      return;
    }
    
    const fetchTrainingGraphs = async () => {
      setLoadingTrainingGraphs(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/model-graphs/${selectedModelId}`);
        if (!response.ok) throw new Error("Gráficos não encontrados");
        const data = await response.json();
        setTrainingGraphs({
          regression_comparison_url: data.regression_comparison_url,
          test_predictions_url: data.test_predictions_url
        });
      } catch (error) {
        console.error("Erro ao buscar gráficos de treinamento:", error);
        setTrainingGraphs(null);
      } finally {
        setLoadingTrainingGraphs(false);
      }
    };
    
    fetchTrainingGraphs();
  }, [selectedModelId]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard
          title="Modelos Treinados"
          value={stats.trained_models.value}
          description={stats.trained_models.description}
          icon={<BarChart className="h-4 w-4" />}
          trend={stats.trained_models.trend}
        />
        <MetricCard
          title="Acurácia Média (R²)"
          value={stats.average_accuracy.value}
          description={stats.average_accuracy.description}
          icon={<CheckCircle2 className="h-4 w-4" />}
          trend={stats.average_accuracy.trend}
        />
        <MetricCard
          title="Tempo Médio de Execução"
          value={stats.average_execution_time.value}
          description={stats.average_execution_time.description}
          icon={<Clock className="h-4 w-4" />}
          trend={stats.average_execution_time.trend}
        />
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Visão Geral de Desempenho</TabsTrigger>
          <TabsTrigger value="metrics">Métricas Detalhadas</TabsTrigger>
          <TabsTrigger value="spectra">Visualizar Espectros</TabsTrigger>
          <TabsTrigger value="traintest">Visualizar Gráficos de Treino</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho dos Modelos (Teste)</CardTitle>
                <CardDescription>Métricas R², MAE e RMSE para cada modelo.</CardDescription>
              </CardHeader>
              {/* ALTERAÇÃO AQUI: Substituído h-[350px] por aspect-video */}
              <CardContent className="w-full aspect-video">
                {charts.model_performance && charts.model_performance.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={charts.model_performance} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="model" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #ccc',
                            borderRadius: '0.5rem'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="r2" fill="#16a34a" name="R²" />
                      <Bar dataKey="mae" fill="#f97316" name="MAE" />
                      <Bar dataKey="rmse" fill="#3b82f6" name="RMSE" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Nenhum dado de desempenho para exibir.
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tempo de Execução por Modelo</CardTitle>
                <CardDescription>Tempo em segundos para treinar cada modelo.</CardDescription>
              </CardHeader>
               {/* ALTERAÇÃO AQUI: Substituído h-[350px] por aspect-video */}
              <CardContent className="w-full aspect-video">
                {charts.execution_time && charts.execution_time.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={charts.execution_time} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="model" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #ccc',
                            borderRadius: '0.5rem'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="time" stroke="#8884d8" name="Tempo (s)" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Nenhum dado de execução para exibir.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="metrics" className="pt-6">
           <Card>
            <CardHeader>
                <CardTitle>Tabela de Métricas Detalhadas</CardTitle>
                <CardDescription>Comparativo entre treino, validação e teste.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                                         <TableHeader>
                         <TableRow>
                             <TableHead>Modelo</TableHead>
                             <TableHead>Atributo</TableHead>
                             <TableHead>Teste (R²)</TableHead>
                             <TableHead>Teste (MAE)</TableHead>
                             <TableHead>Validação (R²)</TableHead>
                             <TableHead>Treino (R²)</TableHead>
                             <TableHead>Status</TableHead>
                         </TableRow>
                     </TableHeader>
                    <TableBody>
                                                 {tables.model_metrics && tables.model_metrics.length > 0 ? (
                             tables.model_metrics.map((item: any) => {
                                 const trainR2 = item.train?.['R²'] || 0;
                                 const validationR2 = item.validation?.['R²'] || 0;
                                 const testR2 = item.test?.['R²'] || 0;
                                 const diff = Math.abs(trainR2 - validationR2);
                                 
                                 let status = "Normal";
                                 let statusColor = "text-green-600";
                                 
                                 if (diff > 0.1) {
                                     if (trainR2 > validationR2) {
                                         status = "Overfitting";
                                         statusColor = "text-orange-600";
                                     } else {
                                         status = "Underfitting";
                                         statusColor = "text-red-600";
                                     }
                                 }
                                 
                                 return (
                                     <TableRow key={`${item.model}-${item.attribute}`}>
                                         <TableCell className="font-medium">{item.model}</TableCell>
                                         <TableCell>{item.attribute}</TableCell>
                                         <TableCell>{item.test?.['R²']?.toFixed(3) || 'N/A'}</TableCell>
                                         <TableCell>{item.test?.MAE?.toFixed(3) || 'N/A'}</TableCell>
                                         <TableCell>{item.validation?.['R²']?.toFixed(3) || 'N/A'}</TableCell>
                                         <TableCell>{item.train?.['R²']?.toFixed(3) || 'N/A'}</TableCell>
                                         <TableCell>
                                             <span className={`font-medium ${statusColor}`}>
                                                 {status}
                                             </span>
                                         </TableCell>
                                     </TableRow>
                                 );
                             })
                         ) : (
                                                         <TableRow>
                                 <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                                     Nenhuma métrica de modelo encontrada.
                                 </TableCell>
                             </TableRow>
                        )}
                    </TableBody>
                 </Table>
            </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="spectra" className="pt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Comparação de Espectros</CardTitle>
                    <CardDescription>Selecione dois espectros para comparar visualmente.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Seletor 1 */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Espectro 1 (Processado)</label>
                             <Select onValueChange={(value) => setSelectedSpectrum1Id(Number(value))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um espectro" />
                              </SelectTrigger>
                              <SelectContent>
                                {predicted_spectra_options?.map((spec: any) => (
                                    <SelectItem key={spec.id} value={String(spec.id)}>{spec.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        </div>
                        {/* Seletor 2 */}
                        <div>
                            <label className="text-sm font-medium mb-2 block">Espectro 2 (Original)</label>
                            <Select onValueChange={(value) => setSelectedSpectrum2Id(Number(value))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um espectro" />
                              </SelectTrigger>
                              <SelectContent>
                                {original_spectra_options?.map((spec: any) => (
                                     <SelectItem key={spec.id} value={String(spec.id)}>{spec.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        {/* Visualizador 1 */}
                        <div className="w-full aspect-video border rounded-lg p-2 flex items-center justify-center bg-slate-50">
                            {loadingSpectrum1 ? <LoaderCircle className="animate-spin h-8 w-8 text-gray-400" /> : 
                             spectrum1Url ? <img src={spectrum1Url} alt="Espectro 1" className="max-w-full max-h-full object-contain" /> :
                             <p className="text-gray-500">Selecione o Espectro 1</p>}
                        </div>
                        {/* Visualizador 2 */}
                        <div className="w-full aspect-video border rounded-lg p-2 flex items-center justify-center bg-slate-50">
                             {loadingSpectrum2 ? <LoaderCircle className="animate-spin h-8 w-8 text-gray-400" /> :
                              spectrum2Url ? <img src={spectrum2Url} alt="Espectro 2" className="max-w-full max-h-full object-contain" /> :
                              <p className="text-gray-500">Selecione o Espectro 2</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="traintest" className="pt-6">
            <div className="space-y-6">
                {/* Seletor de Modelo */}
                <Card>
                    <CardHeader>
                        <CardTitle>Selecionar Modelo para Visualizar Gráficos</CardTitle>
                        <CardDescription>Escolha um modelo para visualizar seus gráficos de treinamento e predição.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select onValueChange={(value) => setSelectedModelId(Number(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um modelo" />
                            </SelectTrigger>
                            <SelectContent>
                                {data.available_models?.map((model: any) => (
                                    <SelectItem key={model.id} value={model.id.toString()}>
                                        {model.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {/* Gráficos de Treinamento */}
                {selectedModelId && (
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gráfico de Treino e Validação</CardTitle>
                                <CardDescription>Comparação entre valores reais vs preditos (treino e validação cruzada).</CardDescription>
                            </CardHeader>
                            <CardContent className="w-full aspect-video">
                                {loadingTrainingGraphs ? (
                                    <div className="flex items-center justify-center h-full">
                                        <LoaderCircle className="animate-spin h-8 w-8 text-gray-400" />
                                    </div>
                                ) : trainingGraphs?.regression_comparison_url ? (
                                    <img 
                                        src={trainingGraphs.regression_comparison_url} 
                                        alt="Gráfico de Treino e Validação" 
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-500">Gráfico não disponível</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Gráfico de Predições de Teste</CardTitle>
                                <CardDescription>Valores reais vs preditos no conjunto de teste.</CardDescription>
                            </CardHeader>
                            <CardContent className="w-full aspect-video">
                                {loadingTrainingGraphs ? (
                                    <div className="flex items-center justify-center h-full">
                                        <LoaderCircle className="animate-spin h-8 w-8 text-gray-400" />
                                    </div>
                                ) : trainingGraphs?.test_predictions_url ? (
                                    <img 
                                        src={trainingGraphs.test_predictions_url} 
                                        alt="Gráfico de Predições de Teste" 
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-500">Gráfico não disponível</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Análise de Overfitting/Underfitting */}
                <Card>
                    <CardHeader>
                        <CardTitle>Análise de Overfitting/Underfitting</CardTitle>
                        <CardDescription>Identificação de problemas de generalização baseado nas diferenças entre treino e validação.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {charts.training_curves && charts.training_curves.length > 0 ? (
                                charts.training_curves.map((model: any, index: number) => {
                                    const trainR2 = model.train_r2 || 0;
                                    const validationR2 = model.validation_r2 || 0;
                                    const testR2 = model.test_r2 || 0;
                                    const diff = Math.abs(trainR2 - validationR2);
                                    
                                    let status = "Normal";
                                    let statusColor = "text-green-600";
                                    let description = "Modelo bem generalizado";
                                    
                                    if (diff > 0.1) {
                                        if (trainR2 > validationR2) {
                                            status = "Overfitting";
                                            statusColor = "text-orange-600";
                                            description = "Modelo pode estar memorizando os dados de treino";
                                        } else {
                                            status = "Underfitting";
                                            statusColor = "text-red-600";
                                            description = "Modelo pode estar subajustado";
                                        }
                                    }
                                    
                                    return (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <h4 className="font-medium">{model.model}</h4>
                                                <p className="text-sm text-gray-600">
                                                    Treino: {trainR2.toFixed(3)} | Validação: {validationR2.toFixed(3)} | Teste: {testR2.toFixed(3)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-medium ${statusColor}`}>{status}</p>
                                                <p className="text-xs text-gray-500">{description}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 text-center py-4">Nenhum dado disponível para análise.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}