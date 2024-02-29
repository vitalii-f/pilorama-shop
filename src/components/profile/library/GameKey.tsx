'use client';

import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { GameKeyContainer, GameKeyInput } from './GameKey.styled';

const GameKey = ({ value }: { value: string }) => {
  const [type, setType] = useState<'text' | 'password'>('password');

  const handleClick = () => {
    type === 'password' ? setType('text') : setType('password');
  };

  return (
    <GameKeyContainer>
      <GameKeyInput type={type} value={value} />
      <IconButton onClick={handleClick}>
        <VisibilityIcon />
      </IconButton>
    </GameKeyContainer>
  );
};

export default GameKey;
