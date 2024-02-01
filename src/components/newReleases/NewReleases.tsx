import React from 'react';
import ViewAll from '../buttons/ViewAll';
import PlatformLabel from '../labels/PlatformLabel';
import directus from '@/helpers/diretus';
import { readItems } from '@directus/sdk';
import { Card, CardContent, CardDescription, CardDeveloper, CardPrice, CardTitle, Cards, RealeasesImage, Releases, ReleasesHeader } from './NewReleases.styled';
import Link from 'next/link';

const fetchData = async () => {
  return directus.request(
    readItems('games', {
      fields: ['id', 'name', 'price', 'developer', 'platform', 'capsule'],
    })
  );
};

const NewReleases = async () => {
  const data = await fetchData();
  return (
    <Releases>
      <ReleasesHeader>
        <h2>New Releases</h2>
        <ViewAll />
      </ReleasesHeader>
      <Cards>
        {data.map((item) => (
          
            <Card key={item.name}>
              <RealeasesImage
                src={`${process.env.DB_IMG}/${item.capsule}`}
                alt={item.name!}
                width={170}
                height={170}
                quality={100}
              />
              <CardContent>
                <CardDescription>
                  <CardTitle><Link href={`/games/${item.id}`}>{item.name}</Link></CardTitle>
                  <CardDeveloper>{item.developer}</CardDeveloper>
                </CardDescription>
                <PlatformLabel text={item.platform![0]} variant='outlined' />
                <CardPrice href={`/games/${item.id}`}>
                  $30.00
                </CardPrice>
              </CardContent>
            </Card>
        ))}
      </Cards>
    </Releases>
  );
};

export default NewReleases;
