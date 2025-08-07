'use client'

import React from 'react';

interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <div className="flex grow bg-neutral-100 p-2 box-border">
        {children}
    </div>
  );
}