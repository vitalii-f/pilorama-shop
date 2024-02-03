'use client';

import { CircularProgress, Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  BudgeteInput,
  BudgeteInputs,
  CheckboxContainer,
  CheckboxLabel,
  Form,
  Label,
  StyledCheckbox,
  SubmitButton,
} from './Filters.styled';
import { Filters } from '@/types/types';
import { getFeatures, getGenres, getPlatforms } from '@/app/api/filters';

const submitFilters = async (formData: FormData) => {
  console.log(formData.getAll('platform'));
};

interface FiltersStateProps {
  id: number;
  name: string;
  value: string;
}

const Filters = ({ filtersList }: { filtersList: Filters[] }) => {
  const [budgete, setBudget] = useState<number[]>([5, 50]);

  const [platform, setPlatform] = useState<FiltersStateProps[]>();
  const [genre, setGenre] = useState<FiltersStateProps[]>();
  const [features, setFeatures] = useState<FiltersStateProps[]>();

  const [status, setStatus] = useState<'loading' | 'loaded'>('loading');

  const handleBudgetChange = (event: Event, newValue: number | number[]) => {
    setBudget(newValue as number[]);
  };

  const valuetext = (value: number) => {
    return value.toString();
  };

  useEffect(() => {
    getPlatforms().then((value) => setPlatform(value as FiltersStateProps[]));
    getGenres().then((value) => setGenre(value as FiltersStateProps[]));
    getFeatures().then((value) => setFeatures(value as FiltersStateProps[]));
    setStatus('loaded');
  }, []);

  if (status === 'loading') return <CircularProgress />;

  return (
    <>
      <Form action={submitFilters}>
        <SubmitButton type='submit'>APPLY</SubmitButton>
        <Label>
          Budget
          <BudgeteInputs>
            <BudgeteInput
              type='number'
              name='budgete-start'
              value={budgete[0]}
              onChange={(event) => setBudget([+event.target.value, budgete[1]])}
            />
            <BudgeteInput
              type='number'
              name='budgete-end'
              value={budgete[1]}
              onChange={(event) => setBudget([budgete[0], +event.target.value])}
            />
          </BudgeteInputs>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={budgete}
            onChange={handleBudgetChange}
            valueLabelDisplay='auto'
            getAriaValueText={valuetext}
          />
        </Label>

        <CheckboxContainer>
          Platform
          {platform?.map((item) => (
            <CheckboxLabel key={item.name}>
              {item.name}
              <StyledCheckbox
                type='checkbox'
                value={item.value}
                name='platform'
              />
            </CheckboxLabel>
          ))}
        </CheckboxContainer>

        <CheckboxContainer>
          Features
          {features?.map((item) => (
            <CheckboxLabel key={item.name}>
              {item.name}
              <StyledCheckbox
                type='checkbox'
                value={item.value}
                name='features'
              />
            </CheckboxLabel>
          ))}
        </CheckboxContainer>

        <CheckboxContainer>
          Genre
          {genre?.map((item) => (
            <CheckboxLabel key={item.name}>
              {item.name}
              <StyledCheckbox type='checkbox' value={item.value} name='genre' />
            </CheckboxLabel>
          ))}
        </CheckboxContainer>
      </Form>
    </>
  );
};

export default Filters;
