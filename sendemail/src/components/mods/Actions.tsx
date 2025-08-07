'use client'

import React from 'react';
import Botao from '../shared/Botao';
import { IconDataBase, IconKeyToken, IconLetter, IconVisibleEmail } from '../Icons/IconsIndex';

interface ActionsProps {
    gerarToken: () => void;
    visualizar?: () => void;
    ConsultarApi: () => void
}

export default function Actions(props: ActionsProps) {
    return (
        <div className='w-[20%] h-[95%]  rounded-lg flex p-4 justify-center items-center'>
            <div className='h-[70%] flex flex-col justify-around'>
                <Botao
                    className={` flex h-12
                cursor-pointer transition-all bg-emerald-500 text-white px-6 py-3 rounded-lg
                border-emerald-600
                border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
            `}
            executar={props.gerarToken}
                > {IconKeyToken} <span className='ml-2'>Gerar Token</span></Botao>
                <Botao
                    className={` flex h-12
                cursor-pointer transition-all bg-emerald-500 text-white px-6 py-3 rounded-lg
                border-emerald-600
                border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
            `}
                executar={props.ConsultarApi}
                > {IconDataBase} <span className='ml-2'>Consultar API</span></Botao>
                <Botao
                    className={` flex h-12
                cursor-pointer transition-all bg-emerald-500 text-white px-6 py-3 rounded-lg
                border-emerald-600
                border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
            `}
                > {IconLetter} <span className='ml-2'>Enviar E-mails</span></Botao>
                <Botao
                    className={` flex h-12
                cursor-pointer transition-all bg-emerald-500 text-white px-6 py-3 rounded-lg
                border-emerald-600
                border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]
            `} executar={props.visualizar}
                > {IconVisibleEmail} <span className='ml-2'>Visualizar</span></Botao>

            </div>
        </div>
    )
}