import PurchaseChart from '@/components/admin/dashboard/PurchaseChart';
import { createClient } from '@/utils/supabase/server';

const PurchasePage = async () => {
  const supabase = createClient();

  const { count: successCount } = await supabase
    .from('purchase')
    .select('*', { head: true, count: 'exact' })
    .eq('status', 'success');
  const { count: createdCount } = await supabase
    .from('purchase')
    .select('*', { head: true, count: 'exact' })
    .eq('status', 'created');

  if (successCount && createdCount) return <PurchaseChart createdCount={createdCount} successCount={successCount} />;
};

export default PurchasePage;
