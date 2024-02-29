'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { revalidateGames } from './actions';

const SortGames = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortType, setSortType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const sortType = event.target.value;
    setSortType(sortType);
    if (!searchParams.size) {
      router.replace(`games?sortBy=${sortType}`);
      revalidateGames();
      router.refresh();
    } else if (searchParams.size && !searchParams.get('sortBy')) {
      const searchString = searchParams.toString();
      router.replace(`games?${searchString}&sortBy=${sortType}`);
      revalidateGames();
      router.refresh();
    } else if (searchParams.size && searchParams.get('sortBy')) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('sortBy', sortType);

      router.replace(`games?${params}`);
      revalidateGames();
      router.refresh();
    }
  };

  return (
    <FormControl variant='standard' sx={{ m: -2, minWidth: 120 }}>
      <InputLabel id='demo-simple-select-standard-label'>Sort By</InputLabel>
      <Select
        labelId='sort by'
        id='sort'
        value={sortType}
        onChange={handleChange}
        label='Sort By'
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        <MenuItem value={'release_date'}>Release Date</MenuItem>
        <MenuItem value={'price'}>Price</MenuItem>
        <MenuItem value={'name'}>Name</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortGames;
