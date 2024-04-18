'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import {
  CardContent,
  SearchWrapper,
  SearchInput,
  SearchResult,
} from './Navbar.styled';
import { Search } from '@mui/icons-material';
import { Tables } from '@/types/supabase';
import { searchGame } from './action';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import Image from 'next/image';

interface SearchResultProps extends Omit<Tables<'games'>, 'developers'> {
  developers: {
    id: number;
    name: string;
    value: string;
  };
}

const Searchbar = () => {
  const pathname = usePathname();
  const [searchResult, setSearchResult] = useState<SearchResultProps[]>();

  const debounced = useDebouncedCallback(async (value) => {
    const result = await searchGame(value);
    setSearchResult(result);
  }, 1000);

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
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
    <SearchWrapper>
      <Search />
      <SearchInput
        type='text'
        placeholder='Search...'
        onChange={handleSearch}
      />
      {searchResult?.length ? (
        <SearchResult>
          {searchResult.map((result) => (
            <Card key={result.capsule}>
              <CardActionArea
                LinkComponent={Link}
                href={`/games/${result.id}`}
                onClick={() => setSearchResult(undefined)}
              >
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Image
                    src={result.header}
                    alt={result.name}
                    width={100}
                    height={70}
                    style={{ objectFit: 'cover' }}
                  />
                  <CardContent style={{ padding: '5px 0' }}>
                    <Typography
                      fontSize={'clamp(0.9rem, 1.5vw, 1rem)'}
                      whiteSpace={'nowrap'}
                      overflow={'hidden'}
                      textOverflow={'ellipsis'}
                    >
                      {result.name}
                    </Typography>
                    <Typography>${result.price}</Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          ))}
        </SearchResult>
      ) : searchResult?.length === 0 ? (
        <SearchResult>
          <h2>No Result</h2>
        </SearchResult>
      ) : undefined}
    </SearchWrapper>
  );
};

export default Searchbar;
