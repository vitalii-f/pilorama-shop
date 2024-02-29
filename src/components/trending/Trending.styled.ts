'use client';

import Image from 'next/image';
import styled from 'styled-components';
import PlatformLabel from '../labels/PlatformLabel';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  max-width: var(--max-width);
  width: 100%;

  margin-bottom: 20px;
`;

export const TrendingHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Cards = styled.div`
  display: grid;
  /* gap: 40px; */
  justify-content: space-between;
  grid-template-columns: repeat(3, calc(100% / 3 - 45px));
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, calc(100% / 3 - 15px));
  }
`;

export const Card = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 25px;

  border-radius: 10px;
  overflow: hidden;
`;

export const CardWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  box-shadow: 0px -40px 55px 15px #29262e inset;
  border-radius: 10px;
`;

export const CardBackground = styled(Image)`
  filter: contrast(100%);
  object-fit: cover;
  border-radius: 10px;
  z-index: -1;
`;

export const CardPlatform = styled(PlatformLabel)`
  align-self: flex-start;
  margin: 12px 0 0 12px;
`;

export const CardName = styled.h3`
  align-self: center;
  z-index: 1;
`;

export const CardFooter = styled.div`
  display: flex;
  gap: 15px;
  align-self: flex-end;
`;

export const CardPrice = styled.span`
  z-index: 1;
`;
