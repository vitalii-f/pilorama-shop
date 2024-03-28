import { AdminAside, Wrapper } from './Admin.styled';
import AdminNavbar from '@/components/admin/AdminNavbar/AdminNavbar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser()

  if (!data.user) redirect('/')

  const { data: profileData } = await supabase.from('profiles').select('role').eq('id', data.user.id)

  if (profileData && profileData[0] && profileData[0].role !== 'admin') {
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
