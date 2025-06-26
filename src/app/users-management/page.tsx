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
        const response = await fetch('/api/users-management');
        const data = await response.json();
        setUsers(data);
        toast.success("Usuários carregados com sucesso!");
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro ao carregar usuários.");
      } finally {
        toast.dismiss();
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
      borderColor: '#d1d5db', // cinza claro
      padding: '2px',
      boxShadow: 'none',
      "&:hover": {
        borderColor: '#1f7e1f', // verde hover
      },
    }),
  };
  
  const customTheme = (theme: Theme): Theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#d1fae5', // verde claro no hover
      primary: '#165a16',   // verde principal
    },
  });  

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <div className="min-h-screen w-full flex bg-[#eaeaea]"> 
      <CustomSidebar />
      <ToastContainer />
      {/* Container principal */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex w-full max-w-4xl">
          {/* Formulário para adicionar usuário */}
          <div className="bg-white/10 w-2/3 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Adicionar Usuário</h2>
  
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
                />
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
                              handleUpdateUserType(user.id, user.userType === "prod" ? "admin" : "prod")
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