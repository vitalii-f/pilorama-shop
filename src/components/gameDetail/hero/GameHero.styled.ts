'use client';

import Image from 'next/image';
import styled from 'styled-components';

export const Section = styled.section`
  position: relative;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 100vw;
  height: 620px;

`;

export const BackgroundImage = styled(Image)`
  max-height: 620px;
  object-fit: cover;
  z-index: -1;
  filter: brightness(80%);
`;

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: inset 0px -48px 50px 0px rgba(0, 0, 0, 0.25);
`;

export const GameImage = styled(Image)`
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  object-fit: cover;
  z-index: -1;
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;

  max-width: var(--max-width);
  width: 100%;

  z-index: 1;
  
  margin-bottom: 40px;
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;

export const GameName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 100%;
`;

export const DevInfo = styled.div`
  display: flex;
  gap: 19px;

  font-weight: 600;
`;

export const ContentRaiting = styled.div`
  display: flex;
  gap: 5px;
`;

export const RaitingDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: var(--color-secondary);
  font-size: 10px;
  font-weight: 600;
  line-height: normal;

  max-width: 300px;
`;

export const HeroControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;

  width: 20%;
`;

export const Price = styled.p`
  font-size: 25px;
  font-weight: 700;
`;

export const CartButton = styled.button`
  width: 120px;
  height: 40px;

  border: unset;
  border-radius: 5px;
  background-color: var(--color-primary);
  box-shadow: 0px 0px 15px 0px var(--color-primary);

  cursor: pointer;
`;
