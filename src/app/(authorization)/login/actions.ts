'use server';

import { FormStateProps } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ValidationError, object, string } from 'yup';

const signInSchema = object({
  email: string().email().required(),
  password: string().min(6).max(16).required(),
});

export const login = async (_prevState: FormStateProps, formData: FormData): Promise<FormStateProps> => {
  const supabase = createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validateData = await signInSchema
    .validate(data)
    .catch((error: ValidationError) => {
      return new Error(error.errors[0]);
    });

  if (validateData instanceof Error)
    return {
      status: 'rejected',
      error: validateData.message,
    };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error)
    return {
      status: 'rejected',
      error: error.message,
    };

  revalidatePath('/', 'layout');
  return redirect('/');
};
