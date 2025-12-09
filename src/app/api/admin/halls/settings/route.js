import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { requireAdmin } from "../../_utils";

const SETTINGS_PATH = path.join(process.cwd(), "src", "data", "hall-settings.json");

function readSettings() {
  try {
    const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return { allowReservations: true, contactPhone: "+381 63 000 000" };
  }
}

function writeSettings(payload) {
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(payload, null, 2), "utf-8");
}

export async function GET(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  return NextResponse.json(readSettings());
}

export async function PATCH(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  const incoming = await request.json();
  const current = readSettings();
  const allowReservations =
    typeof incoming.allowReservations === "boolean" ? incoming.allowReservations : current.allowReservations;
  const contactPhone = incoming.contactPhone?.trim() || current.contactPhone || "+381 63 000 000";

  const next = { allowReservations, contactPhone };
  writeSettings(next);
  return NextResponse.json(next);
}
