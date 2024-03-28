import { createClient } from '@/utils/supabase/server';
import {
  CheckoutContent,
  CheckoutHeader,
  LibraryLink,
  Main,
  Section,
} from './Checkout.styled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

const fetchUser = async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

const getInvoice = async (userId: string) => {
  const supabase = createClient();
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

  if (invoice.status === 'success')
    return (
      <Main>
        <Section>
          <CheckoutHeader>
            <CheckCircleIcon fontSize='large' color='success' />
            <h2>Your payment is {invoice.status}</h2>
          </CheckoutHeader>
          <CheckoutContent>
            <p>Thank you for purchasing the key!</p>
            <p>
              Key of game is now in your library. You can go to profile and copy
              it!
            </p>
          </CheckoutContent>
          <LibraryLink href='/profile/library'>Go to library</LibraryLink>
        </Section>
      </Main>
    );

    return (
      <Main>
        <Section>
          <CheckoutHeader>
            <WarningIcon fontSize='large' color='warning' />
            <h2>Your payment in {invoice.status}</h2>
          </CheckoutHeader>
          <CheckoutContent>
            <p>We are waiting for payment confirmation</p>
            <p>You can reload the page for update payment status</p>
          </CheckoutContent>
          <LibraryLink href='/profile/library'>Go to library</LibraryLink>
        </Section>
      </Main>
    );
};

export default CheckoutPage;
