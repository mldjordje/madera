import { NextResponse } from "next/server";

import { getDbClient, requireAdmin } from "../../_utils";

const DEFAULT_SETTINGS = { allowReservations: true, contactPhone: "+381 63 000 000" };

const mapRow = (row = {}) => ({
  allowReservations: row.allow_reservations !== false,
  contactPhone: row.contact_phone || DEFAULT_SETTINGS.contactPhone,
});

async function readSettingsFromDb() {
  const client = getDbClient();
  await client.connect();

  try {
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

  try {
    const settings = await readSettingsFromDb();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Admin hall settings GET failed:", error);
    return NextResponse.json(DEFAULT_SETTINGS);
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

  try {
    const next = await writeSettingsToDb({ allowReservations, contactPhone });
    return NextResponse.json(next);
  } catch (error) {
    console.error("Admin hall settings PATCH failed:", error);
    return NextResponse.json({ error: "Nije uspelo cuvanje podesavanja sala." }, { status: 500 });
  }
}
