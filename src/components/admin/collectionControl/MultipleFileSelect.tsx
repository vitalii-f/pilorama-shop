'use client';

import { Button, IconButton, InputLabel } from '@mui/material';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CloudUpload, Close, Restore } from '@mui/icons-material';
import { CollectionInputProps, MiltipleImagesProps } from '@/types/types';
import {
  InputTitle,
  PreviewWrapper,
  VisuallyHiddenInput,
} from './CollectionControl.styled';
import Img from 'next/image';

const MultipleFileSelect = ({
  inputProps,
  defaultValue,
  setImages,
}: {
  inputProps: CollectionInputProps;
  defaultValue?: string[];
  setImages: Dispatch<SetStateAction<MiltipleImagesProps>>;
}) => {
  const [loadedImage, setLoadedImage] = useState<
    Array<FileList | string> | undefined
  >(defaultValue);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValue) setImages({ [inputProps.name]: defaultValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    if (!defaultValue) return setLoadedImage([event.target.files]);

    setLoadedImage((prev) => {
      if (!prev || !event.target.files) return;
      return [...prev, event.target.files];
    });
  };

  const Preview = () => {
    if (!loadedImage) return;
    return loadedImage.map((item) => {
      if (item instanceof FileList) {
        return Array.from(item).map((file) => (
          <Img
            key={file.name}
            src={URL.createObjectURL(file)}
            alt='preview'
            width={200}
            height={100}
            style={{ height: 'auto' }}
          />
        ));
      }

      if (typeof item === 'string')
        return (
          <PreviewWrapper key={item}>
            <Img
              src={item}
              alt='preview'
              width={200}
              height={100}
              style={{ width: '100%', height: 'auto' }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                right: '0',
              }}
              onClick={() => handleRemove(item)}
              color='primary'
            >
              <Close color='error' />
            </IconButton>
          </PreviewWrapper>
        );
    });
  };
  const handleRemove = (removeItem: string | FileList) => {
    if (!loadedImage) return;
    setLoadedImage((prev) => prev?.filter((item) => item !== removeItem));
    setImages((prev) => {
      if (!prev || !prev[inputProps.name]) return prev;
      const newList = prev[inputProps.name]!.filter(
        (item) => item !== removeItem
      );
      return { ...prev, [inputProps.name]: newList };
    });
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

  return (
    <>
      <InputTitle>
        <InputLabel id={`${inputProps.name}-label`} color='secondary'>
          {inputProps.name}
        </InputLabel>
        <RestoreButton />
      </InputTitle>
      <Preview />
      <Button component='label' variant='contained' startIcon={<CloudUpload />}>
        Upload file
        <VisuallyHiddenInput
          type='file'
          name={inputProps.name}
          required={!loadedImage}
          disabled={inputProps.isBlocked}
          multiple={inputProps.isMultiple}
          onChange={handleChange}
          ref={ref}
        />
      </Button>
    </>
  );
};

export default memo(MultipleFileSelect);
