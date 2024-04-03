'use client';

import { Backdrop, CircularProgress, Slider } from '@mui/material';
import { useRef, useState } from 'react';
import {
  BudgeteInput,
  BudgeteInputs,
  CheckboxContainer,
  CheckboxLabel,
  Form,
  Label,
  ResetButton,
  StyledCheckbox,
  SubmitButton,
} from './Filters.styled';
import { revalidateGames } from './actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';

interface FiltersProps {
  [key: string | 'ganres' | 'platforms']: {
    id: number;
    name: string;
    value: string;
  }[];
}

const Filters = ({ filters }: { filters: FiltersProps }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [budgete, setBudget] = useState<number[]>([0, 100]);
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);

  const formRef = useRef<HTMLFormElement>(null);

  const handleBudgetChange = (_event: Event, newValue: number | number[]) => {
    setBudget(newValue as number[]);
    setDisabledSubmit(false);
  };

  const valuetext = (value: number) => {
    return value.toString();
  };

  const formSubmit = (formData: FormData) => {
    const params = new URLSearchParams();

    const sortBy = searchParams.get('sortBy')
    const page = searchParams.get('page')
    
    if (sortBy) params.set('sortBy', sortBy)
    if (page) params.delete('sortBy', page)

    formData.forEach((value, key) => {
      if (value) {
        params.set(key, formData.getAll(key).join());
      }
    });

    router.replace(`games?${params}`);
    revalidateGames();
    router.refresh();
  };

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
      setBudget([0, 100]);
      setDisabledSubmit(true);
      const sortType = searchParams.get('sortBy');
      if (sortType) {
        router.replace(`games/?sortBy=${sortType}`);
      } else {
        router.replace('games/');
      }
      revalidateGames();
      router.refresh();
    }
  };

  const Submit = () => {
    const { pending } = useFormStatus();

    return (
      <>
        <SubmitButton type='submit' disabled={disabledSubmit}>
          APPLY
        </SubmitButton>
        <Backdrop open={pending}>
          <CircularProgress />
        </Backdrop>
      </>
    );
  };

  return (
    <Form action={formSubmit} ref={formRef}>
      <Submit />
      {!disabledSubmit && (
        <ResetButton type='reset' onClick={resetForm}>
          RESET FILTERS
        </ResetButton>
      )}
      <Label>
        Budget
        <BudgeteInputs>
          <BudgeteInput
            type='number'
            name='budgete-start'
            value={budgete[0]}
            onChange={(event) => {
              setBudget([+event.target.value, budgete[1]]);
              setDisabledSubmit(false);
            }}
          />
          <BudgeteInput
            type='number'
            name='budgete-end'
            value={budgete[1]}
            onChange={(event) => {
              setDisabledSubmit(false);
              setBudget([budgete[0], +event.target.value]);
            }}
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
        <summary>Platform</summary>
        {filters.platforms?.map((item) => (
          <CheckboxLabel key={item.name}>
            {item.name}
            <StyledCheckbox
              type='checkbox'
              value={item.name}
              name='platform'
              onChange={() => setDisabledSubmit(false)}
            />
          </CheckboxLabel>
        ))}
      </CheckboxContainer>
      <CheckboxContainer>
        <summary>Genre</summary>
        {filters.genres?.map((item) => (
          <CheckboxLabel key={item.name}>
            {item.name}
            <StyledCheckbox
              type='checkbox'
              value={item.name}
              name='genre'
              onChange={() => setDisabledSubmit(false)}
            />
          </CheckboxLabel>
        ))}
      </CheckboxContainer>
    </Form>
  );
};

export default Filters;
