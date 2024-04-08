import { cache } from 'react';
import { createClient } from '../supabase/server';

export const fetchGameData = cache(async (id: number) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*, developers(*), publishers(*)')
      .eq('id', id);
    if (error) throw new Error(error.message);

    return data[0];
  } catch (error) {
    throw new Error(error as string);
  }
});

export const fetchTrending = cache(async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('games')
      .select('id, name, price, header, platforms')
      .order('views', { ascending: false })
      .limit(3);
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
});
