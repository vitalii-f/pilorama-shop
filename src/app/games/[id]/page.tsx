import GameHero from '@/components/gameDetail/hero/GameHero';
import React, { cache } from 'react';
import {
  AdditionalContent,
  AdditionalImage,
  AdditionalInfo,
  AdditionalText,
  AdditionalTitle,
  AdditionalWrapper,
  Aside,
  GiftButton,
  Main,
} from './page.styled';
import GameSlider from '@/components/gameDetail/slider/GameSlider';
import GameDescription from '@/components/gameDetail/description/GameDescription';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export const revalidate = 60;
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const fetchGameData = cache(async (id: number) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase.from('games').select('*, developers(*), publishers(*)').eq('id', id)
    if (error) throw new Error(error.message)

    return data
  } catch (error) {
    throw new Error(error as string)
  }
});

const GameDetailPage = async ({ params }: { params: { id: number } }) => {
  const gameData = await fetchGameData(params.id);
  return (
    <Main>
      <GameHero gameData={gameData[0]} />
      <GameSlider media={gameData[0].slider_img_array} />
      <AdditionalInfo>
        <AdditionalWrapper>
          {/* <AdditionalImage
            src={gameData.additional_background}
            alt='additional background'
            fill
            quality={100}
            priority
          /> */}
          {/* <AdditionalContent>
            <AdditionalTitle>{gameData.addittional_title}</AdditionalTitle>
            <AdditionalText>
              <MDXRemote source={gameData.additional_text!} />
            </AdditionalText>
          </AdditionalContent> */}
        </AdditionalWrapper>
        <Aside>
          <GiftButton>
            <CardGiftcardIcon />
            Buy As A Gift
          </GiftButton>
          <GameDescription gameData={gameData[0]} />
        </Aside>
      </AdditionalInfo>
    </Main>
  );
};

export default GameDetailPage;
