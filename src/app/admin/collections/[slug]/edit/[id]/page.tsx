import CollectionForm from '@/components/admin/collectionControl/CollectionForm';
import { Tables } from '@/types/types';
import { createClient } from '@/utils/supabase/client';

const EditCollectionPage = async ({
  params,
}: {
  params: { id: number; slug: Tables };
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(params.slug)
    .select('*')
    .eq('id', params.id);
  if (error) throw new Error(error.message);

  return <CollectionForm collectionName={params.slug} inputValues={data[0]} />;
};

export default EditCollectionPage;
