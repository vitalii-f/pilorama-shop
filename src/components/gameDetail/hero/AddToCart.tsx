'use client';

import React from 'react';
import { CartButton } from './GameHero.styled';
import { Tables } from '@/types/supabase';
import Link from 'next/link';
import { addToCart } from './actions';

const AddToCart = ({
  game,
  inCart,
}: {
  game: Tables<'games'>;
  inCart: boolean;
}) => {
  const handleClick = async () => {
    await addToCart(game.id);
  };
  return (
    <>
      {inCart ? (
        <CartButton>
          <Link href='/cart'>Go To Cart</Link>
        </CartButton>
      ) : (
        <CartButton onClick={handleClick}>
          <Link href='/cart'>Add To Cart</Link>
        </CartButton>
      )}
    </>
  );
};

export default AddToCart;
