'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  max-width: 350px;
  width: 100%;
`;

export const FormControlSection = styled.div`
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

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
