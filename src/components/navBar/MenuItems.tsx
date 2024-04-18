import {
  Home,
  SportsEsports,
  ShoppingCart,
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';

export const menuList = [
  {
    name: 'Home',
    link: '/',
    icon: <Home />,
  },
  {
    name: 'Games',
    link: '/browse/games',
    icon: <SportsEsports />,
  },
];

const MenuItems = () => {
  return (
    <List>
      {menuList.map((item) => (
        <ListItem key={item.name} disablePadding>
          <ListItemButton LinkComponent={Link} href={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem disablePadding>
        <ListItemButton LinkComponent={Link} href='/cart'>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary='Cart' />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default MenuItems;
