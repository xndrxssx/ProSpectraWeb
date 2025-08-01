'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from "recharts";
import { MetricCard } from "@/components/dashboards/MetricCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export function ProducerDashboard({ data, commonData }: { data: any, commonData: any }) {
  if (!data || !data.stats || !commonData) {
    return <div>Não foi possível carregar os dados do produtor ou os dados estão incompletos.</div>;
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


  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Seus MetricCards aqui... */}
         <MetricCard
          title="Total de Predições"
          value={stats.total_predictions.value}
          description={stats.total_predictions.description}
          icon={<Activity className="h-4 w-4" />}
          trend={stats.total_predictions.trend}
        />
        <MetricCard
          title="Precisão Média (Proxy)"
          value={stats.average_precision.value}
          description={stats.average_precision.description}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <MetricCard
          title="Erro Médio (Proxy)"
          value={stats.average_error.value}
          description={stats.average_error.description}
          icon={<AlertCircle className="h-4 w-4" />}
        />
      </div>

       <Tabs defaultValue="history">
        {/* Adicionando a nova aba e ajustando o grid para 3 colunas */}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="spectra">Visualizar Espectros</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="pt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Últimas 10 Predições Realizadas</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Data/Hora</TableHead>
                                <TableHead>Modelo</TableHead>
                                <TableHead>Valor Predito</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tables.prediction_history && tables.prediction_history.length > 0 ? (
                                tables.prediction_history.map((p: any) => (
                                    <TableRow key={p.id}>
                                        <TableCell>{new Date(p.timestamp).toLocaleString('pt-BR')}</TableCell>
                                        <TableCell>{p.model}</TableCell>
                                        <TableCell className="font-bold">{p.value.toFixed(4)}</TableCell>
                                        <TableCell>
                                          <Badge variant="outline" className="border-green-600 bg-green-100 text-green-800">
                                            OK
                                          </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                                        Nenhuma predição encontrada.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="trends" className="pt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Tendência de Predições</CardTitle>
                    <CardDescription>Volume de predições e precisão ao longo do tempo.</CardDescription>
                </CardHeader>
                <CardContent className="w-full aspect-video">
                    {charts.prediction_trend && charts.prediction_trend.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={charts.prediction_trend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
                                <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'white', 
                                        border: '1px solid #ccc',
                                        borderRadius: '0.5rem'
                                    }}
                                />
                                <Legend />
                                <Bar yAxisId="left" dataKey="predictions" fill="#82ca9d" name="Nº de Predições" />
                                <Line yAxisId="right" type="monotone" dataKey="r2" stroke="#8884d8" name="R² Médio (%)" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Nenhum dado de tendência para exibir.
                        </div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>
        
        {/* Conteúdo da nova aba de Espectros */}
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
       </Tabs>
    </div>
  );
}
