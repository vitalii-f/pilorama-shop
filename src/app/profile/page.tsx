import {
  GeneralProfileHeader,
  GeneralProfileInfo,
  GeneralProfileWrapper,
  Label,
} from './Profile.styled';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import ProfileAvatar from '@/components/profile/avatar/ProfileAvatar';

const ProfilePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();
  const { data: profileData } = await supabase.from('profiles').select('*');

  if (!userData.user || !profileData) {
    return <div>Please, login to account!</div>;
  }

  return (
    <GeneralProfileWrapper>
      <GeneralProfileHeader>
        <h2>General info</h2>
        <ProfileAvatar avatarURL={profileData[0].avatar} />
      </GeneralProfileHeader>
      <GeneralProfileInfo>
        <Label>
          E-mail:
          <p>{profileData[0].email}</p>
        </Label>
        <Label>
          Login:
          <p>{profileData[0].login}</p>
        </Label>
      </GeneralProfileInfo>
    </GeneralProfileWrapper>
  );
};

export default ProfilePage;
