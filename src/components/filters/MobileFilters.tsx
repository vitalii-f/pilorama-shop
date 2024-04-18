'use client';

import { Suspense, useState } from 'react';
import Filters from './Filters';
import styled from 'styled-components';
import { Drawer } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface FiltersProps {
  [key: string | 'ganres' | 'platforms']: {
    id: number;
    name: string;
    value: string;
  }[];
}

const MobileFiltersWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileFilters = ({ filters }: { filters: FiltersProps }) => {
  const [open, setOpen] = useState(false);
  return (
    <MobileFiltersWrapper>
      <IconButton onClick={() => setOpen(true)}>
        <FilterAlt />
        Filters
      </IconButton>
      <Drawer
        open={open}
        anchor='right'
        onClose={() => setOpen(false)}
        sx={{ width: '500px' }}
      >
        <Suspense fallback={<p>Loading</p>}>
          <Filters filters={filters} />
        </Suspense>
      </Drawer>
    </MobileFiltersWrapper>
  );
};

export default MobileFilters;
