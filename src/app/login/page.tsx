"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
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

      {/* Formulário com backdrop-blur */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg z-10 backdrop-blur-sm bg-white/5 border border-solid border-white">
        <div className="text-[#001E01] ">
          <h1 className="text-4xl font-bold mb-4">Login</h1>
          <p className="mb-6">Bem-vindo!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#007100] text-[#ffffff] p-3 rounded-lg hover:bg-[#b3ffe8] transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            <p>
              Não possui cadastro?{" "}
              <Link
                href="/signup"
                className="text-[#007100] hover:text-[#005304] font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
