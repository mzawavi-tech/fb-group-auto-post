import pg from "pg";
import { env } from "./env";

const { Pool } = pg;

export const databaseConfigured = Boolean(env.DATABASE_URL);

export const pool = databaseConfigured
  ? new Pool({
      connectionString: env.DATABASE_URL,
      max: env.DB_POOL_MAX,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      ssl: env.DATABASE_SSL ? { rejectUnauthorized: true } : undefined
    })
  : null;

pool?.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error", error);
});

export async function checkDatabase(): Promise<"connected" | "not_configured" | "unavailable"> {
  if (!pool) return "not_configured";
  try {
    await pool.query("SELECT 1");
    return "connected";
  } catch {
    return "unavailable";
  }
}
