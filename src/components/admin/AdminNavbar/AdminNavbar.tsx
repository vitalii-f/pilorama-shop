'use client';

import { NavLink, NavLinks } from './AdminNavbar.styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Storage,
  Leaderboard,
  Tune,
  PeopleAltSharp,
} from '@mui/icons-material';

const navItems = [
  {
    name: 'Dashboard',
    link: '/admin/dashboard',
    icon: <Leaderboard fontSize='large' />,
  },
  {
    name: 'Collections',
    link: '/admin/collections',
    icon: <Storage fontSize='large' />,
  },
  {
    name: 'Users',
    link: '/admin/users',
    icon: <PeopleAltSharp fontSize='large' />,
  },
  {
    name: 'Settings',
    link: '/admin/settings',
    icon: <Tune fontSize='large' />,
  },
];

const AdminNavbar = () => {
  const pathname = usePathname();
  return (
    <nav>
      <NavLinks>
        {navItems.map((item) => (
          <NavLink
            $isActive={
              pathname.includes(item.name.toLowerCase()) ? 'active' : 'unactive'
            }
            key={item.name}
          >
            <Link href={item.link} title={item.name}>
              {item.icon}
            </Link>
          </NavLink>
        ))}
      </NavLinks>
    </nav>
  );
};

export default AdminNavbar;
