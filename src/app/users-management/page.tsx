"use client";

import React, { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";

interface User {
  id: number;
  username: string;
  userType: string;
}

function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    userType: "produtor", // valor padrão
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Carregar os usuários da API ao montar o componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users-management');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const validateUserData = () => {
    const { username, password, userType } = newUser;
    if (!username || !password || !userType) {
      setError("Todos os campos devem ser preenchidos.");
      return false;
    }
    return true;
  };

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    if (!validateUserData()) return;
  
    try {
      const response = await fetch('/api/users-management', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Verifique se a resposta contém os dados corretos do usuário
        if (data.user) {
          setUsers((prevUsers) => [...prevUsers, data.user]);
          setNewUser({ username: "", password: "", userType: "produtor" });
          setSuccess("Usuário adicionado com sucesso.");
        } else {
          setError("ID do usuário não foi retornado corretamente.");
        }
      } else {
        setError(data.error || "Erro ao adicionar usuário.");
      }
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
      setError("Erro ao criar o usuário.");
    }
  };  

  const handleUpdateUserType = async (userId: number, newUserType: string) => {
    try {
      const response = await fetch('/api/users-management', {
        method: 'PUT',
        body: JSON.stringify({ id: userId, userType: newUserType }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, userType: newUserType } : user
          )
        );
        setSuccess("Tipo de usuário atualizado com sucesso.");
      } else {
        setError(data.error || "Erro ao atualizar o tipo de usuário.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o tipo de usuário:", error);
      setError("Erro ao atualizar o tipo de usuário.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch('/api/users-management', {
        method: 'DELETE',
        body: JSON.stringify({ id: userId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setSuccess("Usuário excluído com sucesso.");
      } else {
        setError(data.error || "Erro ao excluir o usuário.");
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setError("Erro ao excluir o usuário.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-100 overflow-hidden"> {/* Trancando overflow da página inteira */}
      <CustomSidebar />
      <div className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Gerenciar Usuários</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl min-h-[720px]">
          {/* Lista de usuários */}
          <div className="bg-white/10 w-full backdrop-blur-sm rounded-lg p-8 shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Usuários Cadastrados</h2>
            <div className="h-[570px] overflow-y-auto"> {/* Ajuste a altura conforme necessário */}
              {users.length > 0 ? (
                <ul className="space-y-4">
                  {users.map((user) => (
                    <li key={user.id} className="border-b pb-2 last:border-b-0">
                      <div>
                        <p className="font-semibold">{user.username}</p>
                        <p className="text-gray-500 text-sm">Tipo: {user.userType}</p>
                        <div className="flex space-x-4 mt-2">
                          <button
                            onClick={() =>
                              handleUpdateUserType(user.id, user.userType === "produtor" ? "admin" : "produtor")
                            }
                            className="bg-[#007100] hover:bg-[#005304] rounded-sm text-sm px-4 py-2 text-center text-white transition-all duration-300 ease-in-out"
                          >
                            Alterar tipo
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-600 hover:bg-red-800 rounded-sm text-sm px-4 py-2 text-center text-white transition-all duration-300 ease-in-out"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Nenhum usuário cadastrado.</p>
              )}
            </div>
          </div>
          {/* Formulário para adicionar usuário */}
          <div className="bg-white/10 w-full backdrop-blur-sm rounded-lg p-8 shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Adicionar Usuário</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
  
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium">Nome</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="userType" className="block text-sm font-medium">Tipo de Usuário</label>
                <select
                  id="userType"
                  name="userType"
                  value={newUser.userType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="produtor">Produtor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-[#007100] hover:bg-[#005304] font-medium rounded-lg text-base px-5 py-2.5 text-center text-white transition-all duration-300 ease-in-out"
              >
                Adicionar Usuário
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default withAuth(ManageUsers, ["/users-management"]);