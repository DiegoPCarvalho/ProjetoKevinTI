'use client'

import React from 'react';
import { IconLetter, IconUserVendedor, IconCog, IconSend } from '../Icons/IconsIndex';
import Botao from './Botao';

interface CardProps {
    nome?: string;
    email?: string;
    dados?: any;
    enviar?: () => void;
}

export default function Card(props: CardProps) {
    return (
        <div className=' flex m-2 flex-col w-86 h-32 bg-sky-500 rounded-xl text-white font-bold'>
            <div className='flex flex-col justify-around h-full p-4'>
                <div className='flex'>
                    <span className='flex'>{IconUserVendedor}:</span>
                    <span className='ml-2'>{props.nome}</span>
                </div>
                <div className='flex mt-2'>
                    <span className='flex'>{IconLetter}:</span>
                    <span className='ml-2'>{props.email}</span>
                </div>
                <div className='flex justify-between mt-2'>
                    <div className='flex'>
                        <span className='flex'>{IconCog}:</span>
                        <span className='ml-2'>{props.dados?.length}</span>
                    </div>
                    <div className=''>
                        <Botao
                            className={` h-10
                                cursor-pointer transition-all bg-emerald-500 text-white px-2 py-1 rounded-lg
                                border-emerald-600
                                border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
                            `}
                            executar={props.enviar}
                        > {IconSend}</Botao>
                    </div>
                </div>
            </div>
        </div>
    )
}