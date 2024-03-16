import { CollectionInputProps } from '@/types/types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

const MultipleSelectMenu = ({
  inputProps,
  defaultValue,
}: {
  inputProps: CollectionInputProps;
  defaultValue?: string[];
}) => {
  const [items, setItems] = useState<string[]>(defaultValue || ['']);

  const handleChange = (event: SelectChangeEvent<typeof items>) => {
    const {
      target: { value },
    } = event;
    setItems(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`label-${inputProps.name}`}>{inputProps.name}</InputLabel>
      <Select
        labelId={`label-${inputProps.name}`}
        id={inputProps.name}
        name={inputProps.name}
        value={items}
        multiple
        onChange={handleChange}
        input={<OutlinedInput label='Name' />}
        required={inputProps.isRequired}
        disabled={inputProps.isBlocked}
      >
        {inputProps.selectItems.map((field) => (
          <MenuItem key={field.value} value={field.name}>
            {field.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectMenu;
