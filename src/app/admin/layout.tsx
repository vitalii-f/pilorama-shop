import React from 'react';
import { AdminAside, Wrapper } from './Admin.styled';
import AdminNavbar from '@/components/admin/AdminNavbar/AdminNavbar';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();
  const { data: profileData } = await supabase.from('profiles').select('*')

  if (profileData && profileData[0].role !== 'admin') {
    redirect('/');
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
