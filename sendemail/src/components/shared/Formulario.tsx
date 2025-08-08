'use client'

import { FormCadsVendedor } from '@/interfaces/FormCadsVendedor';
import React from 'react';
import Botao from './Botao';
import { IconBrush, IconSave } from '../Icons/IconsIndex';

interface FormVendedoresProps {
    formVendedores: FormCadsVendedor;
    setFormVendedores: (form: FormCadsVendedor) => void;
    salvarVendedor: () => void;
    limparVendedor: () => void;
}

export default function FormularioCadastroVendedor(props: FormVendedoresProps) {
    return (
        <form action="javascript:myFunction(); return false;">
            <div className='flex justify-between w-full'>
                <div>
                    <label htmlFor="nome" className='text-lg font-bold'>Nome: </label>
                    <input
                        type="text"
                        name='nome'
                        value={props.formVendedores?.nome}
                        onChange={(e) => props.setFormVendedores({...props.formVendedores, nome: e.target.value})} // essa linha esta com erro
                        placeholder='Digite seu nome'
                        className='w-full h-10 px-2 border rounded-lg focus:outline-none focus:border-emerald-500'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className='text-lg font-bold'>E-mail: </label>
                    <input
                        type="text"
                        name='email'
                        value={props.formVendedores?.email}
                        onChange={(e) => props.setFormVendedores({...props.formVendedores, email: e.target.value})}
                        placeholder='Digite seu e-mail'
                        className='w-full h-10 px-2 border rounded-lg focus:outline-none focus:border-emerald-500'
                        required
                    />
                </div>
                <div className='flex justify-between items-end'>
                    <Botao
                        className={`
                            h-12
                            cursor-pointer transition-all bg-emerald-500 text-white px-3 py-2 rounded-lg
                            border-emerald-600
                            border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                        `}
                        executar={props.salvarVendedor}
                    >{IconSave}</Botao>
                    <Botao
                        className={`
                        h-12 ml-3
                        cursor-pointer transition-all bg-red-500 text-white px-3 py-1.5 rounded-lg
                        border-red-600
                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                    `}
                    executar={props.limparVendedor}
                    >
                        {IconBrush}
                    </Botao>
                </div>
            </div>
        </form>
    )
}
