import { FormContainer } from '../Login.styled';
import { createClient } from '@/utils/supabase/server';
import UpdatePasswordForm from './UpdatePasswordForm';

const UpdatePasswordPage = async ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser()
  
  if (data.user) {
    return (
        <FormContainer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',
            height: '100px',
          }}
        >
          <h1 style={{ fontSize: '18px' }}>You can login to your account.</h1>
        </FormContainer>
    );
  }

  return <UpdatePasswordForm code={searchParams.code} />;
};

export default UpdatePasswordPage;
