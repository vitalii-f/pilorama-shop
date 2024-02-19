'use client';

import React from 'react';
import { CartButton } from './GameHero.styled';
import { Tables } from '@/types/supabase';
import Link from 'next/link';

const AddToCart = ({ game }: { game: Tables<'games'> }) => {
  const handleClick = () => {
    const cart = localStorage.cart;
    if (cart) {
      const oldCart: Tables<'games'>[] = JSON.parse(cart);

      let isGameExists = false;
      oldCart.map((item) =>
        item.id === game.id ? (isGameExists = true) : undefined
      );

      if (!isGameExists) {
        const newCart = JSON.stringify([...oldCart, game]);
        localStorage.cart = newCart;
      }
    } else {
      const newCart = JSON.stringify([game]);
      localStorage.cart = newCart;
    }
  };
  return (
    <CartButton onClick={handleClick}>
      <Link href='/cart'>Add To Cart</Link>
    </CartButton>
  );
};

export default AddToCart;
