import Image from 'next/image';
import HeroNav from './HeroNav';
import Trending from '../trending/Trending';
import PlatformLabel from '../labels/PlatformLabel';
import { cache } from 'react';
import { FooterRow, HeroBanner, HeroFooter, HeroSection, Info, Price } from './Hero.styled';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const fetchBanner = cache(async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  return supabase.from('main_banner').select('*')
});

const Hero = async () => {
  const { data } = await fetchBanner();

  if (data) return (
    <HeroSection>
      <HeroBanner
        src={data[0].banner_img}
        fill
        alt='hero background'
        quality={100}
        priority
      />
      <HeroNav />
      <HeroFooter>
        <FooterRow>
          <Image
            src={data[0].logo_img}
            alt='logo'
            width={300}
            height={150}
            quality={100}
            priority
          />
          <Info>
            <PlatformLabel text='PS5' variant='contained' />
            <Price>$49.99</Price>
          </Info>
        </FooterRow>
        <Trending />
      </HeroFooter>
    </HeroSection>
  );
};

export default Hero;
