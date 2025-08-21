import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { Vendedor } from '@/functions/typeVendendor';


const filePath = path.join(process.cwd(), 'src', 'db', 'vendedores.json');

function readData(): Vendedor[] {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function writeData(data: Vendedor[]) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data, { status: 200 });
      } catch (error: any) {
        return NextResponse.json({ error: 'Erro ao ler os dados' }, { status: 500 });
      }
}

export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const { nome, email } = body;
  
      if (!nome || !email) {
        return NextResponse.json({ error: 'Nome e email são obrigatórios' }, { status: 400 });
      }
  
      const data = readData();
      const novo: Vendedor = {
        id: Date.now(),
        nome,
        email,
      };
  
      data.push(novo);

      writeData(data);
  
      return NextResponse.json(novo, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: 'Erro ao adicionar vendedor' }, { status: 500 });
    }
  }

  export async function PUT(request: NextRequest) {
    try {
      const { id, nome, email } = await request.json();
      if (!id || !nome || !email) {
        return NextResponse.json({ error: 'ID, nome e email são obrigatórios' }, { status: 400 });
      }
  
      const data = readData();
      const index = data.findIndex((v) => v.id === id);
  
      if (index === -1) {
        return NextResponse.json({ error: 'Vendedor não encontrado' }, { status: 404 });
      }
  
      data[index] = { id, nome, email };
      writeData(data);
  
      return NextResponse.json(data[index], { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: 'Erro ao atualizar vendedor' }, { status: 500 });
    }
  }


  export async function DELETE(request: NextRequest) {
    try {
      const { id } = await request.json();
  
      if (!id) {
        return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
      }
  
      const data = readData();
      const novoData = data.filter((v) => v.id !== id);
  
      if (novoData.length === data.length) {
        return NextResponse.json({ error: 'Vendedor não encontrado' }, { status: 404 });
      }
  
      writeData(novoData);
  
      return NextResponse.json({ message: 'Vendedor removido com sucesso' }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: 'Erro ao deletar vendedor' }, { status: 500 });
    }
  }