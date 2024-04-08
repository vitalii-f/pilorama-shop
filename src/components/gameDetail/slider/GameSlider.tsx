'use client';

import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { Section, SliderImage, StyledSwiper } from './GameSlider.styled';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const GameSlider = ({ media }: { media: string[] }) => {
  const routeParams = useParams<{ id: string }>();
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
        breakpoints={{
          1600: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 60,
          },
        }}
      >
        {media.map((item) => (
          <SwiperSlide key={item}>
            <Link href={`${routeParams.id}/preview?url=${item}`}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                <SliderImage
                  src={item}
                  alt='slide image'
                  priority
                  quality={60}
                  sizes='90vw'
                  fill
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Section>
  );
};

export default GameSlider;
