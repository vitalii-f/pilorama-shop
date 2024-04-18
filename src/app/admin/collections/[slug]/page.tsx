import DataTable from '@/components/admin/DataTable/DataTable';
import { Database } from '@/types/supabase';
import {
  CollectionContainer,
  CollectionControll,
  CollectionHeader,
} from './Collection.styled';
import Link from 'next/link';
import { AddCircle } from '@mui/icons-material';
import { createClient } from '@/utils/supabase/server';

const fetchCollection = async (
  collection: keyof Database['public']['Tables']
) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from(collection).select('*');
    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const CollectionPage = async ({
  params,
}: {
  params: { slug: keyof Database['public']['Tables'] };
}) => {
  const collectionData = await fetchCollection(params.slug);
  return (
    <CollectionContainer>
      <CollectionHeader>
        <h2>{params.slug}</h2>
        <CollectionControll>
          <Link href={`/admin/collections/${params.slug}/add`}>
            <AddCircle fontSize='large' titleAccess='Add to collection' />
          </Link>
        </CollectionControll>
      </CollectionHeader>
      {collectionData.length ? (
        <DataTable data={collectionData} collection={params.slug} />
      ) : (
        <h2>Empty collection</h2>
      )}
    </CollectionContainer>
  );
};

export default CollectionPage;
