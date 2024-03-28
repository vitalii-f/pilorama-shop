'use server';

import { FormStateProps } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ValidationError, object, string } from 'yup';

const signUpSchema = object({
  email: string().email().required(),
  password: string().min(6).max(16).required(),
  login: string().min(5).max(12).required(),
});

export const signup = async (prevState: FormStateProps, formData: FormData): Promise<FormStateProps> => {
  const supabase = createClient();

  const validateData = await signUpSchema
    .validate({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      login: formData.get('login') as string,
    })
    .catch((error: ValidationError) => {
      console.log(error.errors);
      return new Error(error.errors[0]);
    });

  if (validateData instanceof Error)
    return {
      status: 'rejected',
      error: validateData.message,
    };

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        login: formData.get('login') as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);
  if (error)
    return {
      status: 'rejected',
      message: error.message,
    };

  revalidatePath('/', 'layout');
  return redirect('/');
};
