import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const DB_NAME = 'meq-wheels-kyc';

/**
 * Executes a SQL query directly on the user's remote Cloudflare D1 database
 * using wrangler CLI authentication.
 */
export async function queryRemoteD1(sql: string): Promise<any[] | null> {
  try {
    const sanitized = sql.replace(/"/g, '\\"');
    const { stdout } = await execAsync(
      `npx wrangler d1 execute ${DB_NAME} --remote --json --command="${sanitized}"`,
      { maxBuffer: 1024 * 1024 * 10 }
    );
    const parsed = JSON.parse(stdout);
    return parsed[0]?.results || [];
  } catch (err: any) {
    console.error('Remote D1 query error:', err?.message || err);
    return null;
  }
}

/**
 * Executes an INSERT / UPDATE statement on the remote Cloudflare D1 database.
 */
export async function executeRemoteD1(sql: string): Promise<boolean> {
  try {
    const sanitized = sql.replace(/"/g, '\\"');
    await execAsync(
      `npx wrangler d1 execute ${DB_NAME} --remote --json --command="${sanitized}"`,
      { maxBuffer: 1024 * 1024 * 10 }
    );
    return true;
  } catch (err: any) {
    console.error('Remote D1 execute error:', err?.message || err);
    return false;
  }
}
