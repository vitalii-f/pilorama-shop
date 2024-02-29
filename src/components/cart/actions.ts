'use server';

import { Tables, TablesInsert } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

export const createPay = async (cart: Tables<'games'>[]) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData } = await supabase.auth.getUser();

  let total_price = 0;
  cart.map((item) => (total_price += item.price));

  const basketOrder = cart.map((item) => ({
    name: item.name,
    qty: 1,
    sum: item.price * 100,
    icon: item.icon_img,
    unit: 'шт.',
    code: item.id.toString(),
    barcode: 'string',
    header: 'string',
    footer: 'string',
    tax: [],
    uktzed: 'string',
    discounts: [
      {
        type: 'DISCOUNT',
        mode: 'PERCENT',
        value: 'PERCENT',
      },
    ],
  }));

  const requestBody = {
    amount: total_price * 100,
    ccy: 980,
    merchantPaymInfo: {
      reference: '84d0070ee4e44667b31371d8f8813947',
      destination: 'Покупка игры',
      comment: 'Покупка игры',
      customerEmails: [],
      basketOrder: basketOrder,
    },
    redirectUrl: `${process.env.HOST}/cart/checkout`,
    webHookUrl: `${process.env.HOST}/api/pay`,
    validity: 3600,
    paymentType: 'debit',
  };

  const request = await fetch(
    'https://api.monobank.ua/api/merchant/invoice/create',
    {
      method: 'POST',
      headers: {
        'X-Token': 'usFmFVz-3UCn0t9U2AQouvajNmjY0y3vyZ6GITsKJYtQ',
      },
      body: JSON.stringify(requestBody),
    }
  );

  const response = await request.json();

  if (response.pageUrl) {
    const dbRequest: TablesInsert<'purchase'> = {
      product_id: cart.map((item) => item.id),
      status: 'created',
      total_price: total_price,
      user_id: userData.user!.id,
      invoiceId: response.invoiceId,
    };
    await supabase.from('purchase').insert(dbRequest);

    redirect(response.pageUrl, RedirectType.replace);
  }
};

export const removeFromCart = async (cartItemId: number) => {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  try {
    const { data, error } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartItemId)
      .select();
    if (error) throw new Error(error.message);

    revalidatePath('/cart')
    return data[0];
  } catch (error) {
    throw new Error(error as string);
  }
}