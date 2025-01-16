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
    <div className="min-h-screen w-full flex bg-[#eaeaea]"> 
      <CustomSidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex w-full max-w-4xl">
          {/* Formulário para adicionar usuário */}
          <div className="bg-white/10 w-2/3 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Adicionar Usuário</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
  
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">Nome</label>
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
                <label htmlFor="password" className="block text-sm font-medium mb-2">Senha</label>
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
                <label htmlFor="userType" className="block text-sm font-medium mb-2">Tipo de Usuário</label>
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
                className="mt-6 w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all duration-400 ease-in-out"
              >
                Adicionar Usuário
              </button>
            </form>
          </div>
          {/* Lista de usuários */}
          <div className="w-2/3 ml-8 bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Usuários Cadastrados</h2>
            <div className=""> 
              {users.length > 0 ? (
                <ul className="space-y-4">
                  {users.map((user) => (
                    <li key={user.id} className="border-b pb-2 last:border-b-0">
                      <div className="flex justify-between items-center"> {/* Alinhando as informações à esquerda e os botões à direita */}
                        <div>
                          <p className="font-semibold">{user.username}</p>
                          <p className="text-gray-500 text-sm">Tipo: {user.userType}</p>
                        </div>
                        <div className="flex space-x-4"> {/* Alinhando os botões ao lado */}
                          <button
                            onClick={() =>
                              handleUpdateUserType(user.id, user.userType === "produtor" ? "administrador" : "produtor")
                            }
                            className="bg-[#165a16] hover:bg-[#1f7e1f] rounded-sm text-sm px-4 py-2 text-center text-white transition-all duration-300 ease-in-out"
                          >
                            Alterar
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
        </div>
      </div>
    </div>
  );
}  

export default withAuth(ManageUsers, ["/users-management"]);