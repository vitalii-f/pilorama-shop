import PlatformLabel from '@/components/labels/PlatformLabel';
import Image from 'next/image';
import React from 'react';
import {
  ContentRaiting,
  DescriptionWrapper,
  DevInfo,
  GameName,
  HeroContent,
  HeroControl,
  GameImage,
  Price,
  Section,
  RaitingDescription,
  CartButton,
  BackgroundImage,
  Background,
} from './GameHero.styled';
import { Tables } from '@/types/supabase';
import FavoriteButton from './FavoriteButton';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import AddToCart from './AddToCart';

interface GameHeropProps {
  gameData: Tables<'games'> & {
    developers: { id: number; name: string; value: string };
  };
}

const GameHero = async ({ gameData }: GameHeropProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error } = await supabase.auth.getUser();

  let isFavorite: boolean = false;
  if (userData.user) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id);

    if (
      profileData &&
      profileData[0].favorite_games_list?.includes(gameData.id)
    ) {
      isFavorite = true;
    }
  }
  let inCart = false

  if (userData.user) {
    const { data } = await supabase.from('cart').select('*').eq('user_id', userData.user.id).eq('game_id', gameData.id)
    inCart = !!data && !!data[0]
  }

  return (
    <Section>
      <Background>
        <BackgroundImage
          src={gameData.hero_img}
          alt={gameData.name}
          fill
          priority
          quality={100}
        />
      </Background>
      <HeroContent>
        <GameImage
          src={gameData.icon_img}
          alt={gameData.name}
          width={170}
          height={170}
        />
        <DescriptionWrapper>
          <GameName>{gameData.name}</GameName>
          <DevInfo>
            <PlatformLabel
              text={gameData.platforms_array[0]}
              variant='contained'
            />
            <p>{gameData.developers.name}</p>
          </DevInfo>
          <ContentRaiting>
            <Image
              src='/ESRB.png'
              alt='ESRB'
              width={45}
              height={72}
              quality={100}
            />
            <RaitingDescription>
              <p>
                Blood and Gore, Intense Violence, Partial Nudity, Sexual Themes,
                Strong Language,
              </p>
              <p>Use of Drugs and Alcohol Users Interact, In-Game Purchases</p>
            </RaitingDescription>
          </ContentRaiting>
        </DescriptionWrapper>
        <HeroControl>
          <FavoriteButton gameId={gameData.id} isFavorite={isFavorite} />
          <Price>${gameData.price}</Price>
          <AddToCart game={gameData} inCart={inCart} />
        </HeroControl>
      </HeroContent>
    </Section>
  );
};

export default GameHero;
