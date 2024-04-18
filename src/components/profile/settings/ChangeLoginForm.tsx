'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Input, Label, SettingsForm, SubmitButton } from './Form.styled';
import { changeUserLogin } from './actions';
import { Alert, Backdrop, CircularProgress } from '@mui/material';
import { Check } from '@mui/icons-material';

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pending}
      >
        <CircularProgress color='primary' size={90} thickness={5} />
      </Backdrop>
      <SubmitButton type='submit' disabled={pending}>
        Change Login
      </SubmitButton>
    </>
  );
};

const ChangeLoginForm = () => {
  const [state, formAction] = useFormState(changeUserLogin, {
    status: 'pending',
  });

  return (
    <SettingsForm action={formAction}>
      <Label>
        New login
        <Input type='text' name='new_login' />
      </Label>
      <Submit />
      {state.status === 'success' && (
        <Alert icon={<Check fontSize='inherit' />} severity='success'>
          {state.message}
        </Alert>
      )}
      {state.status === 'error' && (
        <Alert icon={<Check fontSize='inherit' />} severity='error'>
          {state.message}
        </Alert>
      )}
    </SettingsForm>
  );
};

export default ChangeLoginForm;
