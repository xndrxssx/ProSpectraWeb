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

  // Efeito para buscar a URL da imagem do Espectro 1
  useEffect(() => {
    if (!selectedSpectrum1Id) {
        setSpectrum1Url(null);
        return;
    };
    const fetchImageUrl = async () => {
        setLoadingSpectrum1(true);
        try {
            const response = await fetch(`/api/spectra/${selectedSpectrum1Id}`);
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
            const response = await fetch(`/api/spectrum-data/${selectedSpectrum2Id}`);
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tables.model_metrics && tables.model_metrics.length > 0 ? (
                            tables.model_metrics.map((item: any) => (
                                <TableRow key={`${item.model}-${item.attribute}`}>
                                    <TableCell className="font-medium">{item.model}</TableCell>
                                    <TableCell>{item.attribute}</TableCell>
                                    <TableCell>{item.test?.R2?.toFixed(3) || 'N/A'}</TableCell>
                                    <TableCell>{item.test?.MAE?.toFixed(3) || 'N/A'}</TableCell>
                                    <TableCell>{item.validation?.R2?.toFixed(3) || 'N/A'}</TableCell>
                                    <TableCell>{item.train?.R2?.toFixed(3) || 'N/A'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-500 py-6">
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
            
        </TabsContent>
      </Tabs>
    </div>
  );
}