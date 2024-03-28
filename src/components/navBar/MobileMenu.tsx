'use client'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import { HeaderDrawer } from './Navbar.styled';
import MenuItems from './MenuItems';

const MobileMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(!open);
  };
  
  return (
    <>
      <IconButton
        size='large'
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
        <MenuItems />
      </Drawer>
    </>
  );
};

export default MobileMenu;
