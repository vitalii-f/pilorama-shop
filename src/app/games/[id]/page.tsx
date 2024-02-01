import GameHero from '@/components/gameDetail/hero/GameHero'
import directus from '@/helpers/diretus'
import { readItem } from '@directus/sdk'
import React, { cache } from 'react'
import { AdditionalContent, AdditionalImage, AdditionalInfo, AdditionalText, AdditionalTitle, AdditionalWrapper, Aside, GiftButton, Main } from './page.styled'
import GameSlider from '@/components/gameDetail/slider/GameSlider'
import GameDescription from '@/components/gameDetail/description/GameDescription'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { MDXRemote } from 'next-mdx-remote/rsc'

export const revalidate = 60
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const fetchGameData = cache(async (id: number) => {
    return directus.request(readItem('games', id, { fields: ['*', { media: ['directus_files_id'] }] }))
})

const GameDetailPage = async ({ params }: { params: { id: number } }) => {
    const gameData = await fetchGameData(params.id)
    console.log(gameData.additional_text)
  return (
    <Main>
      
        <GameHero gameData={gameData} />
        {gameData.media?.length ? <GameSlider media={gameData.media} /> : undefined}
        <AdditionalInfo>
          <AdditionalWrapper>
              <AdditionalImage src={`${process.env.DB_IMG}/${gameData.additional_background}`} alt='additional background' fill quality={100} priority />
              <AdditionalContent>
                <AdditionalTitle>{gameData.addittional_title}</AdditionalTitle>
                  <AdditionalText>
                    <MDXRemote source={gameData.additional_text} />
                  </AdditionalText>
              </AdditionalContent>
          </AdditionalWrapper>
          <Aside>
            <GiftButton><CardGiftcardIcon />Buy As A Gift</GiftButton>
              <GameDescription />
          </Aside>
        </AdditionalInfo>

    </Main>
  )
}

export default GameDetailPage