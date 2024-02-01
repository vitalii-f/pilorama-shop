'use client'

import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { Section, SliderImage, StyledSwiper } from './GameSlider.styled';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const GameSlider = ({ media }: { media: { directus_files_id: string }[]}) => {
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
            <SwiperSlide key={item.directus_files_id}>
                <SliderImage src={`${process.env.NEXT_PUBLIC_DB_IMG}/${item.directus_files_id}`} alt='slide image' fill quality={100} priority />
            </SwiperSlide>
        ))}
      </StyledSwiper>
    </Section>
  );
};

export default GameSlider;
