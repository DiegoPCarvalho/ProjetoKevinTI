'use client'

import React, { useEffect } from 'react';
import Card from '../shared/Card';

interface CardsProps {
    banco: any
    carregando?: boolean
}

export default function Cards(props: CardsProps) {

    
    return(
        <div id="hiddenScroll" className='w-[80%] flex flex-wrap overflow-auto h-[600px] max-2xl:h-[470px]'>
            {props.banco.map((item: any, index: number) => (
                <Card
                    key={index}
                    nome={item.nome}
                    email={item.email}
                    dados={item.dados}
                />
            ))}
        </div>
    )
}