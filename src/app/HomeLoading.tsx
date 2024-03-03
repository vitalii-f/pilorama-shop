import {
  FooterRow,
  HeroFooter,
  HeroSection,
  Info,
} from '@/components/hero/Hero.styled';
import HeroNav from '@/components/hero/HeroNav';
import PlatformLabel from '@/components/labels/PlatformLabel';
import { Price } from './profile/favorite/FavoritePage.styled';
import { Skeleton } from '@mui/material';
import {
  Cards,
  TrendingHeader,
  Wrapper,
} from '@/components/trending/Trending.styled';

const HomeLoading = () => {
  return (
    <main>
      <HeroSection>
        <Skeleton />
        <HeroNav />
        <HeroFooter>
          <FooterRow>
            <Skeleton width={300} height={150} />
            <Info>
              <PlatformLabel text='PS5' variant='contained' />
              <Price>$9.99</Price>
            </Info>
          </FooterRow>
          <Wrapper>
            <TrendingHeader>
              <h2>Trending</h2>
              <Skeleton width={60} height={30} />
            </TrendingHeader>
            <Cards>
              {[...Array(3).keys()].map((key) => (
                <Skeleton key={key} height={150} />
              ))}
            </Cards>
          </Wrapper>
        </HeroFooter>
      </HeroSection>
    </main>
  );
};

export default HomeLoading;
