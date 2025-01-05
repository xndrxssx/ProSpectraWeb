// components/withAuth.tsx
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface DecodedToken {
  userType: string; // A propriedade userType no token
}

const withAuth = <P extends object>(Component: React.ComponentType<P>, restrictedRoutes: string[] = []) => {
  const AuthHOC = (props: P) => {
    const router = useRouter();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
      if (!token) {
        // Se não houver token, redireciona para a página de login
        router.push("/login");
        return;
      }

      try {
        // Dividir o token em partes: header, payload, signature
        const parts = token.split('.');
        if (parts.length === 3) {
          // Decodifica o payload (segunda parte) do token usando atob
          const decodedToken: DecodedToken = JSON.parse(atob(parts[1]));
          console.log('Decoded Token:', decodedToken);

          // Verifica se o tipo de usuário é restrito para a rota atual
          const currentPath = window.location.pathname;
          if (restrictedRoutes.includes(currentPath) && decodedToken.userType === "produtor") {
            // Se o usuário não tiver permissão, redireciona para a página de acesso negado
            router.push("/access-denied");
          }
        } else {
          throw new Error("Token inválido");
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        localStorage.removeItem("token"); // Remove o token inválido
        router.push("/login"); // Redireciona para a página de login
      }
    }, [token, router]);

    // Se o token estiver ausente ou o tipo de usuário for inválido, redireciona
    if (!token) {
      router.push("/");
    }

    return <Component {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
