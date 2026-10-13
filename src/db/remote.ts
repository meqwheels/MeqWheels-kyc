const DB_NAME = 'meq-wheels-kyc';
const DEFAULT_DB_ID = '699c3cc6-9c31-495a-bd86-069f035835c5';

/**
 * Queries remote Cloudflare D1 either via HTTP API (on Vercel/production)
 * or via wrangler CLI in local development.
 */
export async function queryRemoteD1(sql: string): Promise<any[] | null> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_D1_TOKEN;
  const databaseId = process.env.CLOUDFLARE_DATABASE_ID || DEFAULT_DB_ID;

  // 1. Direct Cloudflare REST API (works everywhere including Vercel)
  if (accountId && apiToken) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sql, params: [] }),
        }
      );
      const data = await res.json();
      return data.result?.[0]?.results || [];
    } catch (err: any) {
      console.error('Cloudflare D1 REST API query error:', err?.message || err);
      return null;
    }
  }

  // 2. Wrangler CLI fallback for local dev only (not on Vercel / serverless)
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT
  );

  if (!isServerless) {
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
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

  return null;
}

/**
 * Executes an INSERT / UPDATE statement on the remote Cloudflare D1 database.
 */
export async function executeRemoteD1(sql: string): Promise<boolean> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_D1_TOKEN;
  const databaseId = process.env.CLOUDFLARE_DATABASE_ID || DEFAULT_DB_ID;

  // 1. Direct Cloudflare REST API (works everywhere including Vercel)
  if (accountId && apiToken) {
    try {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sql, params: [] }),
        }
      );
      const data = await res.json();
      return data.success === true;
    } catch (err: any) {
      console.error('Cloudflare D1 REST API execute error:', err?.message || err);
      return false;
    }
  }

  // 2. Wrangler CLI fallback for local dev only (not on Vercel / serverless)
  const isServerless = Boolean(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.LAMBDA_TASK_ROOT
  );

  if (!isServerless) {
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
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

  return false;
}
