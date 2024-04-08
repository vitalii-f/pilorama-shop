import { CollectionInputProps } from '@/types/types';
import { useCallback, useState } from 'react';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'));

const MarkDownInput = ({
  inputProps,
  defaultValue,
}: {
  inputProps: CollectionInputProps;
  defaultValue?: string;
}) => {
  const [value, setValue] = useState<string>(defaultValue ? JSON.parse(defaultValue) : '');

  const handleChange = useCallback((text: string) => {
    setValue(text);
  }, []);

  return (
    <>
      <input
        name={inputProps.name}
        required={inputProps.isRequired}
        disabled={inputProps.isBlocked}
        type='text'
        value={JSON.stringify(value)}
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '0',
          height: '0',
          visibility: 'hidden',
        }}
      />
      <SimpleMDE value={value} onChange={handleChange} />
    </>
  );
};

export default MarkDownInput;
