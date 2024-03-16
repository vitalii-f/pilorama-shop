'use client';

import styled, { keyframes } from 'styled-components';

const slide = keyframes`
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0%);
    }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 150px;
  padding: 10px 0;

  background-color: var(--color-dark-grey);

  animation: ${slide} 0.2s ease;
`;

export const CollectionCard = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 30px;
  padding: 5px 5px;

  &:hover {
    background-color: var(--color-background);
  }

  a {
    width: 100%;
  }
`;
