'use client';

import { Button, IconButton, InputLabel } from '@mui/material';
import { ChangeEvent, memo, useRef, useState } from 'react';
import { CloudUpload, Close, Restore } from '@mui/icons-material';
import { CollectionInputProps } from '@/types/types';
import {
  InputTitle,
  PreviewWrapper,
  VisuallyHiddenInput,
} from './CollectionControl.styled';
import Img from 'next/image';

const FileSelect = ({
  inputProps,
  defaultValue,
}: {
  inputProps: CollectionInputProps;
  defaultValue?: string;
}) => {
  const [loadedImage, setLoadedImage] = useState<File | string | undefined>(
    defaultValue
  );

  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setLoadedImage(event.target.files[0]);
  };

  const Preview = () => {
    if (loadedImage instanceof File)
      return (
        <Img
          key={loadedImage.name}
          src={URL.createObjectURL(loadedImage)}
          alt='preview'
          width={200}
          height={100}
          style={{ height: 'auto' }}
        />
      );

    if (typeof loadedImage === 'string')
      return (
        <Img
          key={loadedImage}
          src={loadedImage}
          alt='preview'
          width={200}
          height={100}
          style={{ width: '100%', height: 'auto' }}
        />
      );
  };

  const RestoreButton = () => {
    if (!defaultValue) return;
    if (!loadedImage || defaultValue !== loadedImage)
      return (
        <IconButton
          onClick={() => {
            ref.current!.value = '';
            setLoadedImage(defaultValue);
          }}
        >
          <Restore />
        </IconButton>
      );
  };

  const RemoveButton = () => {
    if (loadedImage)
      return (
        <IconButton
          sx={{
            position: 'absolute',
            right: '0',
          }}
          onClick={() => setLoadedImage(undefined)}
          color='primary'
        >
          <Close color='error' />
        </IconButton>
      );
  };

  return (
    <>
      <InputTitle>
        <InputLabel id={`${inputProps.name}-label`} color='secondary'>
          {inputProps.name}
        </InputLabel>
        <RestoreButton />
      </InputTitle>

      <PreviewWrapper>
        <Preview />
        <RemoveButton />
      </PreviewWrapper>
      <Button
        component='label'
        variant='contained'
        startIcon={<CloudUpload />}
      >
        Upload file
        <VisuallyHiddenInput
          type='file'
          name={inputProps.name}
          required={!loadedImage}
          disabled={inputProps.isBlocked}
          onChange={handleChange}
          ref={ref}
        />
      </Button>
    </>
  );
};

export default memo(FileSelect);
