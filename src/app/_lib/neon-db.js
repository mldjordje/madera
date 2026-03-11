import "server-only";

import { neon } from "@neondatabase/serverless";

let cachedClient = null;
let cachedUrl = null;

export function getSqlClient() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    return null;
  }

  if (!cachedClient || cachedUrl !== connectionString) {
    cachedClient = neon(connectionString);
    cachedUrl = connectionString;
  }

  return cachedClient;
}

export function requireSqlClient() {
  const sql = getSqlClient();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured. Set Neon connection string in env.");
  }
  return sql;
}

