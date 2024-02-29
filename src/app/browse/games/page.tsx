import {
  Card,
  CardContent,
  CardDescription,
  CardDeveloper,
  CardImage,
  CardPrice,
  CardTitle,
  Cards,
} from '../page.styled';
import Link from 'next/link';
import PlatformLabel from '@/components/labels/PlatformLabel';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

interface SearchParamsProps {
  [key: string]: string | string[] | undefined;
}

const fetchData = async (searchParams: SearchParamsProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    if (!Object.keys(searchParams).length) {
      const { data, error } = await supabase
        .from('games')
        .select('*, developers(*)')
        .order('release_date', { ascending: true })
      return data;
    } else {
      const platform = searchParams.platform
        ? Array.isArray(searchParams.platform)
          ? searchParams.platform
          : [searchParams.platform]
        : [''];
      const genre = searchParams.genre
        ? Array.isArray(searchParams.genre)
          ? searchParams.genre
          : [searchParams.genre]
        : [''];

      const orderParam = searchParams['sortBy'] ? searchParams['sortBy'] : 'release_date'

      const { data, error } = await supabase
        .from('games')
        .select('*, developers(*)')
        .gte('price', searchParams['budgete-start'] || 0)
        .lte('price', searchParams['budgete-end'] || 9999)
        .contains('platforms_array', platform)
        .contains('genres_array', genre)
        .order(orderParam as string, { ascending: true });
      return data;
    }
  } catch (error) {}
};

const GamesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const gamesData = await fetchData(searchParams);
  return (
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
              <CardPrice href={`/games/${game.id}`}>${game.price}</CardPrice>
            </CardContent>
          </Card>
        ))}
    </Cards>
  );
};

export default GamesPage;
