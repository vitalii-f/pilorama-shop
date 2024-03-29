import GameHero from '@/components/gameDetail/hero/GameHero';
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
import { createClient } from '@/utils/supabase/client';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchGameData(+params.id);

  return {
    title: product.name,
  };
}

const fetchGameData = async (id: number) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*, developers(*), publishers(*)')
      .eq('id', id);
    if (error) throw new Error(error.message);

    return data[0];
  } catch (error) {
    throw new Error(error as string);
  }
};

const GameDetailPage = async ({ params }: { params: { id: number } }) => {
  const gameData = await fetchGameData(params.id);

  return (
    <Main>
      <GameHero gameData={gameData} />
      <GameSlider media={gameData.slider} />
      <AdditionalInfo>
        <AdditionalWrapper>
          {gameData.description_background &&
            gameData.description_title &&
            gameData.description_text && (
              <>
                <AdditionalImage
                  src={gameData.description_background}
                  alt='additional background'
                  fill
                  priority
                />
                <AdditionalContent>
                  <AdditionalTitle>
                    {gameData.description_title}
                  </AdditionalTitle>
                  <AdditionalText>
                    <MDXRemote source={JSON.parse(gameData.description_text)} />
                  </AdditionalText>
                </AdditionalContent>
              </>
            )}
        </AdditionalWrapper>
        <Aside>
          <GiftButton>
            <CardGiftcardIcon />
            Buy As A Gift
          </GiftButton>
          <GameDescription gameData={gameData} />
        </Aside>
      </AdditionalInfo>
    </Main>
  );
};

export default GameDetailPage;
