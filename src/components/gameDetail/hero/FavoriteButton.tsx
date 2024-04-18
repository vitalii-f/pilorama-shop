'use client';

import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addToFavorite } from './actions';

const FavoriteButton = ({
  gameId,
  isFavorite,
}: {
  gameId: number;
  isFavorite: boolean;
}) => {
  return (
    <IconButton onClick={() => addToFavorite(gameId)}>
      {isFavorite ? <Favorite color='error' /> : <FavoriteBorder />}
    </IconButton>
  );
};

export default FavoriteButton;
