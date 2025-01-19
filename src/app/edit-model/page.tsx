"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import ExcelJS from "exceljs";

function EditModel() {
  const [filtroNome, setFiltroNome] = useState(""); // Nome do atributo
  const [hiperparametros, setHiperparametros] = useState<string>(
    "n_estimators=100; max_depth=10; criterion=squared_error; min_samples_split=2; min_samples_leaf=1; bootstrap=true; n_jobs=null; random_state=42"
  );
  const [erro, setErro] = useState("");
  const [XData, setXData] = useState<any[]>([]); // Dados X
  const [yData, setYData] = useState<any[]>([]); // Dados y
  const router = useRouter();

  // Função para ler o arquivo Excel e extrair os dados X e y
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async () => {
        const buffer = reader.result as ArrayBuffer;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
          setErro("Planilha não encontrada no arquivo.");
          return;
        }

        let data: any[] = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1 && Array.isArray(row.values)) {
            data.push(row.values.slice(1));
          }
        });

        if (type === "X") {
          setXData(data);
        } else if (type === "y") {
          setYData(data);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!filtroNome || XData.length === 0 || yData.length === 0 || !hiperparametros) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    try {
      // Processar hiperparâmetros no formato "key=value;key=value" para um objeto
      const hiperparametrosDict = hiperparametros.split(";").reduce((acc, param) => {
        const [key, value] = param.split("=");
        if (key && value) {
          acc[key.trim()] = isNaN(Number(value)) ? value.trim() : Number(value);
        }
        return acc;
      }, {} as Record<string, any>);

      const response = await fetch("/api/train-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attribute: filtroNome,
          X_features: XData,
          y_target: yData,
          modelo: "RandomForest",
          hyperparameters: hiperparametrosDict,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Modelo salvo com sucesso!");
        router.push("/success");
      } else {
        setErro(result.message || "Ocorreu um erro. Tente novamente.");
      }
    } catch (error) {
      setErro("Erro ao enviar dados. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white/10 max-w-lg w-full backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Treinar e Salvar Modelo</h1>
          <p className="text-center text-sm mb-6">Insira os detalhes do modelo para edição.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome do atributo */}
            <div>
              <label htmlFor="filtroNome" className="block text-sm font-medium mb-2">
                Nome do atributo:
              </label>
              <input
                id="filtroNome"
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Digite o nome do filtro"
              />
            </div>

            {/* Arquivo X */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Carregar Arquivo X (Features)
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, "X")}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Arquivo y */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Carregar Arquivo y (Target)
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, "y")}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Hiperparâmetros */}
            <div>
              <label htmlFor="hiperparametros" className="block text-sm font-medium mb-2">
                Hiperparâmetros (separados por ponto e vírgula):
              </label>
              <input
                id="hiperparametros"
                value={hiperparametros}
                onChange={(e) => setHiperparametros(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: n_estimators=100; max_depth=10; criterion=squared_error"
              />
            </div>

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <button
              type="submit"
              className="mt-6 w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
            >
              Salvar Modelo
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withAuth(EditModel, ["/edit-model"]);
