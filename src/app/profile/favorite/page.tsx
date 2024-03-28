import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import {
  Card,
  CardContent,
  Cards,
  Container,
  Developer,
  Name,
  Price,
} from './FavoritePage.styled';

const FavoritePage = async () => {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user)
    return (
      <Container>
        <h2>You need login to your account.</h2>
      </Container>
    );

  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user.id);
  if (error) throw new Error(error.message);

  const favoriteArray = profileData[0].favorite_games_list;
  const favoriteList =
    favoriteArray &&
    (await supabase
      .from('games')
      .select('*, developers(*)')
      .in('id', favoriteArray));

  return (
    <Container>
      <h2>Favorite Games</h2>
      <Cards>
        {favoriteList && favoriteList.data ? (
          favoriteList.data.map((favoriteGame) => (
            <Card key={favoriteGame.id}>
              <Image
                src={favoriteGame.header}
                alt={favoriteGame.name}
                width={250}
                height={120}
                priority
              />
              <CardContent>
                <Name>{favoriteGame.name}</Name>
                <Developer>{favoriteGame.developers.name}</Developer>
                <Price>${favoriteGame.price}</Price>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>You have not favorite games</p>
        )}
      </Cards>
    </Container>
  );
};

export default FavoritePage;
