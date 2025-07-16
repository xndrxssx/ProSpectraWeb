"use client";

import { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Prediction {
  id: number;
  name: string;
  model_name: string;
  spectral_data_id: number;
  prediction: number;
  createdAt: string;
}

function MeasurementHistory() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        toast.info("Carregando histórico de predições...");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/predictions/`);
        if (!response.ok) throw new Error("Erro ao buscar predições");

        const data: Prediction[] = await response.json();
        setPredictions(data);
        toast.success("Histórico carregado com sucesso!");
      } catch (err) {
        setError("Erro ao carregar histórico de predições.");
        toast.error("Erro ao carregar histórico de predições.");
      } finally {
        setLoading(false);
        toast.dismiss(); // Fecha toasts "Carregando..." se ainda estiver aberto
      }
    };

    fetchPredictions();
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <ToastContainer />
      <main className="flex-1 p-6">

        <div className="bg-white/10 w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-6">Histórico de Predições</h1>
          <h2 className="text-lg font-semibold mb-4">Resultados</h2>

          {loading && <p>Carregando predições...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && predictions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-white text-left font-semibold">
                    <th className="p-3 border">ID</th>
                    <th className="p-3 border">Data</th>
                    <th className="p-3 border">Nome</th>
                    <th className="p-3 border">Modelo</th>
                    <th className="p-3 border">ID Espectral</th>
                    <th className="p-3 border">Predição</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((pred) => (
                    <tr key={pred.id} className="hover:bg-gray-100 text-center">
                      <td className="p-3 border">{pred.id}</td>
                      <td className="p-3 border">{new Date(pred.createdAt).toLocaleString("pt-BR")}</td>
                      <td className="p-3 border">{pred.name}</td>
                      <td className="p-3 border">{pred.model_name}</td>
                      <td className="p-3 border">{pred.spectral_data_id}</td>
                      <td className="p-3 border">{pred.prediction.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && predictions.length === 0 && (
            <p>Nenhuma predição encontrada.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default withAuth(MeasurementHistory);
