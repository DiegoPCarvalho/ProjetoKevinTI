import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const tenantId = process.env.TENANT_ID;

    const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

      
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId || '');
    params.append('client_secret', clientSecret || '');
    params.append('scope', 'https://graph.microsoft.com/.default');

    const { data } = await axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('Erro ao acessar API:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Erro ao buscar token', detalhe: error.message },
      { status: 500 }
    );
  }
}