'use server';

import {
  CollectionFieldType,
  CollectionInputProps,
  CollectionsData,
  ImageFormat,
  MiltipleImagesProps,
  SelectProps,
  TableUpdateType,
  Tables,
} from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface CollectionData {
  [key: string]:
    | number
    | string
    | string[]
    | number[]
    | (string | FileList)[]
    | FormDataEntryValue[]
    | FormDataEntryValue;
}

const collectionFields = [
  'number',
  'text',
  'select_multiple',
  'select',
  'date',
  'img_multiple',
  'img',
];

export const getCollectionInputs = async (collectionName: Tables) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('')
    .select('*')
    .returns<CollectionsData>();
  if (error) throw new Error(error.message);

  const definitions = data.definitions[collectionName];
  const requiredList = definitions.required;
  const propertiesList = definitions.properties;

  const fields = await Promise.all(
    Object.entries(propertiesList).map(async ([key, value]) => {
      const isRequired = !!requiredList?.find((item) => item === key);
      const isMultiple = value.description.includes('multiple');
      const isBlocked = value.description.includes('blocked');

      const includeType = collectionFields.find((type) =>
        value.description.includes(type)
      );
      const type =
        CollectionFieldType[includeType as keyof typeof CollectionFieldType];

      let selectItems: SelectProps[] = [];

      if (type === 'select' || type === 'select_multiple') {
        const { data } = await supabase
          .from(key)
          .select('*')
          .returns<SelectProps[]>();
        if (data) selectItems = data;
      }

      return {
        name: key,
        type,
        isRequired,
        isBlocked,
        selectItems,
        isMultiple,
      };
    })
  );
  return fields;
};

export const addToCollection = async (
  formData: FormData,
  collectionName: string,
  collectionInputs: CollectionInputProps[]
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const uploadImage = async (file: File) => {
    const id = formData.get('name');
    try {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`${collectionName}/${id}/${file.name}`, file);
      if (error) {
        const { data, error } = await supabase.storage
          .from('images')
          .upload(
            `games/${collectionName}/${file.name}_${Math.random() * 100}.${
              ImageFormat[file.type as keyof typeof ImageFormat]
            }`,
            file
          );
        if (error) throw new Error(error.message);
        return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + data.path;
      }
      if (data) return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + data.path;
    } catch (error) {
      return new Error(error as string);
    }
  };

  const insertData: CollectionData = {};

  for (const [key, value] of formData.entries()) {
    const inputReferens = collectionInputs.find((input) => input.name === key);
    switch (inputReferens?.type) {
      case 'select_multiple':
        insertData[key] = formData.getAll(key);
        break;
      case 'file_multiple': {
        if (!insertData[key]) insertData[key] = [];
        const uploadUrl = await uploadImage(value as File);
        if (!uploadUrl || uploadUrl instanceof Error) return;
        (insertData[key] as string[]).push(uploadUrl);
        break;
      }
      case 'file': {
        const uploadUrl = await uploadImage(value as File);
        if (!uploadUrl || uploadUrl instanceof Error) return;
        insertData[key] = uploadUrl;
        break;
      }
      default:
        insertData[key] = value;
    }
  }

  if (Object.keys(insertData).length) {
    const { data, error } = await supabase
      .from(collectionName)
      .insert(insertData);
    console.log(error);
    revalidatePath(`/admin/collections/${collectionName}`);
    redirect(`/admin/collections/${collectionName}`);
  }
};

export const editCollection = async (
  formData: FormData,
  initialValues: TableUpdateType,
  collectionName: string,
  multipleImages: MiltipleImagesProps
) => {
  if (!initialValues) return;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const uploadImage = async (file: File) => {
    try {
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`${collectionName}/${initialValues.id}/${file.name}`, file);
      if (error) {
        const { data, error } = await supabase.storage
          .from('images')
          .upload(
            `games/${collectionName}/${file.name}_${Math.random() * 100}.${
              ImageFormat[file.type as keyof typeof ImageFormat]
            }`,
            file
          );
        if (error) throw new Error(error.message);
        return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + data.path;
      }
      if (data) return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + data.path;
    } catch (error) {
      return new Error(error as string);
    }
  };

  const updateData: CollectionData = {};

  const deleteMultipleImages = async () => {
    const removeImages: string[] = [];

    const entries = Object.entries(multipleImages);
    for (const [key, value] of entries) {
      const images = initialValues[key as keyof TableUpdateType];
      if (images && Array.isArray(images)) {
        images.map((initialItem) => {
          if (!value?.includes(initialItem)) removeImages.push(initialItem);
        });
      }
    }

    const formattedLinks = removeImages.map((item) =>
      item.replace(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL!, '')
    );

    await supabase.storage.from('images').remove(formattedLinks);
  };

  deleteMultipleImages();

  for (const [key, value] of formData.entries()) {
    if (Array.isArray(initialValues[key as keyof TableUpdateType])) {
      if (value instanceof File) {
        if (!updateData[key]) updateData[key] = [...multipleImages[key]];
        if (value.size !== 0) {
          const uploadUrl = await uploadImage(value);
          if (!uploadUrl || uploadUrl instanceof Error) return;
          (updateData[key] as string[]).push(uploadUrl);
        }
      } else {
        if (!updateData[key]) updateData[key] = [];
        const splitedValue = value.split(',');
        splitedValue.map((value) => (updateData[key] as string[]).push(value));
      }
    } else if (value instanceof File) {
      if (value.size !== 0) {
        const uploadUrl = await uploadImage(value);
        if (!uploadUrl || uploadUrl instanceof Error) return;
        updateData[key] = uploadUrl;
      }
    } else {
      if (value !== initialValues[key as keyof TableUpdateType]!.toString()) {
        updateData[key] = value;
      }
    }
  }

  if (Object.keys(updateData).length) {
    await supabase
      .from(collectionName)
      .update(updateData)
      .eq('id', initialValues.id);

    revalidatePath(`/admin/collections/${collectionName}`);
    redirect(`/admin/collections/${collectionName}`);
  }
};

export const deleteFromCollection = async (id: number | string, collection: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from(collection)
      .delete()
      .eq('id', id)
      .select();
    if (error) throw new Error(error.message);
    return data
  } catch (error) {
    throw new Error(error as string);
  }
};
