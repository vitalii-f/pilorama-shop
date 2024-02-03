import styles from './styles.module.css';
import Image from 'next/image';
import HeroNav from './HeroNav';
import Trending from '../trending/Trending';
import PlatformLabel from '../labels/PlatformLabel';
import directus from '@/helpers/diretus';
import { readSingleton } from '@directus/sdk';
import { cache } from 'react';

const fetchBanner = cache(async () => {
  return directus.request(readSingleton('main_banner'));
});

const Hero = async () => {
  const data = await fetchBanner();
  return (
    <section className={styles.hero}>
      <Image
        className={styles.hero__banner}
        src={`${process.env.DB_IMG}/${data.banner}`}
        fill
        alt='hero background'
        quality={100}
        priority
      />
      <HeroNav />
      <div className={styles.hero__footer}>
        <div className={styles.footer_row}>
          <Image
            src={`${process.env.DB_IMG}/${data.logo}`}
            alt='logo'
            width={300}
            height={150}
            quality={100}
            priority
          />
          <div className={styles.hero__info}>
            <PlatformLabel text='PS5' variant='contained' />
            <span className={styles.hero__price}>$49.99</span>
          </div>
        </div>
        <Trending />
      </div>
    </section>
  );
};

export default Hero;
