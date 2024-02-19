'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  padding: 20px 20px 0 20px;
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Card = styled.div`
  display: flex;
  gap: 5px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Name = styled.h3`
  font-size: 18;
  font-weight: 500;
`;

export const Developer = styled.p`
  font-size: 14px;
`;

export const Price = styled.p`
  font-weight: 500;
`;
