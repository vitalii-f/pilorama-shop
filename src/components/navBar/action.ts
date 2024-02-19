'use server';

import { supabase } from '@/helpers/supabase';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logout = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const searchGame = async (searchParam: string) => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*, developers(*)')
      .like('name', `%${searchParam}%`)
      .limit(5)
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};
