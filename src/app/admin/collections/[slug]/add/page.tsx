import { Container } from './AddDataPage.styled';
import { formatCollectionsData } from '@/helpers/formatter';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import CollectionForm from '@/components/admin/collectionControl/CollectionForm';
import { Tables } from '@/types/types';

const fetchData = async () => {
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

const AddDataPage = async ({ params }: { params: { slug: Tables } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const res = formatCollectionsData(await fetchData());
  const collectionIndex = res.findIndex(
    (item) => item.collection === params.slug
  );
  let collectionData = res[collectionIndex];

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

  return (
    <Container>
      <h2>
        Add to <u>{collectionData.collection}</u>
      </h2>
      <CollectionForm collectionName={params.slug} />
    </Container>
  );
};

export default AddDataPage;
