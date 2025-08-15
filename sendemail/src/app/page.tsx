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

export default function Home() {

  const [token, setToken] = useState<string | null>(null);
  const [banco, setBanco] = useState<any>([]);
  const [openCads, setOpenCads] = useState<boolean>(false);
  const [vendedores, setVendedores] = useState<any>([]);
  const [formVendedores, setFormVendedores] = useState<FormCadsVendedor>(initialFormCadsVendedorDefault)
  const [carregando, setCarregando] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  async function carregarVendedores() {
    try {
      const { data } = await axios.get('/api/vendedores');
      setVendedores(data);
    } catch (error) {
      console.error('Erro ao carregar vendedores:', error);
      toast.error('Erro ao carregar vendedores');
    }
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

        const dadosPessoais = await axios.get('/api/vendedores').then(res => res.data);

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

  async function salvarVendedor() {
    try {
      if (formVendedores.nome === '' || formVendedores.email === '') {
        toast.error('Preencha todos os campos!');
        return;
      }

      await axios.post('/api/vendedores', formVendedores).then(res => {
        const banco = atualizarlistaVendedores(res.data);
        setVendedores(banco);
      });

      toast.success('Vendedor salvo com sucesso!');
      // carregarVendedores(); // Atualiza lista
      limparVendedor(); // Limpa formulário
    } catch (error) {
      console.error('Erro ao salvar vendedor:', error);
      toast.error('Erro ao salvar vendedor');
    }
  }

  async function editarVendedor() {
    try {
      await axios.put('/api/vendedores', formVendedores).then(res => {
        const banco = atualizarlistaVendedores(res.data);
        setVendedores(banco);
      });
      toast.success('Vendedor atualizado!');
      // carregarVendedores();
      setEdit(false);
      limparVendedor();
    } catch (error) {
      console.error('Erro ao editar vendedor:', error);
      toast.error('Erro ao editar vendedor');
    }
  }

  function loadVendedor(vendedor: FormCadsVendedor) {
    setFormVendedores(vendedor);
    setEdit(true);
    atualizarlistaVendedoresLoad(vendedor, false);
  }

  async function excuirVendedor(vendedor: FormCadsVendedor) {
    try {
      await axios.delete('/api/vendedores', { data: { id: vendedor.id } }).then(res => {
        const list = atualizarlistaVendedores(vendedor, false)
        setVendedores(list)
      });
      toast.success('Vendedor excluído!');
      // carregarVendedores();
    } catch (error) {
      console.error('Erro ao excluir vendedor:', error);
      toast.error('Erro ao excluir vendedor');
    }
  }

  function limparVendedor() {
    return setFormVendedores(initialFormCadsVendedorDefault);
  }

  function atualizarlistaVendedores(vendendor: FormCadsVendedor, add = true) {
    const list = vendedores.filter((v: FormCadsVendedor) => v.id !== vendendor.id);
    if (add) list.push(vendendor);
    return list
  }

  function atualizarlistaVendedoresLoad(vendendor: FormCadsVendedor, add = true) {
    const list = vendedores.filter((v: FormCadsVendedor) => v.id !== vendendor.id);
    if (add) list.push(vendendor);
    setVendedores(list)
  }

  function enviarTodosEmails() {
    try {
      console.log(banco)
      if (banco.length === 0) {
        toast.error('Nenhum dado para enviar e-mail!')
        return;
      }
    } catch (error: any) {

    }
  }

  function enviarEmailVendedor(dados: any) {
    try {
      console.log(dados)
    } catch (error: any) {

    }
  }

  return (
    <Layout>
      <Cards enviar={enviarEmailVendedor} banco={banco} carregando={carregando} />
      <Actions enviarAllEmails={enviarTodosEmails} gerarToken={gerarToken} ConsultarApi={ConsultarApi} cadastrar={abrirFecharCads} />
      <ModalCads carregarVendedores={carregarVendedores} open={openCads} close={abrirFecharCads}>
        <FormularioCadastroVendedor limparVendedor={limparVendedor} formVendedores={formVendedores} setFormVendedores={setFormVendedores} salvarVendedor={edit ? editarVendedor : salvarVendedor} />
        <TabelaVendedor excluirVendedor={excuirVendedor} vendedores={vendedores} editarVendedor={loadVendedor} />
      </ModalCads>
    </Layout>
  );
}