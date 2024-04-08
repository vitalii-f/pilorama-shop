'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signup } from './actions';
import {
  Form,
  FormButtons,
  Input,
  Label,
  FormContainer,
  LoginButton,
  TypeSwitch,
} from '../Login.styled';
import { Alert, Backdrop, CircularProgress } from '@mui/material';
import { FormStateProps } from '@/types/types';

const SignupForm = () => {
  const [state, formAction] = useFormState<FormStateProps, FormData>(signup, {
    status: 'loading',
  });

  const isDisabled = state.status === 'success';

  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <>
        <Backdrop open={pending}>
          <CircularProgress />
        </Backdrop>
        <LoginButton formAction={formAction} disabled={pending || isDisabled}>
          Sign up
        </LoginButton>
      </>
    );
  };
  return (
    <FormContainer>
      <Form>
        <Label>
          Email:
          <Input
            id='email'
            name='email'
            type='email'
            required
            disabled={isDisabled}
          />
        </Label>
        <Label>
          Login:
          <Input
            id='login'
            name='login'
            type='text'
            required
            disabled={isDisabled}
          />
        </Label>
        <Label>
          Password:
          <Input
            id='password'
            name='password'
            type='password'
            required
            disabled={isDisabled}
          />
        </Label>
        <FormButtons>
          <SubmitButton />
        </FormButtons>

        {state.status === 'rejected' && (
          <Alert severity='error' sx={{ width: '100%' }}>
            {state.error}
          </Alert>
        )}
        {state.status === 'success' && (
          <Alert severity='success' sx={{ width: '100%' }}>
            Your account is created!
          </Alert>
        )}

        <p>
          You have account? <TypeSwitch href='/login'>Login</TypeSwitch>
        </p>
      </Form>
    </FormContainer>
  );
};

export default SignupForm;
