'use server';

import { ImageFormat } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

type AvatarForm = [string, FormDataEntryValue][];

export const submitAvatar = async (formData: FormData) => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const avatar: AvatarForm = [];

  if (!userData.user) throw new Error('UserData is null');

  for (const field of formData.entries()) {
    avatar.push(field);
  }

  if (typeof avatar[0][1] === 'string') {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ avatar: avatar[0][1] })
        .eq('id', userData.user.id);
      if (error) throw new Error(error.message);
    } catch (error) {
      throw new Error(error as string);
    }
  } else if (avatar[0][1] instanceof File) {
    const file = avatar[0][1];

    try {
      const { data: dataStorage, error } = await supabase.storage
        .from('avatars')
        .upload(`${userData.user.id}/${file.name}`, file);
      if (error) {
        const { data: dataStorage, error } = await supabase.storage
          .from('avatars')
          .upload(
            `${userData.user.id}/${file.name}_${Math.random() * 100}.${
              ImageFormat[file.type as keyof typeof ImageFormat]
            }`,
            file
          );
        if (error) throw new Error(error.message);
        if (dataStorage) {
          const path =
            process.env.NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL +
            dataStorage.path;
          await supabase
            .from('profiles')
            .update({ avatar: path })
            .eq('id', userData.user.id);
        }
      }

      if (dataStorage) {
        const path =
          process.env.NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL +
          dataStorage.path;
        await supabase
          .from('profiles')
          .update({ avatar: path })
          .eq('id', userData.user.id);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  revalidatePath('/profile');
};
