import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Badge, Container } from '@mui/material';
import Link from 'next/link';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Searchbar from './Searchbar';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import UserMenu from './UserMenu';
import { fetchCartCount, fetchUser } from '../services/user';

async function NavBar() {
  const user = await fetchUser()
  const cartItemsCount = await fetchCartCount()

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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MobileMenu />
          </Box>

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

            {user && (
              <IconButton
                href='/cart'
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                <Badge badgeContent={cartItemsCount} color='primary'>
                  <ShoppingBasketIcon fontSize='large' color='primary' />
                </Badge>
              </IconButton>
            )}
          </Box>
          {user ? (
            <UserMenu avatarURL={user.avatar} role={user.role} />
          ) : (
            <Link href='/login'>Login</Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
