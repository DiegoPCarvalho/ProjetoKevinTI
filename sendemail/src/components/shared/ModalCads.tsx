'use client'

import React, { use, useEffect } from 'react';

interface ModalCadsProps {
    children?: React.ReactNode
    open?: boolean
    close?: () => void
    className?: string
    carregarVendedores: () => void
}

export default function ModalCads(props: ModalCadsProps) {

    useEffect(() => {
        props.carregarVendedores();
    }, [props.open === true])


    return (
        <>
            <div className={`fixed text-neutral-900 inset-0 z-50 flex items-center justify-center bg-neutral-900/50 
                    ${props.open ? "translate-x-0" : "hidden"}
                `} onClick={props.close}>
                <div
                    className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-sky-700 p-2 rounded-t-lg text-xl flex justify-between">
                        <span className="font-bold text-neutral-100">
                            Cadastro Vendedores
                        </span>
                        <button
                            className=" text-xl font-bold cursor-pointer text-neutral-100 hover:text-neutral-300"
                            onClick={props.close}
                        >
                            ✕
                        </button>
    
                    </div>
                    <div className="p-2 overflow-hidden flex flex-col justify-between">
                        {props.children}
                    </div>
                </div>
            </div>

        </>
    )
}