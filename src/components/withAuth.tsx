// components/withAuth.tsx

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

// Definindo o tipo correto para o HOC
interface Props {
  children?: ReactNode; // Permite que o componente envolvido tenha children
}

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthHOC = (props: P) => {
    const router = useRouter();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
      if (!token) {
        // Se não houver token, redireciona para a página de login
        router.push("/login");
      }
    }, [token, router]);

    if (!token) {
      // Enquanto não houver token, exibe uma tela de carregamento ou nada
      return <div>Carregando...</div>;
    }

    return <Component {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
