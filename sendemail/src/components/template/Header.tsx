'use client'

import React from 'react';
import Image from "next/image"
import logo from "@/assets/imgs/logoZhaz.png"


export default function Header() {
    return (
        <div className="bg-neutral-700 z-40 flex justify-center w-screen shadow-2xl p-[5px]">
            <Image src={logo} alt="zhaz_solucoes" className=" rounded-xl w-56 flex justify-center items-center" />
        </div>
    )
}