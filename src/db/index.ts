import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import * as schema from './schema';

let localDbInstance: any = null;

const DEFAULT_DB_ID = '699c3cc6-9c31-495a-bd86-069f035835c5';

/**
 * Creates a standard Cloudflare D1 REST client allowing Drizzle ORM
 * to communicate directly with Cloudflare D1 over HTTPS from anywhere (including Vercel).
 */
function createD1HttpClient(accountId: string, apiToken: string, databaseId: string) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

  return {
    prepare(query: string) {
      let boundParams: any[] = [];
      const stmt = {
        bind(...params: any[]) {
          boundParams = params.map((p) => (p instanceof Date ? p.toISOString() : p));
          return stmt;
        },
        async all() {
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql: query, params: boundParams }),
          });
          const data = await res.json();
          const firstResult = data.result?.[0];
          return {
            results: firstResult?.results || [],
            success: data.success === true,
            meta: firstResult?.meta || {},
          };
        },
        async run() {
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql: query, params: boundParams }),
          });
          const data = await res.json();
          const firstResult = data.result?.[0];
          return {
            results: firstResult?.results || [],
            success: data.success === true,
            meta: firstResult?.meta || {},
          };
        },
      };
      return stmt;
    },
  };
}

/**
 * Returns a Drizzle ORM database instance.
 * Priority:
 * 1. Cloudflare Workers native D1 binding (`env.DB` or `globalThis.DB`).
 * 2. Cloudflare D1 REST API via HTTPS if `CLOUDFLARE_ACCOUNT_ID` & `CLOUDFLARE_API_TOKEN` are set (e.g. on Vercel).
 * 3. Local/Serverless SQLite fallback using better-sqlite3 in os.tmpdir() (safe on Vercel read-only filesystems).
 */
export function getDb(): any {
  // 1. Native Cloudflare D1 binding (Cloudflare Pages / Workers runtime)
  const cloudflareD1 = (process.env as any).DB || (globalThis as any).DB;
  if (cloudflareD1 && typeof cloudflareD1.prepare === 'function') {
    return drizzleD1(cloudflareD1, { schema });
  }

  // 2. Cloudflare D1 REST API (allows Vercel deployments to connect directly to Cloudflare D1)
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_D1_TOKEN;
  const databaseId = process.env.CLOUDFLARE_DATABASE_ID || DEFAULT_DB_ID;

  if (accountId && apiToken) {
    const httpClient = createD1HttpClient(accountId, apiToken, databaseId);
    return drizzleD1(httpClient as any, { schema });
  }

  // 3. Serverless / Local SQLite fallback using better-sqlite3
  if (!localDbInstance) {
    const Database = require('better-sqlite3');
    const path = require('path');
    const os = require('os');

    // On Vercel and AWS Lambda, process.cwd() is read-only.
    // Writes are only permitted in os.tmpdir() (/tmp).
    const isServerless = Boolean(
      process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.LAMBDA_TASK_ROOT
    );

    const dbDir = isServerless ? os.tmpdir() : process.cwd();
    const dbPath = path.resolve(dbDir, 'd1-local.sqlite');
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
