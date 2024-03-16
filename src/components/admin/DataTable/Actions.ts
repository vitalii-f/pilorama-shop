'use server';

import { formatCollectionsData } from '@/helpers/formatter';
import { Tables } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const fetchCollections = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase.from('').select();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCollectionData = async (collectionName: Tables) => {
  const cookieStorage = cookies();
  const supabase = createClient(cookieStorage);

  const collections = formatCollectionsData(await fetchCollections());
  const collectionIndex = collections.findIndex(
    (item) => item.collection === collectionName
  );
  let collectionData = collections[collectionIndex];

  const updatedFields = await Promise.all(
    collectionData.fields.map(async (item) => {
      if (item.isSelect || item.isMultipleSelect) {
        const tableName = item.name.replace('_array', '');
        const { data } = (await supabase.from(tableName).select('*')) as {
          data: { id: number; name: string; value: string }[];
        };
        return { ...item, selectItems: data };
      }
      return item;
    })
  );

  collectionData = { ...collectionData, fields: updatedFields };
  return collectionData;
};
  // try {
  //     const cookieStorage = cookies()
  //     const supabase = createClient(cookieStorage)
  //     const { data, error } = await supabase.from(collectionName).select('*').eq('id', id)
  //     if (error) throw new Error(error.message)

  //     return data[0]
  // } catch (error) {
  //     throw new Error(error as string)
  // }