'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface StyledProps {
  $isActive?: boolean;
}

export const HeroSection = styled.section`
  width: 100%;
  height: calc(100vh - var(--navbar-height));
  position: relative;
  padding: 0 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export const HeroBanner = styled(Image)`
  position: absolute;
  z-index: -1;
  width: 100vw;
  object-fit: cover;
  object-position: top;
  filter: contrast(100%);
`;

export const HeroLogo = styled(Image)`
  @media (max-width: 425px) {
    width: 200px;
    height: 100px;
  }
`;

export const HeroNavigation = styled.nav`
  display: flex;
  justify-content: space-between;

  max-width: var(--max-width);
  width: 100%;

  padding: 15px 0;
  margin: 0 auto;

  ul {
    display: flex;
    gap: 10px;
    text-transform: uppercase;
  }

  li:not(:last-child)::after {
    content: '';
    position: relative;
    left: calc(100% + 5px);
    top: -100%;
    display: block;
    width: 1px;
    height: 100%;
    background-color: #ffffff;
  }
`;
export const NavLink = styled(Link)<StyledProps>`
  color: ${(props) => (props.$isActive ? '#FFFFFF' : 'var(--color-secondary)')};
  font-weight: ${(props) => (props.$isActive ? '600' : undefined)};
`;

//   .link {
//     color: var(--color-secondary);
//   }

//   .link-active {
//     color: #ffffff;
//     font-weight: 600;
//   }

export const HeroFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  max-width: var(--max-width);
  width: 100%;
`;

export const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 15px;
`;
export const Price = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 40px;

  filter: var(--shadow-dark-blue);

  border-radius: 5px;
  background-color: var(--color-primary);
`;
