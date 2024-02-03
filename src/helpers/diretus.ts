import { Schema } from '@/types/collections';
import { CustomDirectusTypes } from '@/types/types';
import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus<CustomDirectusTypes>('http://localhost:8055').with(rest());

export default directus;