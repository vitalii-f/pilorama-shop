'use server';

import { revalidatePath } from 'next/cache';

export const revalidateGames = async () => {
  revalidatePath('/browse/games', 'page');
};
