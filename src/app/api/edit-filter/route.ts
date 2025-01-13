import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { FilterConfig } from '@/types/Filter';

// Criar filtro
export async function POST(req: Request) {
  try {
    const body: FilterConfig = await req.json();
    const client = await clientPromise;
    const db = client.db('spectroscopy');
    const collection = db.collection('filters');

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Erro ao salvar filtro:', error);
    return NextResponse.json({ success: false, error: 'Erro ao salvar filtro' });
  }
}

// Listar filtros
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('spectroscopy');
    const collection = db.collection('filters');
    
    const filters = await collection.find({}).toArray();
    return NextResponse.json({ success: true, filters });
  } catch (error) {
    console.error('Erro ao acessar os filtros:', error);
    return NextResponse.json({ success: false, error: 'Erro ao acessar os filtros' });
  }
}

// Deletar filtro
export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db('spectroscopy');
    const collection = db.collection('filters');
    
    const result = await collection.deleteOne({ _id: new Object(id) });
    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Filtro não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir filtro:', error);
    return NextResponse.json({ success: false, error: 'Erro ao excluir filtro' });
  }
}