'use server';

import { revalidatePath } from 'next/cache';

export const revalidateGames = (): void => {
  revalidatePath('/browse/games', 'page');
};
