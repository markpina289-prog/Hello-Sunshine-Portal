import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

// Helper to create a DB instance for Node environments
export function createDb(url: string) {
  const pool = new Pool({ connectionString: url });
  return drizzle(pool, { schema });
}

// Default export for backward compatibility in Node environments
export const db = process.env.DATABASE_URL ? createDb(process.env.DATABASE_URL) : null as any;

export * from "./schema";
