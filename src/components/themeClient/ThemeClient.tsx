'use client';

import { theme } from '@/theme/theme';
import { lightTheme } from '@/theme/lightTheme'
import { ThemeProvider } from '@mui/material';
import { createContext, useContext, useState } from 'react';
import { useThemeStore } from '@/stores/theme-store';

export const ColorModeContext = createContext('dark');

export default function ThemeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme: colorTheme } = useThemeStore((state) => state)
  return (
    <ColorModeContext.Provider value='dark'>
      <ThemeProvider theme={colorTheme === 'dark' ? theme : lightTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
