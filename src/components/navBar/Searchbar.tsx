'use client';

import React, { useEffect } from 'react';
import {
  CardContent,
  Developer,
  GameName,
  Price,
  Search,
  SearchInput,
  SearchResult,
  SearchResultCard,
  SearchResultPreview,
} from './Navbar.styled';
import SearchIcon from '@mui/icons-material/Search';
import { Tables } from '@/types/supabase';
import { searchGame } from './action';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SearchResultProps extends Omit<Tables<'games'>, 'developers'> {
  developers: {
    id: number;
    name: string;
    value: string;
  };
}

const Searchbar = () => {
  const pathname = usePathname();
  const [searchResult, setSearchResult] = React.useState<SearchResultProps[]>();

  const debounced = useDebouncedCallback(async (value) => {
    const result = await searchGame(value);
    setSearchResult(result);
  }, 1000);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchParam = event.target.value;
    if (searchResult && searchParam.length < 3) {
      setSearchResult(undefined);
    }
    if (searchParam.length < 3) return;
    debounced(searchParam);
  };

  useEffect(() => {
    setSearchResult(undefined);
  }, [pathname]);

  return (
    <Search>
      <SearchIcon />
      <SearchInput
        type='text'
        placeholder='Search...'
        onChange={handleSearch}
      />
      {searchResult?.length ? (
        <SearchResult>
          {searchResult.map((result) => (
            <SearchResultCard key={result.capsule}>
              <SearchResultPreview
                src={result.header}
                alt='Game preview'
                width={150}
                height={80}
                priority
              />
              <CardContent>
                <GameName>
                  <Link
                    href={`/games/${result.id}`}
                    onClick={() => setSearchResult(undefined)}
                  >
                    {result.name}
                  </Link>
                </GameName>
                <Developer>{result.developers.name}</Developer>
                <Price>${result.price}</Price>
              </CardContent>
            </SearchResultCard>
          ))}
        </SearchResult>
      ) : searchResult?.length === 0 ? (
        <SearchResult>
          <h2>No Result</h2>
        </SearchResult>
      ) : undefined}
    </Search>
  );
};

export default Searchbar;
