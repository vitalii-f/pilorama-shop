'use server';

import { supabase } from '@/helpers/supabase';
import { ResponseCollectionData, TableInsertType } from '@/types/types';
import { redirect } from 'next/navigation';

export const submitForm = async (formData: FormData, collection: string) => {
  'use server';

  const form = Object.fromEntries(formData.entries());
  for (const key in form) {
    if (key.includes('$ACTION')) {
      delete form[key];
    }
  }

  // const request = await fetch('http://localhost:3000/api/collection', {
  //   method: 'POST',
  //   body: JSON.stringify({collection: data.collection, data: form})
  // })

  // if (request) {
  //   redirect(`/admin/collections/${params.slug}`);
  // }
};

enum ImageFormat {
  'image/jpeg' = 'jpg',
  'image/png' = 'png',
  'image/x-icon' = 'ico',
}

interface FordmDataAdditional {
  type: 'image/jpeg' | 'image/png' | 'image/x-icon';
  name: string;
}

export const submitAddForm = async (
  formData: FormData,
  collectionData: ResponseCollectionData
) => {
  'use server';

  const form: any = {};

  const uploadImage = async (file: File) => {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`games/${file.name}`, file);
    if (error) {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(
          `games/${file.name}_${Math.random() * 100}.${ImageFormat[file.type as keyof typeof ImageFormat]}`,
          file
        );
      if (data) return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + data.path;
    }
    if (data) return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + data.path;
  };

  const uploadPromises = [];

  for (const [key, value] of formData.entries()) {
    if (key.includes('_array')) {
      if (value instanceof File) {
        if (!Array.isArray(form[key])) {
          form[key] = [];
        }
        const promise = uploadImage(value).then((img) => form[key].push(img));
        uploadPromises.push(promise);
      } else {
        form[key] = value.split(',');
      }
    } else {
      if (value instanceof File) {
        const promise = uploadImage(value).then((img) => (form[key] = img));
        uploadPromises.push(promise);
      } else {
        form[key] = value;
      }
    }
  }
  await Promise.allSettled(uploadPromises);

  const sendData = async () => {
    try {
      const { data, error } = await supabase
        .from(collectionData.collection)
        .insert(form as unknown as TableInsertType)
        .select();
      if (error) throw new Error(error.message);
    } catch (error) {
      throw new Error(error as string);
    }
    redirect(`/admin/collections/${collectionData.collection}`);
  };
  await sendData();
};
