'use client';

import { useFiltersStore } from '@/stores/filters-store';
import { Drawer } from '@mui/material';
import React, { ReactNode } from 'react';

const FiltersDrawer = ({ children }: { children: ReactNode }) => {
  const { open, setOpen } = useFiltersStore((state) => state);
  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={() => setOpen(false)}
      sx={{ width: '500px' }}
    >
      {children}
    </Drawer>
  );
};

export default FiltersDrawer;
