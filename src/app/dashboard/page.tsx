"use client";

import { useState, useEffect } from "react";
import withAuth from "@/components/withAuth";

// Importações estáticas em vez de dynamic
import Sidebar from "@/components/Sidebar";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { ProducerDashboard } from "@/components/dashboards/ProducerDashboard";
import { Skeleton } from "@/components/ui/skeleton";

// Tipos para os dados da API
type AdminViewData = any;
type ProducerViewData = any;
type CommonDataView  = any;
type DashboardData = {
  admin_view: AdminViewData;
  producer_view: ProducerViewData;
  common_data: CommonDataView;
};

function Dashboard() {
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
    <div className="min-h-screen w-full flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar estático */}
      <Sidebar />

      <main className="flex-1 flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-4 text-center w-full">Dashboard</h1>

        <div className="flex-1">
          {isLoading || !userRole || !dashboardData ? (
            // Skeleton enquanto carrega
            <div className="space-y-6 w-full">
              <div className="grid gap-6 md:grid-cols-3">
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
              </div>
              <Skeleton className="h-[400px] rounded-lg" />
            </div>
          ) : (
            // Renderiza o dashboard correto
            userRole === "admin" ? (
              <AdminDashboard data={dashboardData.admin_view} commonData={dashboardData.common_data} />
            ) : (
              <ProducerDashboard data={dashboardData.producer_view} commonData={dashboardData.common_data} />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default withAuth(Dashboard);