import React from 'react';
import { AdminAside, Wrapper } from './Admin.styled';
import AdminNavbar from '@/components/admin/AdminNavbar/AdminNavbar';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { supabase } from '@/helpers/supabase';
import { redirect } from 'next/navigation';

const fetchProfile = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw new Error(error.message)
    return data[0];
  } catch (error) {
    throw new Error(error as string)
  }
};

const fetchUser = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  return data.user;
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await fetchUser();
  const profile = await fetchProfile();

  if (profile.role !== 'admin') {
    redirect('/')
  }
  return (
    <Wrapper>
      <AdminAside>
        <AdminNavbar />
      </AdminAside>
      {children}
    </Wrapper>
  );
};

export default AdminLayout;
