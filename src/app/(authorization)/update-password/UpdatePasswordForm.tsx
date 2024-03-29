'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Form,
  FormButtons,
  Wrapper,
  Input,
  Label,
  FormContainer,
  LoginButton,
} from '../Login.styled';
import { updatePassword } from './actions';
import { Alert, Backdrop, CircularProgress } from '@mui/material';
import { FormStateProps } from '@/types/types';

const UpdatePasswordForm = ({ code }: { code: string }) => {
  const [state, formAction] = useFormState<FormStateProps, FormData>(
    (_state, formData) => updatePassword(formData, code),
    { status: 'loading' }
  );

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <>
        <Backdrop open={pending}>
          <CircularProgress />
        </Backdrop>
        <LoginButton formAction={formAction}>Change password</LoginButton>
      </>
    );
  };
  return (
    <Wrapper>
      <FormContainer>
        <Form>
          <Label htmlFor='password'>
            New password:
            <Input
              id='new_password'
              name='new_password'
              type='password'
              required
            />
          </Label>
          <Label htmlFor='password'>
            Repeat new password:
            <Input
              id='repeat_new_password'
              name='repeat_new_password'
              type='password'
              required
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
              Password changed!
            </Alert>
          )}
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default UpdatePasswordForm;
