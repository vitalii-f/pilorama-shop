'use server';

import { supabase } from '@/helpers/supabase';
import { Tables, TablesInsert } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { RedirectType, redirect } from 'next/navigation';

export const createPay = async (cart: Tables<'games'>[]) => {
  const cookieStore = cookies();
  const supabaseServer = createClient(cookieStore);

  const { data: userData } = await supabaseServer.auth.getUser();

  let total_price = 0;
  cart.map((item) => (total_price += item.price));

  const basketOrder = cart.map((item) => ({
    name: item.name,
    qty: 1,
    sum: item.price,
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
    amount: total_price,
    ccy: 980,
    merchantPaymInfo: {
      reference: '84d0070ee4e44667b31371d8f8813947',
      destination: 'Покупка игры',
      comment: 'Покупка игры',
      customerEmails: [],
      basketOrder: basketOrder,
    },
    redirectUrl: `${process.env.HOST}/cart/chekout`,
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
  console.log(response);
};
