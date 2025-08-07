'use client'

import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children} : LayoutProps) {
    return(
        <div className='flex flex-col w-screen h-screen'>
            <Header />
            <Content>
                {children}
            </Content>
            <Footer />
        </div>
    )
}