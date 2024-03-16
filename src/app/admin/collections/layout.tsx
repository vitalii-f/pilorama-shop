import { CardContainer, CollectionCard } from './Collections.styled';
import Link from 'next/link';

const collections = [
  'games',
  'genres',
  'features',
  'developers',
  'platforms',
  'main_banner',
];

const CollectionsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <CardContainer>
        {collections.map((collectionName) => (
          <CollectionCard key={collectionName}>
            <Link
              href={`/admin/collections/${collectionName}`}
              prefetch={false}
            >
              {collectionName}
            </Link>
          </CollectionCard>
        ))}
      </CardContainer>
      {children}
    </>
  );
};

export default CollectionsLayout;
