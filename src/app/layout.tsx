import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './reset.css';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import NavBar from '@/components/navBar/NavBar';
import ThemeClient from '@/components/themeClient/ThemeClient';
import StyledComponentsRegistry from '@/helpers/registry';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { SpeedInsights } from '@vercel/speed-insights/next';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pilorama store',
  description: 'Online game store',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();

  const { data: profileData } = await supabase.from('profiles').select('*');

  let cartItemsCount = undefined;

  if (userData.user) {
    const { count } = await supabase
      .from('cart')
      .select('*', { count: 'estimated', head: true })
      .eq('user_id', userData.user.id);
    cartItemsCount = count;
  }

  return (
    <html lang='en'>
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <AppRouterCacheProvider>
            <ThemeClient>
              <NavBar
                user={userData.user}
                avatarURL={profileData ? profileData[0].avatar : null}
                role={profileData ? profileData[0].role : 'user'}
                cartItems={cartItemsCount}
              />
              {children}
              <SpeedInsights />
            </ThemeClient>
          </AppRouterCacheProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
