'use client';

import React from 'react';
import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from '@mui/material';
import { useFiltersStore } from '@/stores/filters-store';

const Button = styled(IconButton)`
  && {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const FiltersButton = () => {
  const { setOpen } = useFiltersStore((state) => state);

  return (
    <Button onClick={() => setOpen(true)}>
      <FilterAltIcon />
      Filters
    </Button>
  );
};

export default FiltersButton;
