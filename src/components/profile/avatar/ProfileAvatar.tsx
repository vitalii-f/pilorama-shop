'use client';

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { FormEvent, InputHTMLAttributes, useRef } from 'react';
import {
  AvatarDialog,
  AvatarImg,
  AvatarPreview,
  AvatarWrapper,
  ChangeAvatarLine,
  LoadIcon,
  VisuallyHiddenInput,
} from './ProfileAvatar.styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { submitAvatar } from './actions';

const avatarList = [
  'https://tbapzujkfaktkxrwmbgi.supabase.co/storage/v1/object/public/avatars/default/default-1.jpg',
  'https://tbapzujkfaktkxrwmbgi.supabase.co/storage/v1/object/public/avatars/default/default-2.jpg',
  'https://tbapzujkfaktkxrwmbgi.supabase.co/storage/v1/object/public/avatars/default/default-3.jpg',
  'https://tbapzujkfaktkxrwmbgi.supabase.co/storage/v1/object/public/avatars/default/default-4.jpg',
  'https://tbapzujkfaktkxrwmbgi.supabase.co/storage/v1/object/public/avatars/default/default-5.jpg',
  'https://tbapzujkfaktkxrwmbgi.supabase.co/storage/v1/object/public/avatars/default/default-6.jpg',
  'https://tbapzujkfaktkxrwmbgi.supabase.co/storage/v1/object/public/avatars/default/default-7.jpg',
];

const ProfileAvatar = ({ avatarURL }: { avatarURL?: string | null }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [preview, setPreview] = React.useState<File | null>(null);

  const handleUploadAvatar = (event: FormEvent<HTMLInputElement>) => {};

  const handleDialogOpen = () => {
    setOpen(!open);
  };

  return (
    <AvatarWrapper>
      <Avatar
        sx={{ width: 128, height: 128 }}
        src={avatarURL ? avatarURL : undefined}
      ></Avatar>
      <AvatarDialog onClick={handleDialogOpen}>
        <LoadIcon />
      </AvatarDialog>
      <Dialog maxWidth={'xs'} fullWidth open={open} onClose={handleDialogOpen}>
        <DialogTitle>Choose your avatar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose preset or upload your avatar...
          </DialogContentText>
          <Box
            id='avatar-form'
            height={'200px'}
            width={'100%'}
            noValidate
            component='form'
            sx={{
              display: 'flex',
              m: 'auto',
            }}
            ref={formRef}
            action={submitAvatar}
          >
            <ChangeAvatarLine>
              {avatarList.map((avatar) => (
                <label key={avatar}>
                  <input
                    type='radio'
                    name='avatar'
                    value={avatar}
                    onClick={() => {
                      value && setValue(null);
                      preview && setPreview(null);
                    }}
                  />
                  <AvatarImg
                    src={avatar}
                    alt='avatar'
                    width={80}
                    height={80}
                    priority
                  />
                </label>
              ))}
              <Button
                component='label'
                role={undefined}
                variant='contained'
                tabIndex={-1}
                sx={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => formRef.current?.reset()}
              >
                {preview && (
                  <AvatarPreview
                    src={URL.createObjectURL(preview)}
                    width={80}
                    height={80}
                    alt='uploaded avatar'
                    priority
                  />
                )}
                <CloudUploadIcon sx={{ zIndex: '5' }} />
                <VisuallyHiddenInput
                  type='file'
                  name='avatar'
                  onChange={(event) => setPreview(event.target.files![0])}
                />
              </Button>
            </ChangeAvatarLine>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              formRef.current?.requestSubmit();
              handleDialogOpen();
            }}
            type='submit'
          >
            Apply
          </Button>
          <Button onClick={handleDialogOpen}>Close</Button>
        </DialogActions>
      </Dialog>
    </AvatarWrapper>
  );
};

export default ProfileAvatar;
