import { CollectionInputProps } from '@/types/types';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

const SelectMenu = ({
    inputProps,
    defaultValue,
  }: {
    inputProps: CollectionInputProps;
    defaultValue?: string;
  }) => {
    const [value, setValue] = useState(defaultValue || '');
  
    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value as string);
    };
  
    return (
      <FormControl fullWidth>
        <InputLabel id={`${inputProps.name}-label`}>{inputProps.name}</InputLabel>
        <Select
          labelId={`${inputProps.name}-label`}
          id={inputProps.name}
          value={value}
          label={inputProps.name}
          onChange={handleChange}
          name={inputProps.name}
          required={inputProps.isRequired}
          disabled={inputProps.isBlocked}
        >
          {inputProps.selectItems.map((item) => (
            <MenuItem key={item.value} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

export default SelectMenu