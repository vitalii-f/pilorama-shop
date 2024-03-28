import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './reset.css';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import NavBar from '@/components/navBar/NavBar';
import ThemeClient from '@/components/themeClient/ThemeClient';
import StyledComponentsRegistry from '@/helpers/registry';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from 'react';
import NavbarLoader from '@/components/navBar/NavbarLoader';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pilorama shop',
  description: 'Online game store',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <AppRouterCacheProvider>
            <ThemeClient>
              <Suspense fallback={<NavbarLoader />}>
                <NavBar />
              </Suspense>
              {children}
              <SpeedInsights />
            </ThemeClient>
          </AppRouterCacheProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
