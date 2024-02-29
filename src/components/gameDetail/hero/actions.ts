'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const addToFavorite = async (gameId: number) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();

  if (userData.user) {
    await supabase.rpc('update_favorite_games_list', {
      profile_id: userData.user.id,
      game_id: gameId,
    });
  }

  revalidatePath(`/games/${gameId}`);
};

export const addToCart = async (gameId: number) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('cart')
      .insert({
        game_id: gameId,
        status: 'created',
      })
      .select();
    if (error) throw new Error(error.message);

    revalidatePath(`/cart`)

  } catch (error) {
    throw new Error(error as string);
  }
  redirect('/cart')
};
