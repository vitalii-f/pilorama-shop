import styles from './page.module.css';
import Hero from '@/components/hero/Hero';
import NewReleases from '@/components/newReleases/NewReleases';

export const revalidate = 60

export default async function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <NewReleases />
    </main>
  );
}
