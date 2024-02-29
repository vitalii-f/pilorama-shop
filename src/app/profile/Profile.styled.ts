'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;
export const ProfileContainer = styled.div`
  display: flex;

  max-width: var(--max-width);
  width: 100%;
  min-height: calc(100vh - var(--navbar-height));
`;

export const ProfileAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;

  max-width: 150px;
  width: 100%;
  padding: 20px 10px;

  border-right: 1px solid var(--color-hover-link);
`;

export const Nav = styled.nav``;

export const NavUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const NavLi = styled.li`
  a {
    display: flex;
    align-items: center;

    gap: 15px;
  }
`;

export const Section = styled.section`
  width: 100%;
`;

export const GeneralProfileWrapper = styled.div`
  width: 100%;
  padding: 20px 20px;
`;

export const GeneralProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 20px;
    padding-bottom: 20px;
  }
`;

export const GeneralProfileInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  row-gap: 40px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, 200px);
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding-bottom: 10px;

  border-bottom: 2px solid var(--color-dark-grey);
`;
