'use client'

import Link from "next/link"
import styles from './styles.module.css'
import { usePathname } from "next/navigation"

const HeroNav = () => {
    const pathname = usePathname()
    return (
        <nav className={styles.hero__nav}>
            <ul>
                <li><Link href='/' className={pathname === '/' ? styles['link-active'] : styles.link}>Discover</Link></li>
                <li><Link href='/' className={pathname === '/explore' ? styles['link-active'] : styles.link}>Explore</Link></li>
            </ul>
            <ul>
                <li><Link href='/' className={pathname === '/collections' ? styles['link-active'] : styles.link}>Collections</Link></li>
                <li><Link href='/' className={pathname === '/deals' ? styles['link-active'] : styles.link}>Deals</Link></li>
                <li><Link href='/' className={pathname === '/subscriptions' ? styles['link-active'] : styles.link}>Subscriptions</Link></li>
            </ul>
        </nav>
    )
}

export default HeroNav