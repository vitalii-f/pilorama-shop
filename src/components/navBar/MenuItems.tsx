import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
          <ListItemButton LinkComponent={Link} href={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem disablePadding>
        <ListItemButton LinkComponent={Link} href='/cart'>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary='Cart' />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default MenuItems;
