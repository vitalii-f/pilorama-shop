'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Form,
  FormButtons,
  Input,
  Label,
  FormContainer,
  LoginButton,
} from '../Login.styled';
import { resetPassword } from './actions';
import { Alert, Backdrop, CircularProgress } from '@mui/material';
import { FormStateProps } from '@/types/types';

const ResetPasswordForm = () => {
  const [state, formAction] = useFormState<FormStateProps, FormData>(
    resetPassword,
    {
      status: 'loading',
    }
  );

  const isDisabled = state.status === 'success';

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <>
        <Backdrop open={pending}>
          <CircularProgress />
        </Backdrop>
        <LoginButton formAction={formAction} disabled={pending || isDisabled}>
          Send email
        </LoginButton>
      </>
    );
  };

  return (
    <FormContainer>
      <Form>
        <Label htmlFor='email'>
          Email:
          <Input
            id='email'
            name='email'
            type='email'
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
            {state.message}
          </Alert>
        )}
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordForm;
