import React from 'react';
import { Main } from './page.styled';
import {
  Background,
  ContentRaiting,
  DescriptionWrapper,
  DevInfo,
  HeroContent,
  HeroControl,
  RaitingDescription,
  Section,
} from '@/components/gameDetail/hero/GameHero.styled';
import { Skeleton } from '@mui/material';

const loading = () => {
  return (
    <Main>
      <Section>
        <Background></Background>
        <HeroContent>
          <Skeleton width={170} height={170} variant='rounded' />
          <DescriptionWrapper>
            <Skeleton variant='text' sx={{ fontSize: '32px' }} width={150} />
            <DevInfo>
              <Skeleton width={50} height={30} />
              <p>
                <Skeleton width={50} height={30} />
              </p>
            </DevInfo>
            <ContentRaiting>
              <Skeleton width={45} height={72} variant='rounded' />
              <RaitingDescription>
                <Skeleton
                  variant='text'
                  width={100}
                  sx={{ fontSize: '12px' }}
                />
                <Skeleton
                  variant='text'
                  width={100}
                  sx={{ fontSize: '12px' }}
                />
                <Skeleton
                  variant='text'
                  width={100}
                  sx={{ fontSize: '12px' }}
                />
              </RaitingDescription>
            </ContentRaiting>
          </DescriptionWrapper>
          <HeroControl>
            <Skeleton width={30} height={30} />
            <Skeleton width={50} height={40} />
            <Skeleton width={120} height={40} />
          </HeroControl>
        </HeroContent>
      </Section>
      <section style={{ overflow: 'hidden', width: '100vw' }}>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            overflow: 'hidden',
            padding: '10px 10px 10px 10px',
          }}
        >
          {[...Array(6).keys()].map((key) => (
            <Skeleton width={300} height={100} key={key} variant='rounded' />
          ))}
        </div>
      </section>
    </Main>
  );
};

export default loading;
