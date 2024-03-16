'use client';

import styled from 'styled-components';

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  height: 40px;
  padding: 5px 5px;
  border: unset;
  border-radius: 5px;

  font-size: 16px;
`;

export const SubmitButton = styled.button`
  height: 40px;

  font-size: 18px;

  border-radius: 5px;
  background-color: var(--color-primary);

  cursor: pointer;
`;
