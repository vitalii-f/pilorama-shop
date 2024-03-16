import ViewAll from '../buttons/ViewAll';
import PlatformLabel from '../labels/PlatformLabel';
import {
  Card,
  CardContent,
  CardDescription,
  CardDeveloper,
  CardPrice,
  CardTitle,
  Cards,
  RealeasesImage,
  Releases,
  ReleasesHeader,
} from './NewReleases.styled';
import Link from 'next/link';
import { Tables } from '@/types/supabase';

interface NewReleasesProps {
  data: (Tables<'games'> & {
    developers: { id: number; name: string; value: string };
  })[];
}

const NewReleases = async ({ data }: NewReleasesProps) => {
  return (
    <Releases>
      <ReleasesHeader>
        <h2>New Releases</h2>
        <ViewAll />
      </ReleasesHeader>
      <Cards>
        {data.map((item, index) => (
          <Card key={item.name + index}>
            <RealeasesImage
              src={item.capsule}
              alt={item.name}
              width={170}
              height={170}
            />
            <CardContent>
              <CardDescription>
                <CardTitle>
                  <Link href={`/games/${item.id}`}>{item.name}</Link>
                </CardTitle>
                <CardDeveloper>{item.developers.name}</CardDeveloper>
              </CardDescription>
              <PlatformLabel
                text={item.platforms[0]}
                variant='outlined'
              />
              <CardPrice href={`/games/${item.id}`}>${item.price}</CardPrice>
            </CardContent>
          </Card>
        ))}
      </Cards>
    </Releases>
  );
};

export default NewReleases;
