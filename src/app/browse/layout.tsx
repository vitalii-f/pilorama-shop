import { ReactNode, Suspense } from 'react';
import {
  AsideFilter,
  AsideTitle,
  Games,
  GamesHeader,
  Main,
  SearchControl,
} from './page.styled';
import Filters from '@/components/filters/Filters';
import SortGames from '@/components/filters/SortGames';
import { createClient } from '@/utils/supabase/client';
import MobileFilters from '@/components/filters/MobileFilters';

const fetchFilters = async () => {
  const supabase = createClient();
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
          <SearchControl>
            <Suspense fallback={<p>Loading</p>}>
              <SortGames />
            </Suspense>
            <MobileFilters filters={filters} />
          </SearchControl>
        </GamesHeader>
        {children}
      </Games>
      <AsideFilter>
        <AsideTitle>Filters</AsideTitle>
        <Suspense fallback={<p>Loading</p>}>
          <Filters filters={filters} />
        </Suspense>
      </AsideFilter>
    </Main>
  );
};

export default BrowseLayout;
