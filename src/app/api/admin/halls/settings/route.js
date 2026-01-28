import { NextResponse } from "next/server";

import { getDbClient, requireAdmin, tryGetDbClient } from "../../_utils";
import { getDemoHallSettings, updateDemoHallSettings } from "@library/demoStore";

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
      const inserted = await client.query(
        `INSERT INTO hall_settings (id, allow_reservations, contact_phone)
         VALUES (1, $1, $2)
         ON CONFLICT (id) DO NOTHING
         RETURNING allow_reservations, contact_phone`,
        [DEFAULT_SETTINGS.allowReservations, DEFAULT_SETTINGS.contactPhone]
      );
      return mapRow(inserted.rows[0] || DEFAULT_SETTINGS);
    }

    return mapRow(result.rows[0]);
  } finally {
    await client.end();
  }
}

async function writeSettingsToDb(next) {
  const client = getDbClient();
  await client.connect();

  try {
    await ensureSettingsTable(client);
    const updated = await client.query(
      `INSERT INTO hall_settings (id, allow_reservations, contact_phone, updated_at)
       VALUES (1, $1, $2, NOW())
       ON CONFLICT (id)
       DO UPDATE SET allow_reservations = EXCLUDED.allow_reservations,
                     contact_phone = EXCLUDED.contact_phone,
                     updated_at = NOW()
       RETURNING allow_reservations, contact_phone`,
      [next.allowReservations, next.contactPhone]
    );

    return mapRow(updated.rows[0]);
  } finally {
    await client.end();
  }
}

export async function GET(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  const demoSettings = getDemoHallSettings();
  const clientCandidate = tryGetDbClient();
  if (!clientCandidate) {
    return NextResponse.json({ ...demoSettings, source: "demo" });
  }

  try {
    const settings = await readSettingsFromDb();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Admin hall settings GET failed:", error);
    return NextResponse.json({ ...demoSettings, source: "demo" });
  }
}

export async function PATCH(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  let incoming = {};
  try {
    incoming = await request.json();
  } catch (err) {
    // ignore, will validate below
  }

  const allowReservations =
    typeof incoming.allowReservations === "boolean" ? incoming.allowReservations : DEFAULT_SETTINGS.allowReservations;
  const contactPhone = incoming.contactPhone?.trim() || DEFAULT_SETTINGS.contactPhone;

  const clientCandidate = tryGetDbClient();
  if (!clientCandidate) {
    const next = updateDemoHallSettings({ allowReservations, contactPhone });
    return NextResponse.json({ ...next, source: "demo" });
  }

  try {
    const next = await writeSettingsToDb({ allowReservations, contactPhone });
    return NextResponse.json(next);
  } catch (error) {
    console.error("Admin hall settings PATCH failed:", error);
    const next = updateDemoHallSettings({ allowReservations, contactPhone });
    return NextResponse.json({ ...next, source: "demo" });
  }
}
