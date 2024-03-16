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
import { createPay, removeFromCart } from './actions';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProductListProps extends Tables<'cart'> {
  games: Tables<'games'> | null
}

const ProductList = ({ cart }: { cart: ProductListProps[] }) => {
  let totalPrice: number = 0;
  cart.map((item) => (totalPrice += item.games!.price));

  const DeleteFromCard = ({ cartItemId }: { cartItemId: number }) => {
    const handleDelete = async () => {
      await removeFromCart(cartItemId)
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
        {cart.map((item) => (
          <ProductItem key={item.games!.name}>
            <Image
              src={item.games!.header}
              alt={item.games!.name}
              width={150}
              height={80}
              priority
            />
            <GameInfo>
              <GameTitle>{item.games!.name}</GameTitle>
              <GamePrice>${item.games!.price}</GamePrice>
            </GameInfo>
            <DeleteFromCard cartItemId={item.id} />
          </ProductItem>
        ))}
      </Games>
      <PayZone>
        <PayZoneInfo>
          <p>Total price: ${totalPrice}</p>
          <p>Total amount: {cart.length}</p>
        </PayZoneInfo>
        <PayButton onClick={async () => await createPay(cart.map(item => item.games!))}>Buy</PayButton>
      </PayZone>
    </Products>
  );
};

export default ProductList;
