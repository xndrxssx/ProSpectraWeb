"use client";

import React, { useState, useEffect } from "react";
import CustomSidebar from "@/components/Sidebar";
import withAuth from "@/components/withAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select, { StylesConfig, Theme, ActionMeta, SingleValue, MultiValue } from "react-select";


interface User {
  id: number;
  username: string;
  userType: string;
}

type OptionType = {
  value: string;
  label: string;
};

function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    userType: "prod",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        toast.info("Carregando usuários...");
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        const response = await fetch(`${apiUrl}/api/users/`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
        toast.success("Usuários carregados com sucesso!");
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro ao carregar usuários.");
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

  const userTypeOptions = [
    { value: "prod", label: "Produtor" },
    { value: "admin", label: "Administrador" },
  ];  

  const validateUserData = () => {
    const { username, password, userType } = newUser;
    if (!username || !password || !userType) {
      toast.warning("Todos os campos devem ser preenchidos.");
      return false;
    }
    return true;
  };

  const handleUserTypeChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (newValue && !Array.isArray(newValue)) {
      const singleValue = newValue as SingleValue<OptionType>;
      // Verificando se o singleValue não é null
      if (singleValue) {
        setNewUser((prev) => ({
          ...prev,
          userType: singleValue.value,
        }));
      }
    }
  };

  const customStyles: StylesConfig<OptionType, boolean> = {
    control: (provided) => ({
      ...provided,
      borderRadius: '0.5rem',
      borderColor: '#e5e7eb',
      padding: '2px',
      boxShadow: 'none',
      "&:hover": {
        borderColor: '#1f7e1f',
      },
    }),
  };
  
  const customTheme = (theme: Theme): Theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#d1fae5',
      primary: '#165a16',
    },
  });  

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateUserData()) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/users/`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        if (data.user) {
          setUsers((prevUsers) => [...prevUsers, data.user]);
          setNewUser({ username: "", password: "", userType: "prod" });
          toast.success("Usuário adicionado com sucesso!");
        } else {
          toast.error("ID do usuário não foi retornado corretamente.");
        }
      } else {
        toast.error(data.error || "Erro ao adicionar usuário.");
      }
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
      toast.error("Erro ao criar o usuário.");
    }
  };

  const handleUpdateUserType = async (userId: number, newUserType: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ userType: newUserType }),
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
        toast.success("Tipo de usuário atualizado com sucesso!");
      } else {
        toast.error(data.error || "Erro ao atualizar o tipo de usuário.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o tipo de usuário:", error);
      toast.error("Erro ao atualizar o tipo de usuário.");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        toast.success("Usuário excluído com sucesso!");
      } else {
        toast.error(data.error || "Erro ao excluir o usuário.");
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast.error("Erro ao excluir o usuário.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-gray-50 to-gray-100"> 
      <CustomSidebar />
      <ToastContainer />
      
      {/* Container principal */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho da página */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4 text-center">Gerenciamento de Usuários</h1>
            <p className="text-center text-sm mb-6">Adicione, edite e gerencie os usuários do sistema</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulário para adicionar usuário */}
            <div className="bg-gray-50 rounded-xl border border-gray-300 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Adicionar Novo Usuário</h2>
              </div>
  
              <form onSubmit={handleAddUser} className="space-y-5">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Usuário
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Digite o nome do usuário"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="Digite a senha"
                  />
                </div>
                
                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Usuário
                  </label>
                  <Select
                    instanceId={"userTypeSelect"}
                    id="userType"
                    name="userType"
                    options={userTypeOptions}
                    value={userTypeOptions.find(option => option.value === newUser.userType)}
                    onChange={handleUserTypeChange}
                    className="basic-single"
                    classNamePrefix="select"
                    styles={customStyles}
                    theme={customTheme}
                    placeholder="Selecione o tipo de usuário"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#208120] transition-all duration-300 ease-in-out"
                >
                  Adicionar Usuário
                </button>
              </form>
            </div>

            {/* Lista de usuários */}
            <div className="bg-[gray-50] rounded-xl border border-gray-300 p-6">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Usuários Cadastrados</h2>
                <span className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {users.length} usuário{users.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="h-96 overflow-y-auto pr-2 space-y-3">
                {users.length > 0 ? (
                  users.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h3 className="font-semibold text-gray-800 mr-3">{user.username}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.userType === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.userType === 'admin' ? 'Administrador' : 'Produtor'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleUpdateUserType(user.id, user.userType === "prod" ? "admin" : "prod")
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          >
                            Alterar
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">Nenhum usuário cadastrado</p>
                    <p className="text-gray-400 text-sm">Adicione o primeiro usuário usando o formulário ao lado</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default withAuth(ManageUsers, ["/users-management"]);