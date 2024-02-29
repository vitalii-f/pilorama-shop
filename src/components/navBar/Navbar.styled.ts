'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export const MenuLink = styled(Link)`
  display: inline-block;
  width: 100%;
`;

export const HeaderDrawer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100px;
`;

export const Search = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  z-index: 10;
  svg {
    position: absolute;
  }

  @media (max-width: 510px) {
    width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 150px;
  padding: 5px 5px 5px 25px;

  border: unset;
  border-radius: 5px;
  background-color: #4b4b4b40;

  color: var(--color-dark-grey);
  font-size: 16px;
  font-weight: 500;

  transition: all 0.2s;

  &:focus-visible,
  &:not(:placeholder-shown) {
    outline: unset;
    width: 350px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  @media (max-width: 510px) {
    width: 100%;
    &:focus-visible,
    &:not(:placeholder-shown) {
      width: 100%;
    }
  }
`;

export const SearchResult = styled.div`
  position: absolute;
  top: 100%;

  width: 100%;

  background-color: var(--color-secondary);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  overflow: hidden;
`;

export const SearchResultCard = styled.div`
  display: flex;
  gap: 5px;

  &:hover {
    background-color: var(--color-hover-search);
  }
`;

export const SearchResultPreview = styled(Image)`
  @media (max-width: 510px) {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding-top: 5px;
`;

export const GameName = styled.h3`
  font-weight: 500;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
`;

export const Developer = styled.p`
  font-size: 14px;
  @media (max-width: 375px) {
    display: none;
  }
`;

export const Price = styled.p`
  font-weight: 500;
`;
