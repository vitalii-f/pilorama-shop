'use client';

import { useState } from 'react';
import { Visibility } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GameKeyContainer, GameKeyInput } from './GameKey.styled';

const GameKey = ({ value }: { value: string }) => {
  const [type, setType] = useState<'text' | 'password'>('password');

  const handleClick = () => {
    type === 'password' ? setType('text') : setType('password');
  };

  return (
    <GameKeyContainer>
      <GameKeyInput type={type} value={value} autoComplete='off' />
      <IconButton onClick={handleClick}>
        <Visibility />
      </IconButton>
    </GameKeyContainer>
  );
};

export default GameKey;
