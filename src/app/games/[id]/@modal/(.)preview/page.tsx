import ImagePreview from './ImagePreview';

const page = ({ searchParams }: { searchParams: { url: string} }) => {
  return <ImagePreview url={searchParams.url} />;
};

export default page;
