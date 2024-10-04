"use client"
import { sidebarLinks } from '@/constants'
import { SignedIn, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'


export default function LeftSidebar() {
    const router = useRouter()
    const pathName = usePathname()
    return (
        <section className='custom-scrollbar leftsidebar'>
            <div className="flex flex-col flex-1 w-full px-6 gap-6 ">
                {
                    sidebarLinks.map((sideLink) => {
                        const isActive = (pathName.includes(sideLink.route) && sideLink.route.length > 1) || pathName === sideLink.route;
                        return (
                            <Link
                                href={sideLink.route}
                                key={sideLink.route}
                                className={` leftsidebar_link ${isActive && 'bg-primary-500'}`}>
                                <Image src={sideLink.imgURL} alt={sideLink.label} height={24} width={24} />
                                <p className='max-lg:hidden text-light-1'>{sideLink.label}</p>
                            </Link>

                        )
                    }
                    )
                }
            </div>
            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton redirectUrl='/sign-in' >
                        <div className="flex cursor-pointer gap-5 p-4">
                            <Image src={'/assets/logout.svg'} alt='logout button' height={24} width={24} />
                            <p className="max-lg:hidden text-light-2">
                                Logout
                            </p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}
