import HeroNav from './HeroNav';
import Trending from '../trending/Trending';
import PlatformLabel from '../labels/PlatformLabel';
import { cache } from 'react';
import {
  FooterRow,
  HeroBanner,
  HeroFooter,
  HeroLogo,
  HeroSection,
  Info,
  Price,
} from './Hero.styled';
import { createClient } from '@/utils/supabase/client';

const fetchBanner = cache(async () => {
  const supabase = createClient();
  return supabase.from('main_banner').select('*');
});

const Hero = async () => {
  const { data } = await fetchBanner();

  if (data)
    return (
      <HeroSection>
        <HeroBanner
          src={data[0].banner_img}
          fill
          alt='hero background'
          priority
        />
        <HeroNav />
        <HeroFooter>
          <FooterRow>
            <HeroLogo
              src={data[0].logo_img}
              alt='logo'
              width={300}
              height={150}
              priority
            />
            <Info>
              <PlatformLabel text='PS5' variant='contained' />
              <Price>$9.99</Price>
            </Info>
          </FooterRow>
          <Trending />
        </HeroFooter>
      </HeroSection>
    );
};

export default Hero;
