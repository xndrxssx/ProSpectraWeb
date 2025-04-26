"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Select, { SingleValue, MultiValue, ActionMeta, components, MenuListProps } from "react-select";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FixedSizeList as List } from 'react-window';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SelectOption {
  label: string;
  value: string;
}

interface Dataset {
  dataset: string;
  id: string;
}

interface Attribute {
  attribute: string;
  id: string;
}

// Define MenuList component with proper TypeScript types
const MenuList: React.FC<MenuListProps<SelectOption>> = ({ options, children, maxHeight, getValue }) => {
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * 35; // Adjust based on your item height

  // Ensure children is treated as an array
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <List
      height={maxHeight}
      itemCount={childrenArray.length}
      itemSize={35} // Adjust based on your item height
      initialScrollOffset={initialOffset}
      width="100%"
    >
      {({ index, style }) => <div style={style}>{childrenArray[index]}</div>}
    </List>
  );
};

function EditModel() {
  const [selectedXTrain, setSelectedXTrain] = useState<SingleValue<SelectOption>>(null);
  const [selectedXTest, setSelectedXTest] = useState<SingleValue<SelectOption>>(null);
  const [selectedYTrain, setSelectedYTrain] = useState<SingleValue<SelectOption>>(null);
  const [selectedYTest, setSelectedYTest] = useState<SingleValue<SelectOption>>(null);
  const [XTrain, setXTrain] = useState<any[]>([]);
  const [XTest, setXTest] = useState<any[]>([]);
  const [yTrain, setYTrain] = useState<any[]>([]);
  const [yTest, setYTest] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modelSelected, setModelSelected] = useState(false);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [attribute, setAttribute] = useState(""); // Estado para armazenar o atributo selecionado
  const [selectedModelName, setSelectedModelName] = useState<string>("");
  const [hyperparameters, setHyperparameters] = useState(
    selectedModelName === "SVR"
      ? "kernel=rbf; degree=3; gamma=scale; tol=0.001; C=1.0; epsilon=0.1; cache_size=200"
      : "n_estimators=100; max_depth=10; criterion=squared_error; min_samples_split=2; min_samples_leaf=4; random_state=42"
  );
  const [selectedVariety, setSelectedVariety] = useState<{ value: number; label: string } | null>(null);
  const [varieties, setVarieties] = useState<{ id: string; name: string }[]>([]);

  const handleModelChange = (newValue: SingleValue<SelectOption>) => {
    if (!newValue) return;
    setSelectedModelName(newValue.value);
  
    // Definir os hiperparâmetros padrão com base no modelo selecionado
    if (newValue.value === "SVMR") {
      setHyperparameters("kernel=rbf; degree=3; gamma=scale; tol=0.001; C=1.0; epsilon=0.1; cache_size=200");
    } else if (newValue.value === "RFR") {
      setHyperparameters("n_estimators=100; max_depth=10; criterion=squared_error; min_samples_split=2; min_samples_leaf=4; random_state=42");
    } else if (newValue.value === "PLSR") {
      setHyperparameters("n_components=2; max_iter=500; tol=1e-06"); 
    } else if (newValue.value === "PCR") {
      setHyperparameters("n_components=2; tol=1e-06; random_state=42"); 
    }
    else if (newValue.value === "MLPR") {
      setHyperparameters("hidden_layer_sizes=[100]; activation=relu; solver=adam; alpha=0.0001; batch_size=auto; learning_rate=constant;  max_iter=200; random_state=42; tol=0.0001; early_stopping=true; epsilon=1e-08;");
    }
  };  

  const renderHyperparameterFields = () => {
    if (selectedModelName === "RFR") {
      return (
        <div>
          <label>Hiperparâmetros para RFR:</label>
          <input
            type="text"
            value={hyperparameters}
            onChange={(e) => setHyperparameters(e.target.value)}
            placeholder="Digite os hiperparâmetros"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      );
    }
  
    if (selectedModelName === "SVR") {
      return (
        <div>
          <label>Hiperparâmetros para SVR:</label>
          <input
            type="text"
            value={hyperparameters}
            onChange={(e) => setHyperparameters(e.target.value)}
            placeholder="Digite os hiperparâmetros"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      );
    }
  
    if (selectedModelName === "PLSR") {
      return (
        <div>
          <label>Hiperparâmetros para PLSR:</label>
          <input
            type="text"
            value={hyperparameters}
            onChange={(e) => setHyperparameters(e.target.value)}
            placeholder="Digite os hiperparâmetros"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      );
    }

    if (selectedModelName === "PCR") {
      return (
        <div>
          <label>Hiperparâmetros para PCR:</label>
          <input
            type="text"
            value={hyperparameters}
            onChange={(e) => setHyperparameters(e.target.value)}
            placeholder="Digite os hiperparâmetros"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      );
    }

    if (selectedModelName === "MLPR") {
      return (
        <div>
          <label>Hiperparâmetros para MLPR:</label>
          <input
            type="text"
            value={hyperparameters}
            onChange={(e) => setHyperparameters(e.target.value)}
            placeholder="Digite os hiperparâmetros"
            className="w-full p-2 border rounded-lg"
          />
        </div>
      );
    }
  
    return null;
  };  
  
  useEffect(() => {
    const fetchVarieties = async () => {
      try {
        const response = await fetch("/api/edit-variety");
        const data = await response.json();
        // console.log("Variedades encontradas no banco:", data);
        setVarieties(data);
        toast.success("Variedades carregadas com sucesso!");
      } catch (error) {
        toast.error("Erro ao buscar variedades.");
        console.error("Erro ao buscar variedades:", error);
      }
    };
      fetchVarieties();
    }, []);
  // Fetch datasets and attributes on component mount
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-wavelengths/`);
        const data = await response.json();
        setDatasets(data);
        toast.success("Datasets carregados com sucesso!");
      } catch (error) {
        toast.error("Erro ao buscar datasets.");
        console.error("Erro ao buscar datasets:", error);
      }
    };

    const fetchAttributes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-targets/`);
        const data = await response.json();
        setAttributes(data);
        toast.success("Atributos carregados com sucesso!");
      } catch (error) {
        toast.error("Erro ao buscar atributos.");
        console.error("Erro ao buscar attributes:", error);
      }
    };

    fetchDatasets();
    fetchAttributes();
    setIsMounted(true);
  }, []);

  // Fetch data in chunks
  const fetchDataInChunks = async (url: string, setDataFunction: (data: any[]) => void, key: "X" | "y") => {
    try {
      toast.info(`Carregando ${key}...`, { autoClose: 1500 });
      const response = await fetch(url);
      const data = await response.json();
  
      if (!data || !data[key]) {
        toast.error(`Dados de ${key} não encontrados.`);
        console.error(`Dados retornados não contêm a chave esperada (${key}):`, data);
        return;
      }
  
      const extractedData = data[key];
  
      if (!Array.isArray(extractedData)) {
        toast.error(`Formato inválido de dados para ${key}.`);
        console.error(`Os dados ${key} não estão no formato de array:`, extractedData);
        return;
      }
  
      setDataFunction(extractedData);
      toast.success(`${key} carregado com sucesso!`);
    } catch (error) {
      toast.error(`Erro ao buscar ${key}.`);
      console.error(`Erro ao buscar ${key}:`, error);
    }
  };  

  // Função para lidar com a seleção de X_train
  const handleXTrainChange = async (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if (!newValue || "length" in newValue) return;
    setSelectedXTrain(newValue);
    setLoading(true);

    console.log("ID do dataset selecionado para X_train:", newValue.value);
    const datasetId = parseInt(newValue.value, 10);
    if (isNaN(datasetId)) {
      console.error("ID do dataset inválido:", newValue.value);
      return;
    }

    await fetchDataInChunks(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-wavelengths/${datasetId}`,
      setXTrain,
      "X"
    );

    setLoading(false);
  };

  // Função para lidar com a seleção de X_test
  const handleXTestChange = async (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if (!newValue || "length" in newValue) return;
    setSelectedXTest(newValue);
    setLoading(true);

    console.log("ID do dataset selecionado para X_test:", newValue.value);
    const datasetId = parseInt(newValue.value, 10);
    if (isNaN(datasetId)) {
      console.error("ID do dataset inválido:", newValue.value);
      return;
    }

    await fetchDataInChunks(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-wavelengths/${datasetId}`,
      setXTest,
      "X"
    );

    setLoading(false);
  };

  // Função para lidar com a seleção de y_train
  const handleYTrainChange = async (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if (!newValue || "length" in newValue) return;
    setSelectedYTrain(newValue);
    setLoading(true);

    console.log("ID do target selecionado para y_train:", newValue.value);

    await fetchDataInChunks(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-targets/${newValue.value}`,
      setYTrain,
      "y"
    );

    setLoading(false);
  };

  // Função para lidar com a seleção de y_test
  const handleYTestChange = async (
    newValue: SingleValue<SelectOption> | MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    if (!newValue || "length" in newValue) return;
    setSelectedYTest(newValue);
    setLoading(true);

    console.log("ID do target selecionado para y_test:", newValue.value);

    await fetchDataInChunks(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-targets/${newValue.value}`,
      setYTest,
      "y"
    );

    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedXTrain || !selectedXTest || !selectedYTrain || !selectedYTest) {
      toast.warning("Selecione todos os campos (X_train, X_test, y_train, y_test).");
      return;
    }

    if (XTrain.length === 0 || XTest.length === 0 || yTrain.length === 0 || yTest.length === 0) {
      toast.warning("Dados não carregados. Tente novamente.");
      return;
    }

    if (!Array.isArray(XTrain) || !XTrain.every(Array.isArray)) {
      console.error("Formato inválido para X_train:", XTrain);
      toast.error("Formato inválido para os dados X_train.");
      return;
    }

    if (!Array.isArray(XTest) || !XTest.every(Array.isArray)) {
      console.error("Formato inválido para X_test:", XTest);
      toast.error("Formato inválido para os dados X_test.");
      return;
    }

    if (!Array.isArray(yTrain)) {
      console.error("Formato inválido para y_train:", yTrain);
      toast.error("Formato inválido para os dados y_train.");
      return;
    }

    if (!Array.isArray(yTest)) {
      console.error("Formato inválido para y_test:", yTest);
      toast.error("Formato inválido para os dados y_test.");
      return;
    }

    setLoading(true);

    // Converter hiperparâmetros para JSON
    const parsedHyperparameters = hyperparameters
    .split("; ")
    .reduce((acc: Record<string, any>, param) => {
      const [key, value] = param.split("=");
      
      // Removendo aspas extras caso existam
      const cleanValue = value.replace(/^['"]|['"]$/g, "");

      // Verifica se deve ser tratado como string ou número
      const parsedValue = isNaN(parseFloat(cleanValue)) ? cleanValue : parseFloat(cleanValue);

      acc[key] = parsedValue;
      return acc;
    }, {} as Record<string, any>);

    console.log(parsedHyperparameters);

    // Definir o endpoint com base no modelo selecionado
    const endpoint = {
      SVR: "/api/train-model-svr/",
      RFR: "/api/train-model-rfr/",
      PLSR: "/api/train-model-plsr/",
      PCR: "/api/train-model-pcr/",
      MLPR: "/api/train-model-mlpr/"
    };
    
    // Verifica se selectedModelName é uma chave válida
    if (!(selectedModelName in endpoint)) {
      throw new Error(`Modelo inválido: ${selectedModelName}`);
    }

    // Enviar os hiperparâmetros e treinar o modelo
    try {
      if (!selectedVariety) {
        toast.warning("Selecione uma variedade antes de treinar o modelo.");
        return;
      }
      toast.info("Processando envio...", { autoClose: 1500 });
      
      console.log("Valor de variety_id antes do envio:", Number(selectedVariety?.value));

      const trainResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint[selectedModelName as keyof typeof endpoint]}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: selectedModelName,
          variety: selectedVariety?.label, // Agora enviando o nome da variedade
          attribute: attribute,
          hyperparameters: parsedHyperparameters,
          X_train: XTrain,
          X_test: XTest,
          y_train: yTrain,
          y_test: yTest,
        }),
      });      

      console.log("Payload Enviado:", JSON.stringify({
        model_name: selectedModelName, // Enviando o nome do modelo
        variety: selectedVariety?.label,
        attribute: attribute,
        X_train: XTrain,
        y_train: yTrain,
        X_test: XTest,
        y_test: yTest,
        hyperparameters: parsedHyperparameters,
      }, null, 2));
      

      if (!trainResponse.ok) {
        throw new Error("Erro ao treinar o modelo.");
      }

      toast.success("Dados enviados com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar os dados. Tente novamente.");
      alert("Erro ao treinar o modelo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
      <CustomSidebar />
      <ToastContainer />
      <main className="flex-1 flex items-center justify-center overflow-y-auto">
        <div className="bg-white/10 w-3/5 backdrop-blur-sm rounded-lg p-16 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Treinar Modelo</h1>
          <p className="text-center text-sm mb-6">
            Insira os dados espectrais locais para treinar o modelo selecionado.
          </p>
          {loading && <LoadingSpinner />}
          <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={attribute}
            onChange={(e) => setAttribute(e.target.value)}
            placeholder="Digite o nome do atributo"
            className="w-full p-2 border rounded-lg"
          />
            {isMounted && (
              <>
                <Select
                  instanceId="variety-select"
                  options={varieties.map((v) => ({ label: v.name, value: v.id.toString() }))} // Garante que o id seja string
                  onChange={(newValue) => {
                    if (newValue) {
                      setSelectedVariety({ value: Number(newValue.value), label: newValue.label });
                    } else {
                      setSelectedVariety(null);
                    }
                  }}
                  placeholder="Selecione a variedade da uva"
                />

                <Select
                  instanceId="xtrain-select"
                  options={datasets.map((d) => ({ label: d.dataset, value: d.id }))}
                  onChange={handleXTrainChange}
                  placeholder="Selecione um X_train"
                  components={{ MenuList }}
                />

                <Select
                  instanceId="xtest-select"
                  options={datasets.map((d) => ({ label: d.dataset, value: d.id }))}
                  onChange={handleXTestChange}
                  placeholder="Selecione um X_test"
                  components={{ MenuList }}
                />

                <Select
                  instanceId="ytrain-select"
                  options={attributes.map((a) => ({ label: a.attribute, value: a.id }))}
                  onChange={handleYTrainChange}
                  placeholder="Selecione um y_train"
                  components={{ MenuList }}
                />

                <Select
                  instanceId="ytest-select"
                  options={attributes.map((a) => ({ label: a.attribute, value: a.id }))}
                  onChange={handleYTestChange}
                  placeholder="Selecione um y_test"
                  components={{ MenuList }}
                />

                {/* Seleção do modelo */}
                <Select
                  instanceId="model-select"
                  options={[
                    { label: "Random Forest Regressor", value: "RFR" },
                    { label: "Support Vector Regressor", value: "SVR" },
                    { label: "Partial Least Squares Regression", value: "PLSR" },
                    { label: "Principal Component Regression", value: "PCR" },
                    { label: "Multilayer Perceptron Regressor", value: "MLPR" },
                  ]}
                  onChange={handleModelChange}
                  placeholder="Selecione um modelo"
                />

                {renderHyperparameterFields()}
              </>
            )}

            {modelSelected && (
              <textarea
                value={hyperparameters}
                onChange={(e) => setHyperparameters(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            )}

            <button
              type="submit"
              className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#208120] transition-all duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "Processando..." : "Treinar Modelo"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default withAuth(EditModel, ["/edit-model"]);