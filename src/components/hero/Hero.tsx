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
import Link from 'next/link';

const fetchBanner = cache(async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('main_banner')
    .select('*, games(price, platforms)');
  if (error) throw new Error(error.message);

  return data[0];
});

const Hero = async () => {
  const data = await fetchBanner();

  if (data)
    return (
      <HeroSection>
        <HeroBanner src={data.banner_img} fill alt='hero background' priority />
        <HeroNav />
        <HeroFooter>
          <FooterRow>
            <HeroLogo
              src={data.logo_img}
              alt='logo'
              width={300}
              height={150}
              priority
            />
            <Info>
              <PlatformLabel
                text={data.games?.platforms[0] || ''}
                variant='contained'
              />
              <Link href={`games/${data.game_id}`}>
                <Price>${data.games?.price}</Price>
              </Link>
            </Info>
          </FooterRow>
          <Trending />
        </HeroFooter>
      </HeroSection>
    );
};

export default Hero;
