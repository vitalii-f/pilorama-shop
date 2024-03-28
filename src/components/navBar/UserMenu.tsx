'use client'

import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { MenuLink } from './Navbar.styled';
import { logout } from './action';
import { useState } from 'react';

const UserMenu = ({ avatarURL, role }: { avatarURL?: string | null, role: string }) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

    return (
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
            <MenuLink href='/admin/dashboard'>Admin Menu</MenuLink>
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
  )
}

export default UserMenu