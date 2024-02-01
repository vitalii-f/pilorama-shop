'use client'

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
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styles from './styles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BugReportIcon from '@mui/icons-material/BugReport';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false)

  const handleToggleNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(!open)
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const menuItems = [
    {
      name: 'Home',
      link: '/',
      icon: <HomeIcon />,
    },
    {
      name: 'Products',
      link: '/categories',
      icon: <ShoppingCartIcon />,
    },
    {
      name: 'Test',
      link: '/test',
      icon: <BugReportIcon />,
    },
  ]

  const renderNavBar = () => {
    return (
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <Link href={item.link}><ListItemText primary={item.name} /></Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <AppBar position="static" color='secondary' enableColorOnDark sx={{backgroundColor: 'secondary', height: 'var(--navbar-height)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href='/'><Image src='/logo.svg' width={100} height={100} alt='logo' priority /></Link>
          </Box> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleToggleNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={open}
              sx={{width: '300'}}
              variant="persistent"
              anchor="left"  
            >
              <div className={styles.drawerHeader}>
                <IconButton onClick={handleToggleNavMenu}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              {renderNavBar()}
            </Drawer>
          </Box>
          
          {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: '100%', justifyContent: 'center' }}>
            <Link href='/'><Image src='/logo.svg' width={100} height={100} alt='logo' priority /></Link>
          </Box> */}
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} color='red'>
            {menuItems.map((item) => (
              <Button
                key={item.name}
                onClick={handleToggleNavMenu}
                sx={{ my: 2, display: 'block', color: 'black' }}
              >
                <Link href={item.link}>{item.name}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexGrow: 0, gap: '15px' }}>
            <IconButton sx={{  }}>
              <ShoppingBasketIcon fontSize='large' />
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
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
              // onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}
                // onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
