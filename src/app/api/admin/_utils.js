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

export function getDbClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing");
  }
  return new Client({ connectionString });
}
