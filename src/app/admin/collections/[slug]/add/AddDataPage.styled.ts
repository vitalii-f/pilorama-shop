'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;

  max-width: 800px;
  width: 100%;

  padding: 10px 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  max-width: 350px;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 12px;

  input {
    height: 30px;
    border: unset;
    border-radius: 5px;

    padding: 5px;

    font-size: 16px;
  }
`;

export const FormControl = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const SubmitButton = styled.button`
  height: 40px;
  width: 50%;

  background-color: var(--color-primary);

  border: unset;
  border-radius: 8px;

  cursor: pointer;

  transition: filter 0.2s;

  &:hover {
    /* box-shadow: var(--glow-dark-blue); */
    filter: var(--shadow-dark-blue);
  }
`;

export const CancelButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 40px;
  width: 50%;

  border: unset;
  border-radius: 8px;

  background-color: var(--color-dark-red);

  cursor: pointer;

  transition: filter 0.2s;

  &:hover {
    /* box-shadow: var(--glow-dark-blue); */
    filter: var(--shadow-dark-red);
  }
`;
