import PlatformLabel from '@/components/labels/PlatformLabel';
import Image from 'next/image';
import {
  ContentRaiting,
  DescriptionWrapper,
  DevInfo,
  GameName,
  HeroContent,
  HeroControl,
  GameIcon,
  Price,
  Section,
  RaitingDescription,
  BackgroundImage,
} from './GameHero.styled';
import { Tables } from '@/types/supabase';
import FavoriteButton from './FavoriteButton';
import { createClient } from '@/utils/supabase/server';
import AddToCart from './AddToCart';

interface GameHeropProps {
  gameData: Tables<'games'> & {
    developers: { id: number; name: string; value: string };
  };
}

const GameHero = async ({ gameData }: GameHeropProps) => {
  const supabase = createClient();

  let isFavorite: boolean = false;
  let inLibrary: boolean = false;
  let inCart = false;

  const { data: userData } = await supabase.auth.getUser();

  if (userData.user) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id);

    if (profileData && profileData[0]) {
      if (profileData[0].favorite_games_list?.includes(gameData.id)) {
        isFavorite = true;
      }

      const { count: libraryCount } = await supabase
        .from('user_library')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profileData[0].id)
        .eq('game_id', gameData.id);
      inLibrary = !!libraryCount;

      const { count: cartCount } = await supabase
        .from('cart')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profileData[0].id)
        .eq('game_id', gameData.id);
      inCart = !!cartCount;
    }
  }

  return (
    <Section>
      <BackgroundImage src={gameData.hero} alt={gameData.name} fill priority />
      <HeroContent>
        <GameIcon
          src={gameData.icon}
          alt={gameData.name}
          width={170}
          height={170}
        />
        <DescriptionWrapper>
          <GameName>{gameData.name}</GameName>
          <DevInfo>
            <PlatformLabel text={gameData.platforms[0]} variant='contained' />
            <p>{gameData.developers.name}</p>
          </DevInfo>
          <ContentRaiting>
            <Image src='/ESRB.png' alt='ESRB' width={45} height={72} />
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
          <AddToCart game={gameData} inCart={inCart} inLibrary={inLibrary} />
        </HeroControl>
      </HeroContent>
    </Section>
  );
};

export default GameHero;
