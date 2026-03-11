import { NextResponse } from "next/server";

import { requireAdmin } from "../_auth";
import { getHallBookingEnabled, updateHallBookingEnabled } from "@library/site-content";

function withAuth(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) {
    return auth.response;
  }
  return null;
}

export async function GET(request) {
  const denied = withAuth(request);
  if (denied) return denied;

  const hallBookingEnabled = await getHallBookingEnabled();
  return NextResponse.json({ hallBookingEnabled });
}

export async function PATCH(request) {
  const denied = withAuth(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    if (typeof body?.hallBookingEnabled !== "boolean") {
      return NextResponse.json({ error: "hallBookingEnabled must be a boolean." }, { status: 400 });
    }

    const hallBookingEnabled = await updateHallBookingEnabled(body.hallBookingEnabled);
    return NextResponse.json({ hallBookingEnabled });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to update settings." }, { status: 400 });
  }
}

