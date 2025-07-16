// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
    userType: "prod",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Controle do popup

  const router = useRouter(); // Inicializando o router

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const isChecked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? isChecked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    console.log("Dados enviados:", formData);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          userType: formData.userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Erro ao criar conta.");
      } else {
        setSuccessMessage(data.message || "Conta criada com sucesso!");
        setErrorMessage("");
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
          terms: false,
          userType: "prod",
        });

        // Exibir o popup de sucesso
        setIsSuccess(true);
      }
    } catch (error) {
      setErrorMessage("Erro ao conectar ao servidor.");
    }
  };

  // Função para fechar o popup e redirecionar usando o router
  const handlePopupClose = () => {
    setIsSuccess(false);
    router.push("/login"); // Redireciona para a página de login usando router.push
  };

  return (
    <div className="relative min-h-screen w-full bg-[#eaeaea]">
      {/* Container para a animação de ondas */}
      <div id="waves-container" className="absolute inset-0 overflow-hidden -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Primeira onda */}
          <path
            d="M0,500 C360,80 720,240 1480,150 1440,80 1800,240 2160,160"
            stroke="url(#gradient)"
            strokeWidth="1"
            fill="none"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,150 C260,90 720,300 1480,150 1440,300 1800,90 2160,150;
                M0,150 C260,50 720,350 1480,150 1440,350 1800,50 2160,150;
                M0,150 C260,350 720,50 1480,150 1440,50 1800,350 2160,150;
                M0,150 C360,50 720,350 1480,150 1440,350 1800,50 2160,150"
              keyTimes="0; 0.33; 0.66; 1"
              keySplines="0.25, 0.1, 0.25, 1; 0.25, 0.1, 0.25, 1; 0.25, 0.1, 0.25, 1"
            />
          </path>
          {/* Definições de gradientes para as ondas */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="100%" stopColor="#00ffbd" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Formulário com backdrop-blur centralizado */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md border sm:max-w-md xl:p-0 backdrop-blur-sm bg-white/5">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-green-500 text-sm">{successMessage}</div>
              )}
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Crie sua conta
              </p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Nome de usuário</label>
                <input
                  placeholder="JohnDoe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Senha</label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Confirme a senha</label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Selecione tipo de usuário</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="userType"
                      name="userType"
                      value="prod"
                      checked={formData.userType === "prod"}
                      onChange={handleChange}
                    />
                    <span>Produtor</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="userType"
                      name="userType"
                      value="admin"
                      checked={formData.userType === "admin"}
                      onChange={handleChange}
                    />
                    <span>Administrador</span>
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    className="w-4 h-4 border rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                    type="checkbox"
                    aria-describedby="terms"
                    id="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-[#001E01]">
                    Eu aceito os{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline text-primary-500"
                    >
                      Termos e Condições
                    </a>
                  </label>
                </div>
              </div>
              <button
                className="w-full bg-[#007100] hover:bg-[#005304] focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white transition-all duration-300 ease-in-out"
                type="submit"
              >
                Criar conta
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Popup de Sucesso */}
      {isSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4">
          <p className="text-lg text-center">Conta criada com sucesso!</p>
          <button
            onClick={handlePopupClose}
            className="bg-[#007100] hover:bg-[#005304] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-[#005304] text-white transition-all duration-300 ease-in-out"
          >
            Ir para Login
          </button>
        </div>
      </div>
      
      )}
    </div>
  );
}
