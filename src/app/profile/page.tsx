import React from 'react';
import {
  GeneralProfileHeader,
  GeneralProfileInfo,
  GeneralProfileWrapper,
  Label,
} from './Profile.styled';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { supabase } from '@/helpers/supabase';
import ProfileAvatar from '@/components/profile/avatar/ProfileAvatar';

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

const ProfilePage = async () => {
  const user = await fetchUser();

  if (!user) {
    return <div>Please, login to account!</div>;
  }

  const profile = await fetchProfile();

  return (
    <GeneralProfileWrapper>
      <GeneralProfileHeader>
        <h2>General info</h2>
          <ProfileAvatar avatarURL={profile.avatar} />
      </GeneralProfileHeader>
      <GeneralProfileInfo>
        <Label>
          E-mail:
          <p>{profile.email}</p>
        </Label>
        <Label>
          Login:
          <p>{profile.login}</p>
        </Label>
      </GeneralProfileInfo>
    </GeneralProfileWrapper>
  );
};

export default ProfilePage;
