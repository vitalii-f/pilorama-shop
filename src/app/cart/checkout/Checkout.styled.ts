'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  height: calc(100vh - var(--navbar-height));
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
`;

export const CheckoutHeader = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;
`;

export const CheckoutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 18px;
    line-height: 120%;
  }
`;

export const LibraryLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  width: 110px;
  height: 40px;

  border-radius: 8px;
  background-color: var(--color-primary);
`;
