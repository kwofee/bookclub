"use client"

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import DarkModeToggle from './ui/DarkModeToggle';
import LogoutButton from './LogoutButton';
import { useSidebar } from './ui/sidebar';
import { SidebarTrigger } from './ui/sidebar';
import clsx from 'clsx';

function Header() {
    const { open: isOpen } = useSidebar();
    const user = 1; // this is for conditional rendering in the header based on 
    // if the user is logged in or not
    return (
        <header
        className={clsx(
            'bg-popover z-30 flex h-24 items-center justify-between px-3 sm:px-8 transition-all duration-300',
        )}
        >
        <div className="flex items-center gap-2">
            
            <SidebarTrigger />

            <Link className="flex items-end" href="/">
            <Image src="/reading-book.png" alt="logo" width={60} height={60} priority />
            <h1 className="flex flex-col pb-1 pl-2 text-2xl font-semibold leading-6">
                Book <span>Club</span>
            </h1>
            </Link>
        </div>

            <div className='flex gap-4'>
                {user ? (
                   <LogoutButton />
                ):
                (
                    <>
                    <Button asChild>
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    </>
                    
                )
            }
            <DarkModeToggle />
            </div>

            
        </header>
    )
};

export default Header;