import styles from './page.module.css';
import Hero from '@/components/hero/Hero';
import NewReleases from '@/components/newReleases/NewReleases';
import directus from '@/helpers/diretus';
import { readItems, readRelationByCollection } from '@directus/sdk';

export const revalidate = 10;
export const fetchCache = 'force-no-store';

const fetchData = async () => {
  return await directus.request(
    readItems('games', {
      sort: ['release_date'],
      fields: [
        '*',
        {
          platform: [{ item: { Platform: ['name'] } }],
          developer: [{ item: { developer: ['name'] } }],
          features: [{ item: { Features: ['name'] } }],
        },
      ],
    })
  );
};

export default async function Home() {
  const gamesData = await fetchData();
  // console.log(gamesData[0].platform);
  return (
    <main className={styles.main}>
      <Hero />
      <NewReleases data={gamesData} />
    </main>
  );
}
