'use client';

import {
  CollectionInputProps,
  MiltipleImagesProps,
  TableUpdateType,
  Tables,
} from '@/types/types';
import { editCollection, getCollectionInputs } from './CollectionActions';
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
import {
  Backdrop,
  CircularProgress,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import MultipleFileSelect from './MultipleFileSelect';
import { useRouter } from 'next/navigation';

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <SubmitButton type='submit' disabled={pending}>
        EDIT
      </SubmitButton>
      <Backdrop open={pending}>
        <CircularProgress color='primary' size={90} thickness={5} />
      </Backdrop>
    </>
  );
};

const CollectionForm = ({
  collectionName,
  inputValues,
}: {
  collectionName: Tables;
  inputValues: TableUpdateType;
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

  if (!collectionInputs) return;
  return (
    <CollectionFormContainer>
      <Form
        action={(formData) =>
          editCollection(formData, inputValues, collectionName, multipleImage)
        }
      >
        {collectionInputs.map((input) => {
          switch (input.type) {
            case 'number':
              return (
                <TextField
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
                  inputProps={{step: 'any'}}
                />
              );
            case 'text':
              return (
                <TextField
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
              );
            case 'date':
              return (
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
              );
            case 'select_multiple':
              return (
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
              );
            case 'select':
              return (
                <SelectMenu
                  inputProps={input}
                  key={input.name}
                  defaultValue={
                    inputValues &&
                    (inputValues[input.name as keyof TableUpdateType] as string)
                  }
                />
              );
            case 'file_multiple':
              return (
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
              );
            case 'file':
              return (
                <FileSelect
                  inputProps={input}
                  key={input.name}
                  defaultValue={
                    inputValues &&
                    (inputValues[input.name as keyof TableUpdateType] as string)
                  }
                />
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
