"use client"

import { theme } from "@/theme/theme";
import { ThemeProvider } from "@mui/material";

export default function ThemeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
} 