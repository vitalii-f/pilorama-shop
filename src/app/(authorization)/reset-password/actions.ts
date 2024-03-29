'use server';

import { FormStateProps } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { ValidationError, object, string } from 'yup';

const resetPasswordSchema = object({
  email: string().email().required(),
});

export const resetPassword = async (
  _prevState: FormStateProps,
  formData: FormData
): Promise<FormStateProps> => {
  const supabase = createClient();

  const email = formData.get('email');

  const validateData = await resetPasswordSchema
    .validate({ email })
    .catch((error: ValidationError) => new Error(error.errors[0]));

  if (validateData instanceof Error)
    return {
      status: 'rejected',
      error: validateData.message,
    };

  const { error } = await supabase.auth.resetPasswordForEmail(email as string, {
    redirectTo: process.env.HOST!,
  });

  if (error)
    return {
      status: 'rejected',
      error: error.message,
    };

  return {
    status: 'success',
    message: 'The letter for the reset has been sent. Check your mail.',
  };
};
