'use server';

import { createClient } from '@/utils/supabase/server';

interface ActionState {
  status: 'pending' | 'success' | 'error';
  message?: string;
}

export const changeUserPassword = async (
  _initialState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const newPassword = formData.get('new_password') as string;
  const newPasswordRepeat = formData.get('new_password_repeat');
  if (newPassword === newPasswordRepeat) {
    const supabase = createClient();
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
  _initialState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const newLogin = formData.get('new_login') as string;
  const supabase = createClient();
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
