import { NextResponse } from "next/server";

import { getDbClient } from "../../admin/_utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_SETTINGS = { allowReservations: true, contactPhone: "+381 63 000 000" };

const ensureSettingsTable = async (client) => {
  await client.query(
    `CREATE TABLE IF NOT EXISTS hall_settings (
      id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      allow_reservations BOOLEAN NOT NULL DEFAULT TRUE,
      contact_phone TEXT DEFAULT '+381 63 000 000',
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`
  );
  await client.query(
    `INSERT INTO hall_settings (id, allow_reservations, contact_phone)
     VALUES (1, $1, $2)
     ON CONFLICT (id) DO NOTHING`,
    [DEFAULT_SETTINGS.allowReservations, DEFAULT_SETTINGS.contactPhone]
  );
};

const mapRow = (row = {}) => ({
  allowReservations: row.allow_reservations !== false,
  contactPhone: row.contact_phone || DEFAULT_SETTINGS.contactPhone,
});

async function readSettingsFromDb() {
  const client = getDbClient();
  await client.connect();

  try {
    await ensureSettingsTable(client);
    const result = await client.query(
      "SELECT allow_reservations, contact_phone FROM hall_settings WHERE id = 1 LIMIT 1"
    );
    if (result.rowCount === 0) {
      return DEFAULT_SETTINGS;
    }
    return mapRow(result.rows[0]);
  } finally {
    await client.end();
  }
}

export async function GET() {
  try {
    const settings = await readSettingsFromDb();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Public hall settings GET failed:", error);
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}
