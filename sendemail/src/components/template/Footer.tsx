'use client'

import React from 'react';
import logoDev from "@/assets/imgs/logo.png"
import Image from "next/image"


export default function Footer() {
    return (
        <footer className="bg-white z-40 flex w-screen justify-end items-center p-2 shadow-2xl shadow-black">
            <div className='flex justify-end'>
                Copyright© Desenvolvido pela
            </div>
            <Image src={logoDev} alt="www.zhaz.com.br" className="rounded-lg w-10 h-6"/>
        </footer>
    )
}