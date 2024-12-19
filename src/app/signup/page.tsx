// src/app/signup/page.tsx
"use client";

import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#B4FD8F] to-[#B3C1FF]">
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
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your username
                </label>
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
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
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
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
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
                    I accept the 
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline text-primary-500"
                    >
                       Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <button
                className="w-full bg-[#2c642f] hover:bg-[#005304] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-[#005304] text-white transition-all duration-300 ease-in-out"
                type="submit"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
