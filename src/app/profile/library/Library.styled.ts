'use client';

import styled from 'styled-components';

export const Library = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const GameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const LibraryGame = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  @media (max-width: 630px) {
    flex-direction: column;
  }
`;

export const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GameTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
`;

export const GameLabel = styled.label`
  display: flex;
  gap: 5px;
  align-items: center;
`;
