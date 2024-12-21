"use client";

import React, { useState } from "react";
import CustomSidebar from "@/components/Sidebar";

interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Admin", email: "admin@example.com", permissions: ["Admin"] },
  ]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    permissions: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateUserData = () => {
    const { name, email, password, permissions } = newUser;
    if (!name || !email || !password || !permissions) {
      setError("Todos os campos devem ser preenchidos.");
      return false;
    }
    if (!email.includes("@")) {
      setError("O e-mail fornecido é inválido.");
      return false;
    }
    return true;
  };

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateUserData()) return;

    const newUserEntry: User = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      permissions: newUser.permissions.split(",").map((perm) => perm.trim()),
    };

    setUsers((prevUsers) => [...prevUsers, newUserEntry]);
    setNewUser({ name: "", email: "", password: "", permissions: "" });
    setSuccess("Usuário adicionado com sucesso.");
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      <CustomSidebar /> {/* Sidebar fixa */}
      <div className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-4">Gerenciar Usuários</h1>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Lista de usuários */}
          <div className="bg-white/10 w-full backdrop-blur-sm rounded-lg p-8 shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Usuários Cadastrados</h2>
            {users.length > 0 ? (
              <ul className="space-y-4">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="border-b pb-2 last:border-b-0"
                  >
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                      <p className="text-gray-500 text-sm">
                        Permissões: {user.permissions.join(", ")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Nenhum usuário cadastrado.</p>
            )}
          </div>

          {/* Formulário para adicionar usuário */}
          <div className="bg-white/10 w-full backdrop-blur-sm rounded-lg p-8 shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">Adicionar Usuário</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Senha
                </label>
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
                <label htmlFor="permissions" className="block text-sm font-medium">
                  Permissões (separadas por vírgula)
                </label>
                <input
                  type="text"
                  id="permissions"
                  name="permissions"
                  value={newUser.permissions}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#165a16] text-white py-2 px-4 rounded-lg hover:bg-[#1f7e1f] transition-all"
              >
                Adicionar Usuário
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
