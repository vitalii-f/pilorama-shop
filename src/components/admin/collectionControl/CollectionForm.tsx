'use client';

import {
  CollectionInputProps,
  MiltipleImagesProps,
  TableUpdateType,
  Tables,
} from '@/types/types';
import {
  addToCollection,
  editCollection,
  getCollectionInputs,
} from './CollectionActions';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MultipleSelectMenu from './MultipleSelectMenu';
import SelectMenu from './SelectMenu';
import FileSelect from './FileSelect';
import {
  CancelButton,
  CollectionFormContainer,
  Form,
  FormControlSection,
  SubmitButton,
} from './CollectionControl.styled';
import { useFormStatus } from 'react-dom';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import MultipleFileSelect from './MultipleFileSelect';
import { useRouter } from 'next/navigation';

const CollectionForm = ({
  collectionName,
  inputValues,
}: {
  collectionName: Tables;
  inputValues?: TableUpdateType;
}) => {
  const router = useRouter();
  const [collectionInputs, setCollectionInputs] =
    useState<CollectionInputProps[]>();

  const [multipleImage, setMultipleImage] = useState<MiltipleImagesProps>({});

  useEffect(() => {
    const getInputs = async () => {
      const res = await getCollectionInputs(collectionName);
      setCollectionInputs(res);
    };
    getInputs();
  }, [collectionName]);

  const Submit = () => {
    const { pending } = useFormStatus();

    return (
      <>
        <SubmitButton type='submit' disabled={pending}>
          {inputValues ? 'EDIT' : 'ADD'}
        </SubmitButton>
        <Backdrop open={pending} sx={{zIndex: '5'}}>
          <CircularProgress color='primary' size={90} thickness={5} />
        </Backdrop>
      </>
    );
  };

  if (!collectionInputs) return;
  return (
    <CollectionFormContainer>
      <Form
        action={(formData) =>
          inputValues
            ? editCollection(
                formData,
                inputValues,
                collectionName,
                multipleImage
              )
            : addToCollection(formData, collectionName, collectionInputs)
        }
      >
        {collectionInputs.map((input) => {
          switch (input.type) {
            case 'number':
              return (
                !input.isBlocked && (
                  <TextField
                    key={input.name}
                    name={input.name}
                    label={input.name}
                    type='number'
                    required={input.isRequired}
                    disabled={input.isBlocked}
                    defaultValue={
                      inputValues &&
                      inputValues[input.name as keyof TableUpdateType]
                    }
                    inputMode='numeric'
                    inputProps={{ step: 'any' }}
                  />
                )
              );
            case 'text':
              return (
                !input.isBlocked && (
                  <TextField
                    key={input.name}
                    name={input.name}
                    label={input.name}
                    type='text'
                    required={input.isRequired}
                    disabled={input.isBlocked}
                    defaultValue={
                      inputValues &&
                      inputValues[input.name as keyof TableUpdateType]
                    }
                  />
                )
              );
            case 'date':
              return (
                !input.isBlocked && (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    key={input.name}
                  >
                    <DatePicker
                      name={input.name}
                      label={input.name}
                      disabled={input.isBlocked}
                      defaultValue={
                        inputValues &&
                        dayjs(inputValues[input.name as keyof TableUpdateType])
                      }
                    />
                  </LocalizationProvider>
                )
              );
            case 'select_multiple':
              return (
                !input.isBlocked && (
                  <MultipleSelectMenu
                    inputProps={input}
                    key={input.name}
                    defaultValue={
                      inputValues &&
                      (inputValues[
                        input.name as keyof TableUpdateType
                      ] as unknown as string[])
                    }
                  />
                )
              );
            case 'select':
              return (
                !input.isBlocked && (
                  <SelectMenu
                    inputProps={input}
                    key={input.name}
                    defaultValue={
                      inputValues &&
                      (inputValues[
                        input.name as keyof TableUpdateType
                      ] as string)
                    }
                  />
                )
              );
            case 'file_multiple':
              return (
                !input.isBlocked && (
                  <MultipleFileSelect
                    inputProps={input}
                    key={input.name}
                    defaultValue={
                      inputValues &&
                      (inputValues[
                        input.name as keyof TableUpdateType
                      ] as unknown as string[])
                    }
                    setImages={setMultipleImage}
                  />
                )
              );
            case 'file':
              return (
                !input.isBlocked && (
                  <FileSelect
                    inputProps={input}
                    key={input.name}
                    defaultValue={
                      inputValues &&
                      (inputValues[
                        input.name as keyof TableUpdateType
                      ] as string)
                    }
                  />
                )
              );
            default:
              return <></>;
          }
        })}
        <FormControlSection>
          <Submit />
          <CancelButton type='reset' onClick={() => router.back()}>
            Cancel
          </CancelButton>
        </FormControlSection>
      </Form>
    </CollectionFormContainer>
  );
};

export default CollectionForm;
