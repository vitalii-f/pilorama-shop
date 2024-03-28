'use server';

import { FormStateProps } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { ValidationError, object, ref, string } from 'yup';

const updatePasswordSchema = object({
  newPassword: string().min(6).max(16).required(),
  repeatNewPassword: string()
    .min(6)
    .max(16)
    .oneOf([ref('newPassword')], `Passwords don't match`)
    .required(),
});

export const updatePassword = async (
  formData: FormData,
  code: string
): Promise<FormStateProps> => {
  const supabase = createClient();

  const newPassword = formData.get('new_password');
  const repeatNewPassword = formData.get('repeat_new_password');

  const validateData = await updatePasswordSchema
    .validate({
      newPassword,
      repeatNewPassword,
    })
    .catch((error: ValidationError) => {
      return new Error(error.errors[0]);
    });

  if (validateData instanceof Error)
    return {
      status: 'rejected',
      error: validateData.message,
    };

  if (!code)
    return {
      status: 'rejected',
      error: 'Missing code',
    };

  const { error: codeError } = await supabase.auth.exchangeCodeForSession(code);
  if (codeError)
    return {
      status: 'rejected',
      error: codeError.message,
    };

  const { error } = await supabase.auth.updateUser({
    password: newPassword as string,
  });

  if (error)
    return {
      status: 'rejected',
      error: error.message,
    };

  return {
    status: 'success',
    error: `Password's been updated. You can log in to your account`,
  };
};
