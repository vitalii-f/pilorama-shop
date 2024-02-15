'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeroNavigation, NavLink } from "./Hero.styled"

const HeroNav = () => {
    const pathname = usePathname()
    return (
        <HeroNavigation>
            <ul>
                <li><NavLink href='/' $isActive={pathname === '/'}>Discover</NavLink></li>
                <li><NavLink href='/' $isActive={pathname === '/explore'}>Explore</NavLink></li>
            </ul>
            <ul>
                <li><NavLink href='/' $isActive={pathname === '/collections'}>Collections</NavLink></li>
                <li><NavLink href='/' $isActive={pathname === '/deals'}>Deals</NavLink></li>
                <li><NavLink href='/' $isActive={pathname === '/subscribtions'}>Subscribtions</NavLink></li>
            </ul>
        </HeroNavigation>
    )
}

export default HeroNav