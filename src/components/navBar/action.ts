'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const searchGame = async (searchParam: string) => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*, developers(*)')
      .ilike('name', `%${searchParam}%`)
      .limit(5)
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
