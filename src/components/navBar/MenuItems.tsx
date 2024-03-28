import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';

export const menuList = [
  {
    name: 'Home',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    name: 'Games',
    link: '/browse/games',
    icon: <SportsEsportsIcon />,
  },
];

const MenuItems = () => {
  return (
    <List>
      {menuList.map((item) => (
        <ListItem key={item.name} disablePadding>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Link href={item.link}>
              <ListItemText primary={item.name} />
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <Link href='/cart'>
            <ListItemText primary='Cart' />
          </Link>
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default MenuItems