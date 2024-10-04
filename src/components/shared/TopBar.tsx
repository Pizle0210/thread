"use client"
import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function TopBar() {
    return (
        <nav className='topbar'>
            <Link href='/' className='flex items-center gap-4'>
                <Image src={'/logo.svg'} alt='logo' width={30} height={30} quality={80} priority />
                <p className='text-heading3-bold text-light-1 max-sm:hidden'>Threads </p>
            </Link>
            <div className="flex items-center gap-1">
                <div className="block md:hidden">
                     
                </div>
                <OrganizationSwitcher appearance={{
                    baseTheme:dark, 
                    elements: {
                        organizationalSwitherTrigger: "py-6 px-4"
                    }
                }} />
            </div>
        </nav>
    )
}
