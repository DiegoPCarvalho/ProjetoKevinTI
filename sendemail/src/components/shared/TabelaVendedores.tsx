'use client'

import { FormCadsVendedor } from '@/interfaces/FormCadsVendedor';
import React from 'react';
import Botao from './Botao';
import { IconDel, IconEdit } from '../Icons/IconsIndex';

interface TabelaVendedorProps {
    vendedores?: any[]
    editarVendedor?: (vendedor: FormCadsVendedor) => void;
    excluirVendedor?: (vendedor: FormCadsVendedor) => void;
}

export default function TabelaVendedor(props: TabelaVendedorProps) {

    function intercalado(i: number) {
        let resultado = i % 2

        return resultado === 1 ? "bg-neutral-400 text-white" : "text-black"
    }

    function renderRows() {
        return props.vendedores?.map((vendedor: any, index: number) => {
            return (
                <tr key={vendedor.id} className={`${intercalado(index)} flex text-center p-2`}>
                    <td className='grow'>{vendedor.nome}</td>
                    <td className='grow'>{vendedor.email}</td>
                    <td className=''>
                        <div className='flex justify-between items-center'>
                            <Botao
                                className={`
                            h-10
                            cursor-pointer transition-all bg-emerald-500 text-white px-2 py-1 rounded-lg
                            border-emerald-600
                            border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                        `}
                            executar={() => props.editarVendedor?.(vendedor)}
                            >{IconEdit}</Botao>
                            <Botao
                                className={`
                        h-10 ml-3
                        cursor-pointer transition-all bg-red-500 text-white px-3 py-1.5 rounded-lg
                        border-red-600
                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                    `}      executar={() => props.excluirVendedor?.(vendedor)}
                            >
                                {IconDel}
                            </Botao>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className="border-2 border-neutral-700 p-1 mt-5 rounded-lg">
            <table className='w-full text-white font-bold'>
                <thead className='bg-neutral-900 text-lg'>
                    <tr className=''>
                        <th className='rounded-tl-lg p-2'>Vendedores</th>
                    </tr>
                </thead>
                <tbody className='block max-h-72 overflow-y-auto w-full'>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}