'use client'

import Actions from '@/components/mods/Actions';
import Cards from '@/components/mods/Cards';
import Layout from '@/components/template/Layout';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const dadosPessoais = [
  {nome: "PAULA POLEDESNIK", email: "paula.polesdenik"}
]

export default function Home() {

  const [token, setToken] = useState<string | null>(null);
  const [banco, setBanco] = useState<any>([]);

  async function gerarToken() {
    try {
      const { data } = await axios.post('/api/token')

      setToken(`${data.token_type} ${data.access_token}`);
      toast.success('Token Gerado com Sucesso!');

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Erro na requisição Axios:', error.message);
        toast.error('Erro ao gerar token');
      } else {
        console.error('Erro inesperado:', error);
        toast.error('Erro inesperado ao gerar token');
      }
    }
  }

  async function ConsultarApi() {
    try {

      if (token !== null) {
        const { data } = await axios.get(`/api/table?token=${token}`)

        // setBanco(data);

        // const resultado = dadosPessoais.map(pessoa => {
        //   const dadosDoVendedor = dadosApi.filter(
        //     item => item.VENDEDOR === pessoa.nome
        //   );
        
        //   return {
        //     ...pessoa,
        //     dados: dadosDoVendedor,
        //   };
        // });
        
        // console.log(resultado);

        console.log(data);

        toast.success('Dados obtidos com sucesso!');
      }else {
        toast.error('Por favor, gere um token primeiro!');
        return;
      }

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Erro na requisição Axios:', error.message);
        toast.error('Erro ao consultar a API');
      } else {
        console.error('Erro inesperado:', error);
        toast.error('Erro inesperado ao consultar a API');
      }
    }
  }

  return (
    <Layout>
      <Cards banco={banco}/>
      <Actions gerarToken={gerarToken} ConsultarApi={ConsultarApi} />
    </Layout>
  );
}