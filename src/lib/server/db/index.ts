import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL manquante');
}

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	connectionTimeoutMillis: 5_000
});

export const db = drizzle({ client: pool });

export * from './schema';
