import { supabase } from '@/helpers/supabase';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import {
  Card,
  CardContent,
  Cards,
  Container,
  Developer,
  Name,
  Price,
} from './FavoritePage.styled';

const fetchProfile = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw new Error(error.message);
    return data[0];
  } catch (error) {
    throw new Error(error as string);
  }
};

const fetchUser = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  return data.user;
};

const FavoritePage = async () => {
  const user = await fetchUser();
  const profile = await fetchProfile();
  const favoriteArray = profile.favorite_games_list;
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
                src={favoriteGame.header_img}
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
