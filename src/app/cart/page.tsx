import ProductList from '@/components/cart/ProductList';
import React from 'react';
import { CartHeader, Section, Title } from './CartPage.styled';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

const CartPage = async () => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) return (
    <Section>
      <CartHeader>
        <Title>Your Cart</Title>
      </CartHeader>
      <h2>You need to login for using cart.</h2>
    </Section>
  )

  const { data: cartData } = await supabase.from('cart').select('*, games(*)').eq('user_id', userData.user.id);

  return (
    <Section>
      <CartHeader>
        <Title>Your Cart</Title>
      </CartHeader>
      {cartData && cartData.length !== 0 ? (
        <ProductList cart={cartData} />
      ) : (
        <h2>Your cart is empty.</h2>
      )}
    </Section>
  );
};

export default CartPage;
