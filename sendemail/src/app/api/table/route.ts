import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  // 🔽 Pega o token da URL
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token não informado' }, { status: 400 });
  }

  try {
    const url = 'https://graph.microsoft.com/v1.0/sites/3932955e-9618-4862-8aae-5c291379335a/drive/items/0124MTTVZ7OTEADWGGVZEJYV56Z3FQAXRC/workbook/tables/Tabela2/rows'; // substitua com a URL real

    const { data } = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });

    // Aqui vem o processamento que você já criou:
    const dadosIniciais = data.value;
    const dadoFinal: any[] = [];

    dadosIniciais.forEach((resp: any) => {
      resp.values.forEach((resp2: any) => {
        dadoFinal.push(resp2);
      });
    });

    const headers = [
      'CLIENTE', 'EQUIPAMENTO', 'NS', 'QTDA', 'INICIO', 'RETORNO',
      'NF', 'PEDIDO', 'VENDEDOR', 'NFD', 'OBSC'
    ];

    function excelDateToJSDate(serial: number): string {
      const utc_days = Math.floor(serial - 25569);
      const utc_value = utc_days * 86400;
      const date_info = new Date(utc_value * 1000);
      const day = String(date_info.getUTCDate()).padStart(2, '0');
      const month = String(date_info.getUTCMonth() + 1).padStart(2, '0');
      const year = date_info.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }

    const result = dadoFinal.map(row => {
      return headers.reduce((obj: any, header, index) => {
        obj[header] =
          header === 'INICIO' || header === 'RETORNO'
            ? excelDateToJSDate(row[index])
            : row[index];
        return obj;
      }, {});
    });

    const dadoFiltrado = result.filter(
      resp =>
        resp.VENDEDOR !== '-' &&
        resp.VENDEDOR !== '' &&
        resp.VENDEDOR.trim() !== ''
    );

    return NextResponse.json(dadoFiltrado);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Erro ao buscar dados', detalhe: error.message },
      { status: 500 }
    );
  }
}