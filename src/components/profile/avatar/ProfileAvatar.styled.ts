'use client';

import styled from 'styled-components';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Image from 'next/image';

export const AvatarWrapper = styled.div`
  position: relative;

  width: 128px;
  height: 128px;

  border-radius: 100%;

  overflow: hidden;
`;

export const AvatarDialog = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0px;

  transform: translateY(80%);

  width: 100%;
  height: 100%;
  background-color: #2c292aaf;

  transition: transform 0.5s;

  &:hover {
    transform: translateY(0%);
  }

  &:hover svg {
    transition: all 0.5s;

    transform: translateY(0%);
    font-size: 40px;
  }

  cursor: pointer;
`;

export const LoadIcon = styled(CloudDownloadIcon)`
  && {
    transition: all 0.5s;
  }

  transform: translateY(-200%);
`;

export const ChangeAvatarLine = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, 80px);
  justify-content: space-between;
  column-gap: 20px;
  row-gap: 20px;

  width: 100%;

  input[type='radio'] {
    width: 0px;
    height: 0px;
  }

  input[type='radio']:checked + img {
    outline: 3px solid var(--color-primary);
    transition: all 0.2s;
  }
`;

export const AvatarImg = styled(Image)`
  border-radius: 100%;

  cursor: pointer;
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

export const AvatarPreview = styled(Image)`
  position: absolute;
  border: 3px solid yellow;
  border-radius: 100%;
  z-index: 0;
`;
