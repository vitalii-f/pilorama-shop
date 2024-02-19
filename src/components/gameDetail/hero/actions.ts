'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const addToFavorite = async (gameId: number) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();

  const { data } = await supabase.rpc('update_favorite_games_list', {
    profile_id: userData.user?.id,
    game_id: gameId,
  });

  revalidatePath(`/games/${gameId}`);
};
