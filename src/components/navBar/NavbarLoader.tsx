import { AppBar, Box, Container, Skeleton, Toolbar } from '@mui/material';
import React from 'react';
import DesktopMenu from './DesktopMenu';
import Searchbar from './Searchbar';

const NavbarLoader = () => {
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
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            color='red'
          >
            <DesktopMenu />
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              m: { xs: 1 },
              flexGrow: { xs: 100, md: 0 },
            }}
          >
            <Searchbar />

            <Skeleton
              variant='circular'
              width={30}
              height={30}
              sx={{ bgcolor: 'GrayText' }}
            />
          </Box>
          <Skeleton
            variant='circular'
            width={30}
            height={30}
            sx={{ bgcolor: 'GrayText' }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarLoader;
