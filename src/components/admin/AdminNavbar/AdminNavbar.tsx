'use client';

import { NavLink, NavLinks } from './AdminNavbar.styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StorageIcon from '@mui/icons-material/Storage';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PeopleIcon from '@mui/icons-material/People';
import TuneIcon from '@mui/icons-material/Tune';

const navItems = [
  {
    name: 'Dashboard',
    link: '/admin/dashboard',
    icon: <LeaderboardIcon fontSize='large' />,
  },
  {
    name: 'Collections',
    link: '/admin/collections',
    icon: <StorageIcon fontSize='large' />,
  },
  {
    name: 'Users',
    link: '/admin/users',
    icon: <PeopleIcon fontSize='large' />,
  },
  {
    name: 'Settings',
    link: '/admin/settings',
    icon: <TuneIcon fontSize='large' />,
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
            <Link href={item.link} title={item.name} >{item.icon}</Link>
          </NavLink>
        ))}
      </NavLinks>
    </nav>
  );
};

export default AdminNavbar;
