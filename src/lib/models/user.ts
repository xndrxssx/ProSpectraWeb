import { PrismaClient } from '@prisma/client';

// Instância do cliente Prisma
const prisma = new PrismaClient();

// Função para criar um novo usuário
export const createUser = async (username: string, password: string) => {
  const result = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  return result;
};

// Função para buscar todos os usuários
export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
