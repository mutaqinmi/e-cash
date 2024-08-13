import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, client } from './connection';
migrate(db, { migrationsFolder: '/migrations' });
client.end();