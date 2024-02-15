'use client';

import React from 'react';
import {
  CalncelButton,
  Form,
  FormControlSection,
  SubmitButton,
  VisuallyHiddenInput,
} from './AddForm.styled';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { FieldFormat, ResponseCollectionData } from '@/types/types';
import { submitAddForm } from '@/app/admin/collections/[slug]/add/formAction';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const noRenderList = ['id', 'created_at'];

const SelectMenu = ({
  selectField,
  name,
  required,
}: {
  selectField: { id: number; name: string; value: string }[];
  name: string;
  required: boolean | undefined;
}) => {
  const [value, setValue] = React.useState('');

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
}: {
  selectField: { id: number; name: string; value: string }[];
  name: string;
  required: boolean | undefined;
}) => {
  const [items, setItems] = React.useState<string[]>([]);

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

const AddForm = ({
  collectionData,
  slug,
}: {
  collectionData: ResponseCollectionData;
  slug: string;
}) => {
  return (
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
            />
          ) : field.isSelect ? (
            <SelectMenu
              key={field.name}
              selectField={field.selectItems!}
              name={field.name}
              required={field.isRequired}
            />
          ) : field.name.includes('img') && field.type.includes('[]') ? (
            <React.Fragment key={field.name}>
              <InputLabel id={`${field.name}-label`}>{field.name}</InputLabel>
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
                  multiple
                />
              </Button>
            </React.Fragment>
          ) : field.name.includes('img') ? (
            <React.Fragment key={field.name}>
              <InputLabel id={`${field.name}-label`}>{field.name}</InputLabel>
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
            <LocalizationProvider dateAdapter={AdapterDayjs} key={field.name}>
              <DatePicker name={field.name} />
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
            />
          ))
      )}
      <FormControlSection>
        <SubmitButton type='submit'>ADD</SubmitButton>
        <CalncelButton href={`/admin/collections/${slug}`}>
          Cancel
        </CalncelButton>
      </FormControlSection>
    </Form>
  );
};

export default AddForm;
