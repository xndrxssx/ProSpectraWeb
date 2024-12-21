"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#eaeaea] ">
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
          {/* Segunda onda */}
          <path
            d="M0,180 C360,120 720,260 1480,150 1440,100 1800,220 2160,180"
            stroke="url(#gradient2)"
            strokeWidth="1"
            fill="none"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,200 C360,100 720,300 1480,150 1440,300 1800,100 2160,200;
                M0,150 C360,50 720,350 1480,150 1440,350 1800,50 2160,200;
                M0,200 C360,-50 720,400 1480,150 1440,400 1800,-50 2160,200;
                M0,200 C360,100 720,300 1480,150 1440,300 1800,100 2160,200"
              keyTimes="0; 0.33; 0.66; 1"
              keySplines="0.25, 0.1, 0.25, 1; 0.25, 0.1, 0.25, 1; 0.25, 0.1, 0.25, 1"
            />
          </path>
          {/* Terceira onda */}
          <path
            d="M0,200 C360,150 720,280 1480,150 1440,180 1800,260 2160,200"
            stroke="url(#gradient3)"
            strokeWidth="1"
            fill="none"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,150 C360,100 720,300 1480,150 1440,300 1800,100 2160,150;
                M0,150 C360,50 720,350 1480,150 1440,350 1800,50 2160,150;
                M0,150 C360,350 720,50 1480,150 1440,50 1800,350 2160,150;
                M0,150 C360,150 720,300 1480,150 1440,300 1800,150 2160,150"
              keyTimes="0; 0.33; 0.66; 1"
              keySplines="0.25, 0.1, 0.25, 1; 0.25, 0.1, 0.25, 1; 0.25, 0.1, 0.25, 1"
            />
          </path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff0000" />
              <stop offset="100%" stopColor="#00ffbd" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3aff00" />
              <stop offset="100%" stopColor="#ff00c9" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff300" />
              <stop offset="100%" stopColor="#8b00ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Painel com blur, agora aplicando apenas ao conteúdo do texto e botões */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg z-10 backdrop-blur-sm bg-white/5 border border-solid border-white shadow-lg">
        <div className="text-center text-[#001E01]">
          <h1 className="text-4xl font-bold mb-4">ProSpectraWeb</h1>
          <p className="mb-6">A Pro tool for your Spectra data.</p>
          <div>
            <Link
              href="/login"
              className="bg-[#167d16] text-[#ffffff] p-3 rounded-lg hover:bg-[#3aa63a] transition-all duration-300 ease-in-out"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="ml-4 bg-transparent text-[#001E01] p-3 border-2 border-[#001E01] rounded-lg hover:bg-[#3aa63a] hover:text-[#001E01] transition-all duration-300 ease-in-out"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
