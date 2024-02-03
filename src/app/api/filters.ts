'use server';

import directus from '@/helpers/diretus';
import { readItems } from '@directus/sdk';

export const getPlatforms = async () => {
  return await directus.request(readItems('Platform'));
};

export const getGenres = async () => {
  return await directus.request(readItems('genre'));
};

export const getFeatures = async () => {
  return await directus.request(readItems('Features'));
};
