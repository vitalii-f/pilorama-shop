import { Schema } from '@/types/collections';
import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus<Schema>('http://localhost:8055').with(rest());

export default directus;