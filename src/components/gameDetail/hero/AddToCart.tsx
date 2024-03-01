'use client';

import React from 'react';
import { CartButton } from './GameHero.styled';
import { Tables } from '@/types/supabase';
import Link from 'next/link';
import { addToCart } from './actions';

const AddToCart = ({
  game,
  inCart,
  inLibrary,
}: {
  game: Tables<'games'>;
  inCart: boolean;
  inLibrary: boolean;
}) => {
  const handleClick = async () => {
    await addToCart(game.id);
  };

  if (inLibrary)
    return (
      <CartButton>
        <Link href='/profile/library'>Go To Library</Link>
      </CartButton>
    );

  if (inCart)
    return (
      <CartButton>
        <Link href='/cart'>Go To Cart</Link>
      </CartButton>
    );
    
  return (
    <CartButton onClick={handleClick}>
      <Link href='/cart'>Add To Cart</Link>
    </CartButton>
  );
};

export default AddToCart;
