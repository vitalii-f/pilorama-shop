'use client';

import { ChevronLeft, Menu } from '@mui/icons-material';
import { Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import { HeaderDrawer } from './Navbar.styled';
import MenuItems from './MenuItems';

const MobileMenu = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleNavMenu = (_event: React.MouseEvent<HTMLElement>) => {
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
        <Menu />
      </IconButton>
      <Drawer
        open={open}
        sx={{ width: '300' }}
        variant='persistent'
        anchor='left'
      >
        <HeaderDrawer>
          <IconButton onClick={handleToggleNavMenu}>
            <ChevronLeft />
          </IconButton>
        </HeaderDrawer>
        <MenuItems />
      </Drawer>
    </>
  );
};

export default MobileMenu;
