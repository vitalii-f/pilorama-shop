import styles from './page.module.css';
import Hero from '@/components/hero/Hero';
import NewReleases from '@/components/newReleases/NewReleases';
import { createClient } from '@/utils/supabase/client';

export const revalidate = 10;
export const fetchCache = 'force-no-store';

const fetchData = async () => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.from('games').select('*, developers(*)')
    if (error) throw new Error(error.message)
    return data
  } catch (error) {
    throw new Error(error as string)
  }
};

export default async function Home() {
  const gamesData = await fetchData();
  
  return (
    <main className={styles.main}>
      <Hero />
      <NewReleases data={gamesData} />
    </main>
  );
}
