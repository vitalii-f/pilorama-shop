import { supabase } from '@/helpers/supabase';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import React from 'react';

const fetchUser = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const getInvoice = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('purchase')
      .select('invoiceId')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);
    if (error) throw new Error(error.message);

    const invoiceId = data[0].invoiceId;

    const invoice = await fetch(
      `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`,
      {
        method: 'GET',
        headers: {
          'X-Token': process.env.X_SIGN!,
        },
      }
    );

    return invoice.json();
  } catch (error) {
    throw new Error(error as string);
  }
};

const CheckoutPage = async () => {
  const { user } = await fetchUser();
  const invoice = await getInvoice(user.id);

  return (
    <section>
      <h2>Your payment is {invoice.status}</h2>
    </section>
  );
};

export default CheckoutPage;
