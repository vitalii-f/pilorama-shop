'use client';

import styled from 'styled-components';

export const CollectionFormContainer = styled.div`
  display: flex;
  padding-left: 15px;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  max-width: 500px;
  width: 100%;

  padding: 15px 0 15px 10px;
  background-color: var(--color-background);
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

export const CancelButton = styled.button`
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

export const InputTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PreviewWrapper = styled.div`
  position: relative;
  width: fit-content;
`;
