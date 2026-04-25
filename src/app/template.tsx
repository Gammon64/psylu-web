import Profile from '@/components/ui/profile';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import React from 'react';

type TemplateProps = {
    children: React.ReactNode;
}
const DefaultTemplate = async ({ children }: TemplateProps) => {
    const session = await auth();
    return (
        <div>
            <nav className='flex justify-between p-4 bg-gray-200 dark:bg-gray-800 font-bold text-lg'>
                <div className='flex gap-4'>
                    <Link href="/dashboard">Home</Link>
                    <Link href="/patients">Pacientes</Link>
                    <Link href="/appointments">Consultas</Link>
                </div>

                {session && <div className='flex gap-4'>
                    <Link href="/profile"><Profile userId={session?.user.id} /></Link>
                    <Link href="/api/auth/signout">Logout</Link>
                </div>}
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}

export default DefaultTemplate