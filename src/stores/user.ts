import { supabase } from '@/helpers/supabase';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserState {
  user: User | null;
  status: 'loading' | 'success' | 'reject';
  fetchUser: () => void;
  logOut: () => void;
}

export const userStore = create<UserState>((set) => ({
  user: null,
  status: 'loading',
  fetchUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      set({ user: data.user, status: 'success' });
    }
    if (error) {
      set({ status: 'reject' });
    }
  },
  logOut: async () => {
    const { error } = await supabase.auth.signOut()
    set({ user: null, status: 'success' })
  },
}));
