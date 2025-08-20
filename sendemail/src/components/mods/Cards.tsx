'use client'

import React, { useEffect } from 'react';
import Card from '../shared/Card';
import CircularProgress from '@mui/material/CircularProgress';
interface CardsProps {
    banco: any
    carregando?: boolean
    enviar?: (banco: any) => void
}

export default function Cards(props: CardsProps) {

    return (
        <div id="hiddenScroll"  className={`w-[80%] flex ${props.carregando ? 'justify-center' : 'flex-wrap'} overflow-auto h-[600px] max-xl:h-[470px] items-center`}>
            {props.carregando ? (
                <div className='flex flex-col justify-center items-center'>
                    <CircularProgress color={'success'} size={350} />
                    <div className='mt-5 font-bold'>Carregando Dados...</div>
                </div>
            ) :
                props.banco.map((item: any, index: number) => (
                    <Card
                        key={index}
                        nome={item.nome}
                        email={item.email}
                        dados={item.dados}
                        enviar={() => props.enviar!(item)}
                    />
                ))}
        </div>
    )
}