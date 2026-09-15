import { drizzle as drizzleD1, DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from './schema';

let localDbInstance: any = null;

/**
 * Returns a Drizzle ORM instance.
 * Automatically uses Cloudflare D1 in Cloudflare runtime (via binding 'DB'),
 * or local SQLite during local Next.js development.
 */
export function getDb(): any {
  // 1. Check for Cloudflare D1 binding
  const cloudflareD1 = (process.env as any).DB || (globalThis as any).DB;
  if (cloudflareD1 && typeof cloudflareD1.prepare === 'function') {
    return drizzleD1(cloudflareD1, { schema });
  }

  // 2. Local development fallback using better-sqlite3
  if (!localDbInstance) {
    // Dynamic requires ensure Cloudflare bundler doesn't try to package better-sqlite3 in Edge/Workers mode
    const Database = require('better-sqlite3');
    const path = require('path');
    const dbPath = path.resolve(process.cwd(), 'd1-local.sqlite');
    const sqlite = new Database(dbPath);

    // Auto-create table matching exact D1 schema if it doesn't exist
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS kyc_records (
        booking_id      TEXT NOT NULL,
        customer_id     TEXT PRIMARY KEY,
        name            TEXT NOT NULL,
        phone_no        TEXT NOT NULL,
        vehicle_no      TEXT NOT NULL,
        aadhaar_no      TEXT,
        aadhaar_file    TEXT,
        dl_no           TEXT,
        dl_file         TEXT,
        kyc_status      TEXT DEFAULT 'PENDING',
        created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const { drizzle } = require('drizzle-orm/better-sqlite3');
    localDbInstance = drizzle(sqlite, { schema });
  }

  return localDbInstance;
}
