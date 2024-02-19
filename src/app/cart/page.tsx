import ProductList from '@/components/cart/ProductList';
import React from 'react';
import { CartHeader, Section, Title } from './CartPage.styled';

const CartPage = () => {
  return (
    <Section>
      <CartHeader>
        <Title>Your Cart</Title>
      </CartHeader>
      <ProductList />
    </Section>
  );
};

export default CartPage;
