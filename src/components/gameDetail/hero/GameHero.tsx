import PlatformLabel from '@/components/labels/PlatformLabel';
import Image from 'next/image';
import React from 'react';
import { ContentRaiting, DescriptionWrapper, DevInfo, GameName, HeroContent, HeroControl, GameImage, Price, Section, RaitingDescription, CartButton, BackgroundImage, Background } from './GameHero.styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Tables } from '@/types/supabase';

const GameHero = ({ gameData }: {gameData: Tables<'games'>}) => {
  return (
    <Section>
    <Background>
        <BackgroundImage src={gameData.hero_img} alt={gameData.name!} fill priority quality={100} />
    </Background>
      <HeroContent>
        <GameImage src={gameData.icon_img} alt={gameData.name!} width={170} height={170} />
        <DescriptionWrapper>
          <GameName>{gameData.name}</GameName>
          <DevInfo>
            <PlatformLabel text={gameData.platforms_array[0]} variant='contained' />
            <p>{gameData.developers}</p>
          </DevInfo>
          <ContentRaiting>
            <Image src='/ESRB.png' alt='ESRB' width={45} height={72} quality={100} />
            <RaitingDescription>
                <p>Blood and Gore, Intense Violence, Partial Nudity, Sexual Themes, Strong Language, </p>
                <p>Use of Drugs and Alcohol Users Interact, In-Game Purchases</p>
            </RaitingDescription>
          </ContentRaiting>
        </DescriptionWrapper>
        <HeroControl>
            <FavoriteBorderIcon />
            <Price>${gameData.price}</Price>
            <CartButton>Add To Cart</CartButton>
        </HeroControl>
      </HeroContent>
    </Section>
  );
};

export default GameHero;
