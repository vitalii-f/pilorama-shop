'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

interface ActionState {
  status: 'pending' | 'success' | 'error';
  message?: string;
}

export const changeUserPassword = async (
  initialState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const newPassword = formData.get('new_password') as string;
  const newPasswordRepeat = formData.get('new_password_repeat');
  if (newPassword === newPasswordRepeat) {
    const coockieStore = cookies();
    const supabase = createClient(coockieStore);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error)
      return {
        status: 'error',
        message: error.message,
      };

    return {
      status: 'success',
      message: 'New password saved.',
    };
  } else return { status: 'error', message: 'Different input password' };
};

export const changeUserLogin = async (
  initialState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const newLogin = formData.get('new_login') as string;
  const coockieStore = cookies();
  const supabase = createClient(coockieStore);
  const { error } = await supabase.auth.updateUser({
    data: { login: newLogin },
  });
  if (!error) {
    return {
      status: 'success',
      message: 'New login saved.',
    };
  } else {
    return {
      status: 'error',
      message: error.message,
    };
  }
};
