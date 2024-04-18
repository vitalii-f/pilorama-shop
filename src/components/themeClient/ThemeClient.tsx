'use client';

import { theme } from '@/theme/theme';
import { ThemeProvider } from '@mui/material';
import { createContext } from 'react';

export const ColorModeContext = createContext('dark');

export default function ThemeClient({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ColorModeContext.Provider value='dark'>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
