import { NextResponse } from "next/server";

export function requireAdmin(request) {
  const token = process.env.ADMIN_TOKEN?.trim();
  const header = request.headers.get("x-admin-token") || request.headers.get("authorization");

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "ADMIN_TOKEN is not configured on server." },
        { status: 401 },
      ),
    };
  }

  const provided = header?.replace(/^Bearer\s+/i, "").trim();
  if (!provided || provided !== token) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true };
}

