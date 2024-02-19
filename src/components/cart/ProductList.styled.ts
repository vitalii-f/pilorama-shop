'use client';

import styled from 'styled-components';

export const Products = styled.div`
  display: flex;
  gap: 20px;
`;

export const Games = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;

export const ProductItem = styled.div`
  display: flex;
  gap: 10px;

  padding-bottom: 25px;
  border-bottom: 2px solid var(--color-dark-grey);
`;

export const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
`;

export const GameTitle = styled.h3`
  font-size: 18px;
`;

export const GamePrice = styled.p`
  font-weight: 500;
`;

export const PayZone = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  width: 300px;
`;

export const PayZoneInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PayButton = styled.button`
  height: 40px;

  font-size: 20px;
  font-weight: 500;

  border-radius: 8px;
  background-color: var(--color-primary);
`;
