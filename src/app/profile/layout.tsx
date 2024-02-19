import React from 'react';
import {
  NavLi,
  NavUl,
  ProfileAside,
  ProfileContainer,
  Section,
  Wrapper,
} from './Profile.styled';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <ProfileContainer>
        <ProfileAside>
          <h2>PROFILE</h2>
          <nav>
            <NavUl>
              <NavLi>
                <Link href='/profile'>
                  <PersonIcon /> General
                </Link>
              </NavLi>
              <NavLi>
                <Link href='/profile/purchases'>
                  <ShoppingBasketIcon />
                  Purchases
                </Link>
              </NavLi>
              <NavLi>
                <Link href='/profile/favorite'>
                  <FavoriteIcon />
                  Favorite
                </Link>
              </NavLi>
              <NavLi>
                <Link href='/profile/settings'>
                  <SettingsIcon />
                  Settings
                </Link>
              </NavLi>
            </NavUl>
          </nav>
        </ProfileAside>
        <Section>{children}</Section>
      </ProfileContainer>
    </Wrapper>
  );
};

export default layout;
