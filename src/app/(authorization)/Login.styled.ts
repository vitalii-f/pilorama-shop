'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  width: 100vw;
  height: calc(100vh - 64px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 450px;
  width: 350px;

  padding: 5px;

  border-radius: 8px;
  background-color: #383838a2;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  max-width: 250px;
  width: 100%;
  height: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;

  width: 100%;
`;

export const Input = styled.input`
  height: 40px;
  padding: 5px 5px;
  border: unset;
  border-radius: 5px;

  font-size: 16px;
`;

export const FormButtons = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

export const LoginButton = styled.button`
  width: 140px;
  height: 30px;

  font-size: 18px;

  border-radius: 5px;
  background-color: var(--color-primary);

  cursor: pointer;
`;

export const TypeSwitch = styled(Link)`
  font-size: 16px;
  font-weight: 600;
`;
