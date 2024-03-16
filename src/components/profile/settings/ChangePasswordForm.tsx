'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Input, Label, SettingsForm, SubmitButton } from './Form.styled';
import { changeUserPassword } from './actions';
import { Alert, Backdrop, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

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
        Change Password
      </SubmitButton>
    </>
  );
};

const ChangePasswordForm = () => {
  const [state, formAction] = useFormState(changeUserPassword, {
    status: 'pending',
  });

  return (
    <SettingsForm action={formAction}>
      <Label>
        New password
        <Input type='password' name='new_password' />
      </Label>
      <Label>
        Repeat new password
        <Input type='password' name='new_password_repeat' />
      </Label>
      <Submit />
      {state.status === 'success' && (
        <Alert icon={<CheckIcon fontSize='inherit' />} severity='success'>
          {state.message}
        </Alert>
      )}
      {state.status === 'error' && (
        <Alert icon={<CheckIcon fontSize='inherit' />} severity='error'>
          {state.message}
        </Alert>
      )}
    </SettingsForm>
  );
};

export default ChangePasswordForm;
