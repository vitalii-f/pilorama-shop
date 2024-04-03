'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { revalidateGames } from './actions';
import { useState } from 'react';

const SortGames = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortType, setSortType] = useState('release_date');

  const handleChange = (event: SelectChangeEvent) => {
    const sortType = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', sortType);

    setSortType(sortType);
    
    router.replace(`games?${params}`);
    revalidateGames();
    router.refresh();
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
        <MenuItem value={'release_date'}>Release Date</MenuItem>
        <MenuItem value={'price'}>Price</MenuItem>
        <MenuItem value={'name'}>Name</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortGames;
