'use client'

import Actions from '@/components/mods/Actions';
import Cards from '@/components/mods/Cards';
import Layout from '@/components/template/Layout';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ModalCads from '@/components/shared/ModalCads';
import FormularioCadastroVendedor from '@/components/shared/Formulario';
import TabelaVendedor from '@/components/shared/TabelaVendedores';
import { FormCadsVendedor, initialFormCadsVendedorDefault } from '@/interfaces/FormCadsVendedor';
import { buscarLocal, salvarLocal } from '@/functions/Localstorage';

export default function Home() {

  const [token, setToken] = useState<string | null>(null);
  const [banco, setBanco] = useState<any>([]);
  const [openCads, setOpenCads] = useState<boolean>(false);
  const [vendedores, setVendedores] = useState<any>([]);
  const [formVendedores, setFormVendedores] = useState<FormCadsVendedor>(initialFormCadsVendedorDefault)
  const [carregando, setCarregando] = useState<boolean>(false);

  function carregarVendedores() {
    const vendedoresLocal = buscarLocal('vendedores') || [];
    return setVendedores(vendedoresLocal);
  }


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

  const abrirFecharCads = () => setOpenCads(!openCads);

  async function ConsultarApi() {
    try {
      setCarregando(true);

      if (token !== null) {
        const { data } = await axios.get(`/api/table?token=${token}`)

        const dadosPessoais = buscarLocal('vendedores') || [];

        const resultado = dadosPessoais.map((pessoa: any) => {
          const dadosDoVendedor = data.filter(
            (item: any) => item.VENDEDOR === pessoa.nome
          );

          return {
            ...pessoa,
            dados: dadosDoVendedor,
          };
        });

        console.log(resultado);
        console.log(data);

        setBanco(resultado);
        setCarregando(false);

        toast.success('Dados obtidos com sucesso!');
      } else {
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
    } finally {
      setCarregando(false);
    }
  }

  function salvarVendedor() {
    try {
      if (formVendedores.nome === '' || formVendedores.email === '') {
        return;
      } else {

        const vendedoresLocal = buscarLocal('vendedores') || [];

        const id: number = Math.floor(Math.random() * 1635255454);

        formVendedores.id = id;

        vendedoresLocal.push(formVendedores);

        salvarLocal('vendedores', vendedoresLocal);

        setVendedores(vendedoresLocal);

        limparVendedor()
      }
    } catch (error: any) {
      console.log("Preencha os Campos")
    }
  }

  function editarVendedor(vendedor: FormCadsVendedor) {
    setFormVendedores(vendedor);
    const vendedoresLocal = buscarLocal('vendedores') || [];
    const atualizarLista = vendedoresLocal.filter((v: FormCadsVendedor) => v.id !== vendedor.id);
    salvarLocal('vendedores', atualizarLista);
    setVendedores(atualizarLista);
  }

  function excuirVendedor(vendedor: FormCadsVendedor) {
    const vendedoresLocal = buscarLocal('vendedores') || [];
    const atualizarLista = vendedoresLocal.filter((v: FormCadsVendedor) => v.id !== vendedor.id);
    salvarLocal('vendedores', atualizarLista);
    setVendedores(atualizarLista);
  }

  function limparVendedor() {
    return setFormVendedores(initialFormCadsVendedorDefault);
  }

  function enviarTodosEmails(){
    try{ 
      console.log(banco)
      if(banco.length === 0){
        toast.error('Nenhum dado para enviar e-mail!')
        return;
      }
    }catch(error:any){
      
    }
  }

  function enviarEmailVendedor(dados: any){
    try{ 
      console.log(dados)
    }catch(error:any){

    }
  }



  return (
    <Layout>
      <Cards enviar={enviarEmailVendedor} banco={banco} carregando={carregando}/>
      <Actions enviarAllEmails={enviarTodosEmails} gerarToken={gerarToken} ConsultarApi={ConsultarApi} cadastrar={abrirFecharCads} />
      <ModalCads carregarVendedores={carregarVendedores} open={openCads} close={abrirFecharCads}>
        <FormularioCadastroVendedor limparVendedor={limparVendedor} formVendedores={formVendedores} setFormVendedores={setFormVendedores} salvarVendedor={salvarVendedor} />
        <TabelaVendedor excluirVendedor={excuirVendedor} vendedores={vendedores} editarVendedor={editarVendedor} />
      </ModalCads>
    </Layout>
  );
}