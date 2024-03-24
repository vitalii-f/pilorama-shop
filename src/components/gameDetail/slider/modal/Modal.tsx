import Image from 'next/image';

const Modal = ({ url }: { url: string }) => {
  return (
    <dialog>
      <Image src={url} alt='slider preview' priority fill />
    </dialog>
  );
};

export default Modal;
