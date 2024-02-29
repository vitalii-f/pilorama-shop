'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { HeaderDrawer, MenuLink } from './Navbar.styled';
import { User } from '@supabase/supabase-js';
import { logout } from './action';
import Searchbar from './Searchbar';
import ThemeSwitcher from './ThemeSwitcher';

function NavBar({
  user,
  avatarURL,
  role,
  cartItems,
}: {
  user: User | null;
  avatarURL?: string | null;
  role: string;
  cartItems?: number | null;
}) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = React.useState<boolean>(false);

  const handleToggleNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(!open);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuItems = [
    {
      name: 'Home',
      link: '/',
      icon: <HomeIcon />,
    },
    {
      name: 'Games',
      link: '/browse/games',
      icon: <ShoppingCartIcon />,
    },
  ];

  const renderNavBar = () => {
    return (
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Link href={item.link}>
                <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <AppBar
      position='static'
      color='secondary'
      enableColorOnDark
      sx={{
        backgroundColor: 'secondary',
        height: 'var(--navbar-height)',
        width: '100%',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href='/'><Image src='/logo.svg' width={100} height={100} alt='logo' priority /></Link>
          </Box> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleToggleNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={open}
              sx={{ width: '300' }}
              variant='persistent'
              anchor='left'
            >
              <HeaderDrawer>
                <IconButton onClick={handleToggleNavMenu}>
                  <ChevronLeftIcon />
                </IconButton>
              </HeaderDrawer>
              {renderNavBar()}
            </Drawer>
          </Box>

          {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: '100%', justifyContent: 'center' }}>
            <Link href='/'><Image src='/logo.svg' width={100} height={100} alt='logo' priority /></Link>
          </Box> */}

          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            color='red'
          >
            {menuItems.map((item, index) => (
              <Button
                key={item.name + index}
                onClick={handleToggleNavMenu}
                sx={{ my: 2, display: 'block', color: 'black' }}
              >
                <Link href={item.link}>{item.name}</Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Searchbar />
            <IconButton href='/cart'>
              <Badge badgeContent={cartItems} color='primary'>
                <ShoppingBasketIcon fontSize='large' color='primary' />
              </Badge>
            </IconButton>
            <ThemeSwitcher />
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open menu'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt='Remy Sharp'
                    src={avatarURL ? avatarURL : undefined}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                disableScrollLock={true}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography width='100%'>
                    <MenuLink href='/profile'>Profile</MenuLink>
                  </Typography>
                </MenuItem>
                {role === 'admin' && (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography width='100%'>
                      <MenuLink href='/admin'>Admin Menu</MenuLink>
                    </Typography>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={async () => {
                    handleCloseUserMenu();
                    await logout();
                  }}
                >
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link href='/login'>Login</Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
