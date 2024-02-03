'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 1fr, 100px;

  max-width: var(--max-width);
  margin: 0 auto;
  padding: 20px 0;
`;

export const Games = styled.section`
  grid-column: 1/10;
  display: flex;
  flex-direction: column;
  gap: 35px;

  max-width: var(--max-width);
  width: 100%;
`;

export const GamesHeader = styled.div`
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

export const CardImage = styled(Image)`
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

export const AsideFilter = styled.aside`
  grid-column: 11/13;

`

export const AsideTitle = styled.h2`
    line-height: normal;
`