'use client';

import { Tables } from '@/types/supabase';
import React, { useEffect, useState } from 'react';
import {
  GameInfo,
  GamePrice,
  GameTitle,
  Games,
  PayButton,
  PayZone,
  PayZoneInfo,
  ProductItem,
  Products,
} from './ProductList.styled';
import Image from 'next/image';
import { createPay } from './actions';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [cart, setCart] = useState<Tables<'games'>[]>([])

  useEffect(() => {
    if (localStorage && localStorage.cart) {
      setCart(JSON.parse(localStorage.cart));
    }
  }, [])

  if (!localStorage.cart) return <h2>Cart is empty</h2>;

  let totalPrice: number = 0;
  cart.map((item) => (totalPrice += item.price));

  const DeleteFromCard = ({ gameIndex }: { gameIndex: number }) => {
    const handleDelete = () => {
      const cart: Tables<'games'>[] = JSON.parse(localStorage.cart);
      cart.splice(gameIndex, 1);
      localStorage.cart = JSON.stringify(cart)
      setCart(cart)
    };
    return (
      <IconButton
        sx={{ alignSelf: 'center' }}
        title='Delete from cart'
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  return (
    <Products>
      <Games>
        {cart.map((game, index) => (
          <ProductItem key={game.name}>
            <Image
              src={game.header_img}
              alt={game.name}
              width={150}
              height={80}
              priority
            />
            <GameInfo>
              <GameTitle>{game.name}</GameTitle>
              <GamePrice>${game.price}</GamePrice>
            </GameInfo>
            <DeleteFromCard gameIndex={index} />
          </ProductItem>
        ))}
      </Games>
      <PayZone>
        <PayZoneInfo>
          <p>Total price: ${totalPrice}</p>
          <p>Total amount: {cart.length}</p>
        </PayZoneInfo>
        <PayButton onClick={async () => await createPay(cart)}>Buy</PayButton>
      </PayZone>
    </Products>
  );
};

export default ProductList;
