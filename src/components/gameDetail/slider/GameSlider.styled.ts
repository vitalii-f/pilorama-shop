'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const Section = styled.section`
  width: 100%;
  height: 300px;
`;

export const StyledSwiper = styled(Swiper)`
  height: 100%;
  padding: 0 60px;
  padding-top: 50px;

  .swiper-slide {
    width: calc(100% / 4);
    height: 200px;
    transition: all 0.5s;
    transform: scale(1);
  }

  .swiper-slide-active {
    transition: all 0.5s;
    transform: scale(1.2);
  }
`;

export const SliderImage = styled(Image)`
  border-radius: 10px;
  object-fit: cover;
`;
