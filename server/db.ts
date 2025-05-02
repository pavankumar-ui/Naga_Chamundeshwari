import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

// Helper function to print error details for debugging
export function logQueryError(error: any, queryType: string): void {
  console.error(`Error in ${queryType}:`, {
    message: error.message,
    code: error.code,
    detail: error.detail,
    where: error.where,
    hint: error.hint,
    position: error.position,
  });
}