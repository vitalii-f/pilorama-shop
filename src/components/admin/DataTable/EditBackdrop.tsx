'use client';

import React from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  FieldFormat,
  ResponseCollectionData,
  TableRowType,
  Tables,
} from '@/types/types';
import { submitAddForm } from '@/app/admin/collections/[slug]/add/formAction';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormStatus } from 'react-dom';
import {
  BackdropContainer,
  CancelButton,
  Form,
  FormControlSection,
  SubmitButton,
} from './Backdrop.styled';
import { VisuallyHiddenInput } from '../addForm/AddForm.styled';
import { getCollectionData } from './Actions';
import dayjs from 'dayjs';

const noRenderList = ['id', 'created_at', 'sold_count'];

const SelectMenu = ({
  selectField,
  name,
  required,
  defaultValue,
}: {
  selectField: { id: number; name: string; value: string }[];
  name: string;
  required: boolean | undefined;
  defaultValue: number;
}) => {
  const [value, setValue] = React.useState(defaultValue.toString());

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{name}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        value={value}
        label={name}
        onChange={handleChange}
        name={name}
        required={required}
      >
        {selectField.map((item) => (
          <MenuItem key={item.value} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const MultipleSelectMenu = ({
  selectField,
  name,
  required,
  defaultValue,
}: {
  selectField: { id: number; name: string; value: string }[];
  name: string;
  required: boolean | undefined;
  defaultValue: string[];
}) => {
  const [items, setItems] = React.useState<string[]>(defaultValue);

  const handleChange = (event: SelectChangeEvent<typeof items>) => {
    const {
      target: { value },
    } = event;
    setItems(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`label-${name}`}>{name}</InputLabel>
      <Select
        labelId={`label-${name}`}
        id={name}
        multiple
        value={items}
        onChange={handleChange}
        input={<OutlinedInput label='Name' />}
        required={required}
        name={name}
      >
        {selectField.map((field) => (
          <MenuItem key={field.value} value={field.name}>
            {field.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <SubmitButton type='submit' disabled={pending}>
        ADD
      </SubmitButton>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pending}
      >
        <CircularProgress color='primary' size={90} thickness={5} />
      </Backdrop>
    </>
  );
};

const EditBackdrop = ({
  collectionName,
  open,
  setOpen,
  inputData,
}: {
  collectionName: Tables;
  open: boolean;
  setOpen: (arg: boolean) => void;
  inputData: TableRowType[];
}) => {
  const [collectionData, setCollectionData] =
    React.useState<ResponseCollectionData>();

  React.useEffect(() => {
    getCollectionData(collectionName).then((result) =>
      setCollectionData(result)
    );
  }, [collectionName]);
  if (collectionData && open)
    return (
      <Backdrop open={open}>
        <BackdropContainer>
          <Form action={(formData) => submitAddForm(formData, collectionData)}>
            {collectionData.fields.map(
              (field) =>
                !noRenderList.find((item) => item === field.name) &&
                (field.isMultipleSelect && field.selectItems ? (
                  <MultipleSelectMenu
                    key={field.name}
                    selectField={field.selectItems!}
                    name={field.name}
                    required={field.isRequired}
                    defaultValue={
                      inputData[0][field.name] as unknown as string[]
                    }
                  />
                ) : field.isSelect ? (
                  <SelectMenu
                    key={field.name}
                    selectField={field.selectItems!}
                    name={field.name}
                    required={field.isRequired}
                    defaultValue={inputData[0][field.name] as number}
                  />
                ) : field.name.includes('img') && field.type.includes('[]') ? (
                  <React.Fragment key={field.name}>
                    <InputLabel id={`${field.name}-label`}>
                      {field.name}
                    </InputLabel>
                    <Button
                      component='label'
                      variant='contained'
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload files
                      <VisuallyHiddenInput
                        type='file'
                        name={field.name}
                        required={field.isRequired}
                        multiple
                      />
                    </Button>
                  </React.Fragment>
                ) : field.name.includes('img') ? (
                  <React.Fragment key={field.name}>
                    <InputLabel
                      id={`${field.name}-label`}
                      color='secondary'
                      sx={{ zIndex: '555', color: 'red' }}
                    >
                      {field.name}
                    </InputLabel>
                    <Button
                      component='label'
                      variant='contained'
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <VisuallyHiddenInput
                        type='file'
                        name={field.name}
                        required={field.isRequired}
                      />
                    </Button>
                  </React.Fragment>
                ) : field.type === 'date' ? (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    key={field.name}
                  >
                    <DatePicker
                      name={field.name}
                      defaultValue={dayjs(inputData[0][field.name])}
                    />
                  </LocalizationProvider>
                ) : (
                  <TextField
                    id={`input-${field.name}`}
                    label={field.name}
                    variant='outlined'
                    key={field.name}
                    type={FieldFormat[field.type as keyof typeof FieldFormat]}
                    name={field.name}
                    required={field.isRequired}
                    defaultValue={inputData[0][field.name]}
                  />
                ))
            )}
            <FormControlSection>
              <Submit />
              <CancelButton onClick={() => setOpen(false)}>Cancel</CancelButton>
            </FormControlSection>
          </Form>
        </BackdropContainer>
      </Backdrop>
    );
};

export default EditBackdrop;
