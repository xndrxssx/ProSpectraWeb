// components/withAuth.tsx
'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface DecodedToken {
  userType: string; // A propriedade userType no token
  exp: number; // Timestamp de expiração
  sub: string; // Subject (username)
}

const withAuth = <P extends object>(Component: React.ComponentType<P>, restrictedRoutes: string[] = []) => {
  const AuthHOC = (props: P) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!isClient) return;

      const validateToken = async () => {
        const token = localStorage.getItem("token");
        
        // Se não houver token, redireciona para a página de login
        if (!token) {
          router.push("/login");
          return;
        }

        try {
          // Validar token com o backend
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
          const response = await fetch(`${apiUrl}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error("Token inválido ou expirado");
          }

          const userData = await response.json();
          
          // Verificar permissões baseado no userType
          const currentPath = window.location.pathname;
          if (restrictedRoutes.includes(currentPath) && userData.userType === "prod") {
            alert("Você não tem permissão para acessar esta página.");
            router.push("/home");
            return;
          }

          // Armazenar dados do usuário no localStorage para uso na sidebar
          localStorage.setItem("userData", JSON.stringify(userData));
          
        } catch (error) {
          console.error("Erro ao validar token:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          router.push("/login");
        }
      };

      validateToken();
    }, [isClient, router]);

    // Renderiza o componente apenas no cliente para evitar problemas de hidratação
    if (!isClient) {
      return <div className="min-h-screen w-full flex bg-[#eaeaea] text-[#001E01]">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#165a16] mx-auto mb-4"></div>
            <p>Carregando...</p>
          </div>
        </div>
      </div>;
    }

    return <Component {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
