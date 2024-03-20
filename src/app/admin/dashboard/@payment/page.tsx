import PaymentChart from '@/components/admin/dashboard/PaymentChart';
import { createClient } from '@/utils/supabase/client';

const PaymentPage = async () => {
  const supabase = createClient();

  const { data } = await supabase
    .from('games')
    .select('name, sold_count')
    .order('sold_count', { ascending: false })
    .limit(3);

  if (data) {
    const gameName = data.map((item) => item.name);
    const soldCount = data.map((item) => item.sold_count);

    return <PaymentChart gameName={gameName} sold_count={soldCount} />;
  }
};

export default PaymentPage;
