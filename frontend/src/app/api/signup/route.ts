import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { username, password, userType } = await req.json();

    if (!username || !password || !userType) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 });
    }

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

    // Criar o usuário
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
      { message: "Usuário criado com sucesso", userId: newUser.id },
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
