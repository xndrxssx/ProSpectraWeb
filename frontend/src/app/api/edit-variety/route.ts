import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ajuste o caminho para o seu arquivo de configuração do Prisma
import { Variety } from "@prisma/client"; // Importando o tipo Variety

export async function GET() {
  try {
    // Recupera todas as variedades com o tipo correto
    const varieties = await prisma.variety.findMany();
    // console.log("Variedades encontradas no banco:", varieties);

    // Mapear as variedades para ajustar os atributos
    const varietiesWithAttributes = varieties.map((variety: any) => {
      // Verifica se os atributos são uma string e tenta parsear
      let attributes = [];
      try {
        if (typeof variety.attributes === "string") {
          attributes = JSON.parse(variety.attributes);  // Se for string, tenta fazer o parse
        } else {
          attributes = variety.attributes;  // Caso contrário, assume que já é um array
        }
      } catch (error) {
        console.error("Erro ao fazer parse dos atributos:", error);
        attributes = [];  // Se ocorrer erro, usa um array vazio
      }

      return { ...variety, attributes };
    });

    // console.log("Variedades com atributos:", varietiesWithAttributes);
    return NextResponse.json(varietiesWithAttributes);

  } catch (error) {
    console.error("Erro ao buscar variedades:", error);
    return NextResponse.json({ error: "Erro ao buscar variedades." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.name || !body.description || !body.attributes) {
      return NextResponse.json({ error: "Dados mal formatados ou incompletos." }, { status: 400 });
    }

    const { name, description, attributes } = body;

    // Verifique se os dados recebidos são válidos
    if (!name || !description || !attributes || !Array.isArray(attributes)) {
      return NextResponse.json({ error: "Nome, descrição e atributos são obrigatórios e atributos deve ser um array." }, { status: 400 });
    }

    // Converte os atributos para uma string JSON válida
    const attributesJson = JSON.stringify(attributes);

    const createdVariety = await prisma.variety.create({
      data: {
        name,
        description,
        attributes: attributesJson,  // Armazenando como string JSON
      },
    });

    return NextResponse.json(createdVariety);
  } catch (error: any) {
    console.error("Erro ao criar variedade:", error.message);
    return NextResponse.json({ error: "Erro ao criar variedade." }, { status: 500 });
  }
}


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

    const updatedVariety = await prisma.variety.update({
      where: { id },
      data: {
        name,
        description,
        attributes: JSON.stringify(attributes), // Armazenando como JSON
      },
    });

    return NextResponse.json(updatedVariety);
  } catch (error) {
    console.error("Erro ao editar variedade:", error);
    return NextResponse.json({ error: "Erro ao editar variedade." }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
    try {
      const { id }: { id: number } = await request.json();
      
      await prisma.variety.delete({
        where: { id },
      });
      
      return NextResponse.json({ message: "Variedade deletada com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar variedade:", error);
      return NextResponse.json({ error: "Erro ao deletar variedade." }, { status: 500 });
    }
  }