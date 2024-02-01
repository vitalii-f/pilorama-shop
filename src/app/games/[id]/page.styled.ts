'use client';

import Image from 'next/image';
import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AdditionalInfo = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 30px;

  max-width: var(--max-width);
  width: 100%;

  padding: 30px 0;
`;

export const AdditionalWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 350px;
`;

export const AdditionalImage = styled(Image)`
  position: absolute;

  object-fit: cover;
  border-radius: 10px;

  filter: brightness(70%);

  z-index: -1;
`;

export const AdditionalContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  width: 100%;
  height: 100%;

  padding: 0 20px;
`;

export const AdditionalTitle = styled.div`
  color: var(--color-secondary);
  font-size: 18px;
  font-weight: 700;
  line-height: normal;

  width: 50%;
`;

export const AdditionalText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  color: #f8f8f8;
  text-align: justify;
  font-size: 11px;
  font-weight: 600;
  line-height: normal;

  width: calc(50% - 50px);
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const GiftButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 100%;
  height: 40px;

  border-radius: 5px;
  background-color: var(--color-primary);
  box-shadow: var(--shadow-dark-blue);

  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  cursor: pointer;
`;
