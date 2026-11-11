import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pool } from "../src/config/database";

async function main(): Promise<void> {
  if (!pool) {
    throw new Error("DATABASE_URL is required to run migrations.");
  }

  const migrationPath = path.resolve(process.cwd(), "migrations/001_initial_schema.sql");
  const sql = await readFile(migrationPath, "utf8");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(120) PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    const version = "001_initial_schema";
    const existing = await client.query("SELECT version FROM schema_migrations WHERE version = $1", [version]);
    if (existing.rowCount === 0) {
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (version) VALUES ($1)", [version]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error("Database migration failed:", error);
  process.exitCode = 1;
});
