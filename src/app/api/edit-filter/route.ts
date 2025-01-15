import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajuste o caminho para o seu arquivo de configuração do Prisma

// GET - Recupera todos os filtros
export async function GET() {
  try {
    // Recupera todos os filtros com os atributos corretos
    const filters = await prisma.filter.findMany();

    // Se houver um processamento específico para os atributos, pode ser feito aqui (similar ao exemplo de variedades)
    const filtersWithAttributes = filters.map((filter: any) => {
      let attributes = [];
      try {
        if (typeof filter.attributes === "string") {
          attributes = JSON.parse(filter.attributes);  // Se for string, tenta fazer o parse
        } else {
          attributes = filter.attributes;  // Caso contrário, assume que já é um array
        }
      } catch (error) {
        console.error("Erro ao fazer parse dos atributos:", error);
        attributes = [];  // Se ocorrer erro, usa um array vazio
      }

      return { ...filter, attributes };
    });

    return NextResponse.json(filtersWithAttributes);
  } catch (error) {
    console.error("Erro ao buscar filtros:", error);
    return NextResponse.json({ error: "Erro ao buscar filtros." }, { status: 500 });
  }
}

// POST - Cria um novo filtro
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.name || !body.type || !body.parameters) {
      return NextResponse.json({ error: "Dados mal formatados ou incompletos." }, { status: 400 });
    }

    const { name, type, parameters } = body;

    // Verifique se os dados recebidos são válidos
    if (!name || !type || !parameters ){
      return NextResponse.json({ error: "Nome, descrição e parâmetros são obrigatórios." }, { status: 400 });
    }

    // Converte os atributos para uma string JSON válida
    const parametersJson = JSON.stringify(parameters);

    const createdFilter = await prisma.filter.create({
      data: {
        name,
        type,
        parameters: parametersJson,  // Armazenando como string JSON
      },
    });

    return NextResponse.json(createdFilter);
  } catch (error: any) {
    console.error("Erro ao criar filtro:", error.message);
    return NextResponse.json({ error: "Erro ao criar filtro." }, { status: 500 });
  }
}

// PUT - Atualiza um filtro existente
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    
    if (!body.id || !body.name || !body.description || !body.attributes || !Array.isArray(body.attributes)) {
      return NextResponse.json({ error: "Dados inválidos fornecidos." }, { status: 400 });
    }

    const { id, name, description, attributes }: { id: number, name: string, description: string, attributes: string[] } = body;

    // Verificar se os atributos são do tipo string[] (se necessário)
    const validAttributes = attributes.every(attr => typeof attr === "string");
    if (!validAttributes) {
      return NextResponse.json({ error: "Atributos devem ser strings." }, { status: 400 });
    }

    const updatedFilter = await prisma.filter.update({
      where: { id },
      data: {
        name,
        description,
        attributes: JSON.stringify(attributes), // Armazenando como JSON
      },
    });

    return NextResponse.json(updatedFilter);
  } catch (error) {
    console.error("Erro ao editar filtro:", error);
    return NextResponse.json({ error: "Erro ao editar filtro." }, { status: 500 });
  }
}

// DELETE - Deleta um filtro
export async function DELETE(request: Request) {
  try {
    const { id }: { id: number } = await request.json();
    
    await prisma.filter.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Filtro deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar filtro:", error);
    return NextResponse.json({ error: "Erro ao deletar filtro." }, { status: 500 });
  }
}
