import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SETTINGS_PATH = path.join(process.cwd(), "src", "data", "hall-settings.json");

function readSettings() {
  try {
    const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return { allowReservations: true, contactPhone: "+381 63 000 000" };
  }
}

export async function GET() {
  const settings = readSettings();
  return NextResponse.json(settings);
}
