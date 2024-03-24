import Image from 'next/image';

const PreviewPage = ({ searchParams }: { searchParams: { url: string} }) => {
  const url = searchParams.url;
  return (
    <Image
      src={url}
      alt='slider preview'
      priority
      fill
      style={{ width: '100%', objectFit: 'contain' }}
    />
  );
};

export default PreviewPage;
