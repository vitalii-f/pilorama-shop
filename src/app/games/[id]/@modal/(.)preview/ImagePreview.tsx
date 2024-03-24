'use client';

import { Modal } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ImagePreview = ({ url }: { url: string }) => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const style = {
    position: 'relative' as 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '70%',
    outline: 'none',
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <div style={style}>
        <Image
          src={url}
          alt='slider preview'
          priority
          fill
          sizes='100vw'
          style={{ objectFit: 'contain' }}
        />
      </div>
    </Modal>
  );
};

export default ImagePreview;
