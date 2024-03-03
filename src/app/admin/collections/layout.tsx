import { CardContainer, CollectionCard } from './Collections.styled';
import Link from 'next/link';
import { CollectionsData } from '@/types/types';
import { formatCollectionsData } from '@/helpers/formatter';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const fetchCollections = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    const { data, error } = await supabase.from('').select();
    if (!data || error) throw new Error(error.message);

    const res = formatCollectionsData(data as CollectionsData[])

    return res;
  } catch (error) {
    throw new Error(error as string);
  }
};

const CollectionsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const collectionsData = await fetchCollections();
  return (
    <>
      <CardContainer>
        {collectionsData.map((item) => (
          <CollectionCard key={item.collection}>
            <Link href={`/admin/collections/${item.collection}`}>
              {item.collection}
            </Link>
          </CollectionCard>
        ))}
      </CardContainer>
      {children}
    </>
  );
};

export default CollectionsLayout;
