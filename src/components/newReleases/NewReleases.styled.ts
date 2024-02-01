'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export const Releases = styled.section`
  display: flex;
  flex-direction: column;
  gap: 35px;

  max-width: var(--max-width);
  width: 100%;
  padding: 20px 0;
`;
export const ReleasesHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 170px);
  gap: 30px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-width: 170px;
  height: 300px;

  border-radius: 10px;
  border: 1px solid var(--color-dark-grey);
`;

export const RealeasesImage = styled(Image)`
  border-radius: 10px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  display: grid;
  flex-direction: column;
  gap: 10px;

  width: 100%;
  height: 100%;
  padding: 0 5px;
`;

export const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 800;
`;

export const CardDeveloper = styled.p`
  font-size: 11px;
`;

export const CardPrice = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 25px;

  box-shadow: 0px 0px 15px 0px var(--color-primary);
  background-color: var(--color-primary);
  border-radius: 10px;
`;
