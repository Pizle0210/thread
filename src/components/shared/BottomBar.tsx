"use client"
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

export default function BottomBar() {
    const router = useRouter()
    const pathName = usePathname()
    return (
        <section className='bottombar '>
            <div className="bottombar_container">
                {
                    sidebarLinks.map((sideLink) => {
                        const isActive = (pathName.includes(sideLink.route) && sideLink.route.length > 1) || pathName === sideLink.route;
                        return (
                            <Link
                                href={sideLink.route}
                                key={sideLink.route}
                                className={` bottombar_link ${isActive && 'bg-primary-500'}`}>
                                <Image src={sideLink.imgURL} alt={sideLink.label} height={24} width={24} />
                                <p className='max-sm:hidden text-subtle-medium text-light-1'>{sideLink.label.split(/\s+/)[0]}</p>
                            </Link>

                        )
                    }
                    )
                }
            </div>
        </section>
    )
}
