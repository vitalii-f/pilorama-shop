import directus from '@/helpers/diretus';
import { readItems } from '@directus/sdk';
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
import { Filters as FiltersProps } from '@/types/types';

const fetchData = cache(async () => {
  return await directus.request(
    readItems('games', {
      sort: ['-release_date'],
      fields: [
        'id',
        'price',
        'capsule',
        'name',
        {
          developer: [{ item: { developer: ['name'] } }],
          platform: [{ item: { Platform: ['name'] } }],
        },
      ],
    })
  );
});

const fetchFiltersList = cache(async () => {
  return await directus.request(readItems('filters'))
})

const GamesPage = async () => {
  const gamesData = await fetchData();
  const filtersList = await fetchFiltersList()
  return (
    <Main>
      <Games>
        <GamesHeader>
          <h2>Games</h2>
          <div>sort by</div>
        </GamesHeader>
        <div>
          <Cards>
            {gamesData.map((item) => (
              <Card key={item.name}>
                <CardImage
                  src={`${process.env.DB_IMG}/${item.capsule}`}
                  alt={item.name!}
                  width={170}
                  height={170}
                  quality={100}
                />
                <CardContent>
                  <CardDescription>
                    <CardTitle>
                      <Link href={`/games/${item.id}`}>{item.name}</Link>
                    </CardTitle>
                    <CardDeveloper>{item.developer[0].item.name}</CardDeveloper>
                  </CardDescription>
                  <PlatformLabel text={item.platform[0].item.name!} variant='outlined' />
                  <CardPrice href={`/games/${item.id}`}>
                    ${item.price}
                  </CardPrice>
                </CardContent>
              </Card>
            ))}
          </Cards>
        </div>
      </Games>
      <AsideFilter>
        <AsideTitle>Filters</AsideTitle>
        <Filters filtersList={filtersList as FiltersProps[]} />
      </AsideFilter>
    </Main>
  );
};

export default GamesPage;
