import {
  GeneralProfileHeader,
  GeneralProfileInfo,
  GeneralProfileWrapper,
  Label,
} from './Profile.styled';
import { createClient } from '@/utils/supabase/server';
import ProfileAvatar from '@/components/profile/avatar/ProfileAvatar';

const ProfilePage = async () => {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return <div>Please, login to account!</div>;
  
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userData.user?.id);
  if (error) throw new Error(error.message);

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
