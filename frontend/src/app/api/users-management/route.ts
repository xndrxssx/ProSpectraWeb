import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para lidar com a requisição GET (buscar todos os usuários)
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar usuários' }, { status: 500 });
  }
}

// Função para lidar com a requisição PUT (atualizar permissões de um usuário)
export async function PUT(req: Request) {
  try {
    const { id, userType } = await req.json();

    if (!id || !userType) {
      return NextResponse.json({ error: 'ID e tipo de usuário são obrigatórios' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { userType },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar o usuário' }, { status: 500 });
  }
}

// Função para lidar com a requisição POST (criar um novo usuário com senha criptografada)
export async function POST(req: Request) {
    try {
      const { username, password, userType } = await req.json();
  
      if (!username || !password || !userType) {
        return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
      }
  
      // Criptografar a senha usando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Verificar se o usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
  
      if (existingUser) {
        return NextResponse.json(
          { error: "O nome de usuário já está em uso" },
          { status: 400 }
        );
      }
  
      // Criar o usuário com a senha criptografada
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          userType,
        },
        select: {
            id: true, // Garante que o ID seja retornado
            username: true,
            password: true,
            userType: true,
          }
      });
  
      return NextResponse.json(
        { message: "Usuário criado com sucesso", user: newUser },
        { status: 201 }
      );
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return NextResponse.json(
        { error: "Erro interno do servidor" },
        { status: 500 }
      );
    }
  }  

// Função para lidar com a requisição DELETE (apagar um usuário)
export async function DELETE(req: Request) {
    try {
      const { id } = await req.json();
  
      if (!id) {
        return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 });
      }
  
      // Verificar se o usuário existe
      const user = await prisma.user.findUnique({
        where: { id },
      });
  
      if (!user) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }
  
      // Deletar o usuário
      await prisma.user.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
    }
  }
