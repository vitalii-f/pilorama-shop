import Image from 'next/image';
import AddToCart from '../buttons/AddToCart';
import ViewAll from '../buttons/ViewAll';
import PlatformLabel from '../labels/PlatformLabel';
import styles from './styles.module.css';
import directus from '@/helpers/diretus';
import { readItems } from '@directus/sdk';
import Link from 'next/link';

const fetchTrending = async () => {
  return directus.request(
    readItems('games', {
      sort: ['release_date'],
      limit: 3,
      fields: ['id', 'name', 'price', 'preview', { platform: [{ item: { Platform: ['name'] } }]}],
    })
  );
};

const Trending = async () => {
  const data = await fetchTrending();
  return (
    <div className={styles.trending__wrapper}>
      <div className={styles.trending__header}>
        <h2>Trending</h2>
        <ViewAll />
      </div>
      <div className={styles.trending__cards}>
        {data.map((item) => (
          <div className={styles.card} key={item.name}>
            <div className={styles.card__bg_wrapper}>
              <Image
                className={styles.card__bg}
                src={`${process.env.DB_IMG}/${item.preview}`}
                alt='banner'
                quality={100}
                priority
                fill
              />
            </div>
            <PlatformLabel
              className={styles.card__platform}
              text={item.platform[0].item.name!}
              variant='contained'
            />
            <h3 className={styles.card__name}>
              <Link href={`games/${item.id}`}>{item.name}</Link>
            </h3>
            <div className={styles.card__footer}>
              <span className={styles.card__price}>${item.price}</span>
              <AddToCart />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
