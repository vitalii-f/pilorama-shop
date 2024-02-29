import React, { ReactNode } from 'react';
import {
  AsideFilter,
  AsideTitle,
  Games,
  GamesHeader,
  Main,
} from './page.styled';
import Filters from '@/components/filters/Filters';
import SortGames from '@/components/filters/SortGames';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const fetchFilters = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data: platforms, error: platformsError } = await supabase
      .from('platforms')
      .select('*');
    if (platformsError) throw new Error(platformsError.message);

    const { data: genres, error: genresError } = await supabase
      .from('genres')
      .select('*');
    if (genresError) throw new Error(genresError.message);

    return { platforms, genres };
  } catch (error) {
    throw new Error(error as string);
  }
};

const BrowseLayout = async ({ children }: { children: ReactNode }) => {
  const filters = await fetchFilters();
  return (
    <Main>
      <Games>
        <GamesHeader>
          <h2>Games</h2>
          <SortGames />
        </GamesHeader>
        {children}
      </Games>
      <AsideFilter>
        <AsideTitle>Filters</AsideTitle>
        <Filters filters={filters} />
      </AsideFilter>
    </Main>
  );
};

export default BrowseLayout;
