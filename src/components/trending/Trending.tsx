import AddToCart from '../buttons/AddToCart';
import ViewAll from '../buttons/ViewAll';
import Link from 'next/link';
import {
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
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const fetchTrending = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from('games')
      .select('id, name, price, header_img, platforms_array')
      .order('release_date')
      .limit(3);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

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
                src={item.header_img}
                alt='banner'
                quality={100}
                priority
                fill
              />
            </CardWrapper>
            <CardPlatform text={item.platforms_array[0]} variant='contained' />
            <CardName>
              <Link href={`games/${item.id}`}>{item.name}</Link>
            </CardName>
            <CardFooter>
              <CardPrice>${item.price}</CardPrice>
              <AddToCart />
            </CardFooter>
          </Card>
        ))}
      </Cards>
    </Wrapper>
  );
};

export default Trending;
