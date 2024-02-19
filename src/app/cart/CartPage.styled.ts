'use client';

import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;

  max-width: var(--max-width);
  width: 100%;

  margin: 0 auto;
  padding: 10px;
`;

export const CartHeader = styled.div`
  border-bottom: 2px solid var(--color-dark-grey);
  padding-bottom: 20px;
`;
export const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;
