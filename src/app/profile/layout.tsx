import {
  NavLi,
  NavUl,
  ProfileAside,
  ProfileContainer,
  Section,
  Wrapper,
} from './Profile.styled';
import {
  Person,
  ShoppingBasket,
  Favorite,
  Settings,
} from '@mui/icons-material';
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
                  <Person />
                  General
                </Link>
              </NavLi>
              <NavLi>
                <Link href='/profile/library'>
                  <ShoppingBasket />
                  Library
                </Link>
              </NavLi>
              <NavLi>
                <Link href='/profile/favorite'>
                  <Favorite />
                  Favorite
                </Link>
              </NavLi>
              <NavLi>
                <Link href='/profile/settings'>
                  <Settings />
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
