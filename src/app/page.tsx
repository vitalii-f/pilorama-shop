import styles from './page.module.css';
import Hero from '@/components/hero/Hero';
import NewReleases from '@/components/newReleases/NewReleases';
import { supabase } from '@/helpers/supabase';

export const revalidate = 10;
export const fetchCache = 'force-no-store';

const fetchData = async () => {
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
