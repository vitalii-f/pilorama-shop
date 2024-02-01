import PlatformLabel from '@/components/labels/PlatformLabel';
import { Collection } from '@/types/collections';
import Image from 'next/image';
import React from 'react';
import { ContentRaiting, DescriptionWrapper, DevInfo, GameName, HeroContent, HeroControl, GameImage, Price, Section, RaitingDescription, CartButton, BackgroundImage, Background } from './GameHero.styled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const GameHero = ({ gameData }: {gameData: Collection['games']}) => {
  return (
    <Section>
    <Background>
        <BackgroundImage src={`${process.env.DB_IMG}/${gameData.banner}`} alt={gameData.name!} fill priority quality={100} />
    </Background>
      <HeroContent>
        <GameImage src={`${process.env.DB_IMG}/${gameData.square_img}`} alt={gameData.name!} width={170} height={170} />
        <DescriptionWrapper>
          <GameName>{gameData.name}</GameName>
          <DevInfo>
            <PlatformLabel text={gameData.platform![0]} variant='contained' />
            <p>{gameData.developer}</p>
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
