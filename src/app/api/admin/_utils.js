import { NextResponse } from "next/server";
import { Client } from "pg";

export function requireAdmin(request) {
  const token = process.env.ADMIN_TOKEN;
  const header = request.headers.get("x-admin-token") || request.headers.get("authorization");

  if (!token) {
    return { ok: false, response: NextResponse.json({ error: "Admin token not configured." }, { status: 401 }) };
  }

  const provided = header?.replace(/^Bearer\s+/i, "").trim();

  if (!provided || provided !== token) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return { ok: true };
}

export function resolveDbConnectionString() {
  const primary = process.env.DATABASE_URL?.trim();
  const fallback = process.env.DATABASE_URL_PUBLIC?.trim();

  if (primary && primary.includes("railway.internal") && fallback) {
    return fallback;
  }

  if (primary) return primary;
  if (fallback) return fallback;

  throw new Error("DATABASE_URL is missing. Set Railway connection string.");
}

export function getDbClient() {
  return new Client({ connectionString: resolveDbConnectionString() });
}
