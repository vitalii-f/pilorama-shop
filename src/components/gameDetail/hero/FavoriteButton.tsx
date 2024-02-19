'use client';

import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
      {isFavorite ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
