import ProductList from '@/components/cart/ProductList';
import React from 'react';
import { CartHeader, Section, Title } from './CartPage.styled';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { supabase } from '@/helpers/supabase';

const fetchUser = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);

    return data.user;
  } catch (error) {
    throw new Error(error as string);
  }
};

const fetchUserCart = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('cart')
      .select('*, games(*)')
      .eq('user_id', userId);
    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const CartPage = async () => {
  const user = await fetchUser();
  const cart = await fetchUserCart(user.id);

  return (
    <Section>
      <CartHeader>
        <Title>Your Cart</Title>
      </CartHeader>
      {cart.length !== 0 ? (
        <ProductList cart={cart} />
      ) : (
        <h2>Your cart is empty.</h2>
      )}
    </Section>
  );
};

export default CartPage;
