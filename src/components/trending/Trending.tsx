import ViewAll from '../buttons/ViewAll';
import Link from 'next/link';
import {
  AddToCartLink,
  Card,
  CardBackground,
  CardFooter,
  CardName,
  CardPlatform,
  CardPrice,
  CardWrapper,
  Cards,
  TrendingHeader,
  Wrapper,
} from './Trending.styled';
import { fetchTrending } from '@/utils/games/games';

const Trending = async () => {
  const data = await fetchTrending();
  return (
    <Wrapper>
      <TrendingHeader>
        <h2>Trending</h2>
        <ViewAll />
      </TrendingHeader>
      <Cards>
        {data.map((item) => (
          <Card key={item.name}>
            <CardWrapper>
              <CardBackground
                src={item.header}
                alt='banner'
                priority
                fill
              />
            </CardWrapper>
            <CardPlatform text={item.platforms[0]} variant='contained' />
            <CardName>
              <Link href={`games/${item.id}`}>{item.name}</Link>
            </CardName>
            <CardFooter>
              <CardPrice>${item.price}</CardPrice>
              <AddToCartLink href={`games/${item.id}`}>Add to cart</AddToCartLink>
            </CardFooter>
          </Card>
        ))}
      </Cards>
    </Wrapper>
  );
};

export default Trending;
