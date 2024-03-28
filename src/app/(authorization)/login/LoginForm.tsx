'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login } from './actions';
import {
  Form,
  FormButtons,
  Wrapper,
  Input,
  Label,
  FormContainer,
  LoginButton,
  TypeSwitch,
} from '../Login.styled';
import { Alert, Backdrop, CircularProgress } from '@mui/material';
import { FormStateProps } from '@/types/types';

const LoginForm = () => {
  const [state, formAction] = useFormState<FormStateProps, FormData>(login, {
    status: 'loading',
  });

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <>
        <Backdrop open={pending}>
          <CircularProgress />
        </Backdrop>
        <LoginButton formAction={formAction}>Log in</LoginButton>
      </>
    );
  };

  return (
    <Wrapper>
      <FormContainer>
        <Form>
          <Label htmlFor='email'>
            Email:
            <Input id='email' name='email' type='email' required />
          </Label>
          <Label htmlFor='password'>
            Password:
            <Input id='password' name='password' type='password' required />
          </Label>
          <FormButtons>
            <SubmitButton />
          </FormButtons>
          <p>
            Don`t have account? <TypeSwitch href='/signup'>Sign up</TypeSwitch>
          </p>
          <p>
            Forgot password?
            <TypeSwitch href='/reset-password'> Reset</TypeSwitch>
          </p>
          {state.status === 'rejected' && (
            <Alert severity='error' sx={{ width: '100%' }}>
              {state.error}
            </Alert>
          )}
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default LoginForm;
