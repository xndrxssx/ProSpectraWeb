import { useState, useEffect } from 'react';

export default function useAuth() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | null>(null);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const setToken = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const decodedToken = JSON.parse(atob(parts[1]));
        console.log('Decoded Token:', decodedToken);
        
        // Atualiza o estado com as informações do token
        setIsAdmin(decodedToken.userType === 'admin');
        setUserType(decodedToken.userType);
        
        // Salva o token no localStorage
        localStorage.setItem('token', token);
      } else {
        console.error('Token JWT inválido');
      }
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
    }
  };

  const handleLogout = () => {
    // Limpar dados de autenticação
    localStorage.removeItem('token');
    setIsAdmin(false);
    setUserType(null);
  };

  useEffect(() => {
    // Quando o componente for montado, verifica se existe um token no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);  // Se o token existir, decriptografa e atualiza o estado
    }
  }, []);

  return { isAdmin, userType, setToken, getToken, handleLogout };
}
