import React from 'react';
import ViewAll from '../buttons/ViewAll';
import PlatformLabel from '../labels/PlatformLabel';
import { Card, CardContent, CardDescription, CardDeveloper, CardPrice, CardTitle, Cards, RealeasesImage, Releases, ReleasesHeader } from './NewReleases.styled';
import Link from 'next/link';
import { Tables } from '@/types/supabase';

const NewReleases = async ({ data }: { data: Tables<'games'>[]}) => {
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
                src={item.capsule_img}
                alt={item.name!}
                width={170}
                height={170}
                quality={100}
              />
              <CardContent>
                <CardDescription>
                  <CardTitle><Link href={`/games/${item.id}`}>{item.name}</Link></CardTitle>
                  <CardDeveloper>{item.developers}</CardDeveloper>
                </CardDescription>
                <PlatformLabel text={item.platforms_array[0]} variant='outlined' />
                <CardPrice href={`/games/${item.id}`}>
                  ${item.price}
                </CardPrice>
              </CardContent>
            </Card>
        ))}
      </Cards>
    </Releases>
  );
};

export default NewReleases;
