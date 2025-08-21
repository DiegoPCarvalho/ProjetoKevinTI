'use client'
import React, { useEffect } from 'react';
import Assinatura from '@/assets/imgs/assinatura.png'
import Image from 'next/image';
import Botao from '../shared/Botao';


interface EmailVisualizadoProps {
    salvar: () => void
    cancelar: () => void
    mudarCampo: (novoValor: string) => void
    buscar: () => void
    valor: string
}

export default function EmailVisualizado(props: EmailVisualizadoProps) {

    useEffect(() => {
        props.buscar()
    }, [])

    return (
        <div>
            <div className='flex flex-col mb-5'>
                <label className='font-bold'>Mensagem e-mail:</label>
                <textarea
                    className='
                    shadow-sm 
                    px-4 py-3 rounded-lg  mt-1 bg-white
                    border border-neutral-700 focus:border-emerald-500 focus:bg-white
                    focus:outline-none 
                    '
                    value={props.valor}
                    onChange={e => props.mudarCampo(e.target.value)}
                    rows={3}
                />
            </div>
            <div className="mb-5">
                <table className='w-full border'>
                    <thead className='bg-neutral-900 text-white'>
                        <tr>
                            <th>Tabela</th>
                        </tr>
                    </thead>
                    <tbody className='flex justify-center'>
                        <tr>
                            <td>...Informações</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Image src={Assinatura} alt="" />
            <div className='flex justify-end'>
                <Botao
                    className={`
                        h-12
                        cursor-pointer transition-all bg-emerald-500 text-white px-3 py-2 rounded-lg
                        border-emerald-600
                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                    `}
                    executar={props.salvar}
                >Salvar</Botao>
                <Botao
                    className={`
                        h-12 ml-3
                        cursor-pointer transition-all bg-red-500 text-white px-3 py-1.5 rounded-lg
                        border-red-600
                        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                    `}
                    executar={props.cancelar}
                >
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}