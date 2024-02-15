import { cache } from 'react';
import {
  AsideFilter,
  AsideTitle,
  Card,
  CardContent,
  CardDescription,
  CardDeveloper,
  CardImage,
  CardPrice,
  CardTitle,
  Cards,
  Games,
  GamesHeader,
  Main,
} from './page.styled';
import Link from 'next/link';
import PlatformLabel from '@/components/labels/PlatformLabel';
import Filters from '@/components/filters/Filters';
import { supabase } from '@/helpers/supabase';

export const fetchCache = 'force-no-store'

const fetchData = cache(async () => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*, developers(*)');
    return data;
  } catch (error) {}
});

const fetchFiltersList = cache(async () => {});

const fetchFilters = async () => {
  try {
    const { data: platforms, error: platformsError } = await supabase
      .from('platforms')
      .select('*');
    if (platformsError) throw new Error(platformsError.message);

    const { data: genres, error: genresError } = await supabase
      .from('genres')
      .select('*');
    if (genresError) throw new Error(genresError.message);

    return { platforms, genres };
  } catch (error) {
    throw new Error(error as string);
  }
};

const GamesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const gamesData = await fetchData();
  const filtersList = await fetchFiltersList();
  const filters = await fetchFilters();
  return (
    <Main>
      <Games>
        <GamesHeader>
          <h2>Games</h2>
          <div>sort by</div>
        </GamesHeader>
        <div>
          <Cards>
            {gamesData &&
              gamesData.map((game) => (
                <Card key={game.name}>
                  <CardImage
                    src={game.capsule_img}
                    alt={game.name}
                    width={170}
                    height={170}
                    quality={100}
                  />
                  <CardContent>
                    <CardDescription>
                      <CardTitle>
                        <Link href={`/games/${game.id}`}>{game.name}</Link>
                      </CardTitle>
                      <CardDeveloper>{game.developers.name}</CardDeveloper>
                    </CardDescription>
                    <PlatformLabel
                      text={game.platforms_array[0]}
                      variant='outlined'
                    />
                    <CardPrice href={`/games/${game.id}`}>
                      ${game.price}
                    </CardPrice>
                  </CardContent>
                </Card>
              ))}
          </Cards>
        </div>
      </Games>
      <AsideFilter>
        <AsideTitle>Filters</AsideTitle>
        <Filters filters={filters} />
      </AsideFilter>
    </Main>
  );
};

export default GamesPage;
