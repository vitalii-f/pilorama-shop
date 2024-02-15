'use client'

import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { Section, SliderImage, StyledSwiper } from './GameSlider.styled';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const GameSlider = ({ media }: { media: string[]}) => {
  return (
    <Section>
      <StyledSwiper
        modules={[Navigation, Pagination, Scrollbar]}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        centeredSlides
        initialSlide={2}
        spaceBetween={50}
      >
        {media.map((item) => (
            <SwiperSlide key={item}>
                <SliderImage src={item} alt='slide image' fill quality={100} priority />
            </SwiperSlide>
        ))}
      </StyledSwiper>
    </Section>
  );
};

export default GameSlider;
