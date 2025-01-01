"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import jsPDF from "jspdf";
import ExcelJS from "exceljs";
import CustomSidebar from "@/components/Sidebar"; 
import withAuth from "@/components/withAuth";

function ExportReports () {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(e.target.value);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Relatório de Dados", 20, 20);
      doc.text(`Data de Início: ${filters.startDate}`, 20, 40);
      doc.text(`Data de Fim: ${filters.endDate}`, 20, 60);
      doc.text(`Categoria: ${filters.category}`, 20, 80);

      doc.save("relatorio.pdf");
    } catch (e) {
      setError("Erro ao gerar o PDF. Tente novamente.");
    }
  };

  const generateExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Relatório");

      // Adicionar cabeçalhos
      worksheet.columns = [
        { header: "Data de Início", key: "startDate", width: 20 },
        { header: "Data de Fim", key: "endDate", width: 20 },
        { header: "Categoria", key: "category", width: 20 },
      ];

      // Adicionar dados
      worksheet.addRow({
        startDate: filters.startDate,
        endDate: filters.endDate,
        category: filters.category,
      });

      // Gerar o arquivo Excel
      const buffer = await workbook.xlsx.writeBuffer();

      // Criar um link para download
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "relatorio.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError("Erro ao gerar o Excel. Tente novamente.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!filters.startDate || !filters.endDate || !filters.category) {
      setError("Todos os filtros devem ser preenchidos.");
      return;
    }

    if (selectedFormat === "pdf") {
      generatePDF();
    } else if (selectedFormat === "excel") {
      generateExcel();
    }
  };

  const checkAdminStatus = () => {
    const user = localStorage.getItem("user");
    if (!user || JSON.parse(user).role !== "admin") {
      console.log("Usuário não autenticado, mas acesso permitido para teste.");
    }
  };

  React.useEffect(() => {
    checkAdminStatus();
  }, []);

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Exportar Relatórios</h1>

          {error && <div className="error text-red-500 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium mb-2">
                Data de Início:
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium mb-2">
                Data de Fim:
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Categoria:
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Selecione uma categoria</option>
                <option value="financeiro">Financeiro</option>
                <option value="vendas">Vendas</option>
                <option value="estoque">Estoque</option>
              </select>
            </div>

            <div>
              <label htmlFor="format" className="block text-sm font-medium mb-2">
                Formato:
              </label>
              <select
                id="format"
                name="format"
                value={selectedFormat}
                onChange={handleFormatChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
            >
              Gerar Relatório
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default withAuth(ExportReports);
