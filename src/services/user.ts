'use server';

import { createClient } from '@/utils/supabase/server';

export const fetchUser = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { data: profileData } = await supabase
    .from('profiles')
    .select('id, avatar, role, cart').eq('id', data.user.id);

  if (profileData && profileData[0]) return profileData[0];

  return null;
};

export const fetchCartCount = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { count } = await supabase
    .from('cart')
    .select('*', { count: 'estimated', head: true })
    .eq('user_id', data.user.id);

  return count;
};
