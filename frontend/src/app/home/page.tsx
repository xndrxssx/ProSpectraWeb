// src/app/home/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle2, Clock, LoaderCircle, TrendingUp, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Importações dos componentes de dashboard
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { ProducerDashboard } from "@/components/dashboards/ProducerDashboard";

// Tipos para os dados da API
type AdminViewData = any;
type ProducerViewData = any;
type CommonDataView = any;
type DashboardData = {
  admin_view: AdminViewData;
  producer_view: ProducerViewData;
  common_data: CommonDataView;
};

function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "producer" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    // Lê o token e define role
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.userType);
      } catch (e) {
        console.error("Token inválido ou expirado.", e);
      }
    }

    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Usuário não autenticado");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`A resposta da rede não foi 'ok': ${response.statusText}`);
        }

        const data: DashboardData = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Falha ao buscar dados do dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen flex bg-[#eaeaea] text-[#001E01] w-full">
      {/* Sidebar */}
      <div className="w-45">
        <CustomSidebar />
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 p-10">
        <div className="space-y-6">
          {/* Cabeçalho */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-center">Bem vindo ao ProSpectraWeb!</h1>
            <p className="text-lg text-center text-gray-600">
              Dashboard de análise espectral e machine learning
            </p>
          </div>

          {/* Dashboard Completo */}
          {isLoading ? (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
              </div>
              <Skeleton className="h-[400px] rounded-lg" />
            </div>
          ) : dashboardData && userRole ? (
            userRole === "admin" ? (
              <AdminDashboard data={dashboardData.admin_view} commonData={dashboardData.common_data} />
            ) : (
              <ProducerDashboard data={dashboardData.producer_view} commonData={dashboardData.common_data} />
            )
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg text-center">
              <LoaderCircle className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Carregando dados do dashboard...</p>
            </div>
          )}

          {/* Cards de Ação Rápida */}
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/train-model">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Treinar Modelo
                  </CardTitle>
                  <CardDescription>
                    Configure e treine novos modelos de machine learning
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/apply-models">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Fazer Predições
                  </CardTitle>
                  <CardDescription>
                    Use modelos treinados para fazer predições em novos dados
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Home);
