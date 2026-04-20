import Link from 'next/link';
import React from 'react';

type TemplateProps = {
    children: React.ReactNode;
}
const DefaultTemplate = ({ children }: TemplateProps) => {
    return (
        <div>
            <nav className='flex gap-4 p-4 bg-gray-200 dark:bg-gray-800 font-bold text-lg'>
                <Link href="/dashboard">Home</Link>
                <Link href="/patients">Pacientes</Link>
                <Link href="/appointments">Consultas</Link>
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}

export default DefaultTemplate