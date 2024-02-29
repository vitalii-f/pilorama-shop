'use client';

import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  margin-top: 30px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 30px;

  border-radius: 5px;
  background-color: var(--color-primary);

  cursor: pointer;
`;

export const ResetButton = styled.button`
  width: 100%;
  height: 30px;

  border-radius: 5px;
  background-color: var(--color-dark-red);
  cursor: pointer;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BudgeteInput = styled.input`
  text-align: center;

  width: 70px;
  height: 30px;

  border: unset;
  border-radius: 5px;
  background-color: var(--color-primary);
`;

export const BudgeteInputs = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CheckboxContainer = styled.details`
  display: flex;
  flex-direction: column;
  gap: 10px;

  summary::-webkit-details-marker {
    display: none;
  }
  summary {
    list-style: none;
    cursor: pointer;
  }

  summary::before {
    content: '+';
    width: 15px;

    color: var(--color-primary);
    font-size: 1.5em;
    font-weight: bold;

    cursor: pointer;
  }

  &[open] summary::before {
    content: '-';
  }

  summary {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: background-color 0.3s;

  &:has(input:checked) {
    background-color: var(--color-primary);
  }

  height: 30px;
  padding: 0 5px;
  border-radius: 5px;

  cursor: pointer;
`;

export const StyledCheckbox = styled.input``;
