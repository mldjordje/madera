import { NextResponse } from "next/server";

import { getDbClient, requireAdmin } from "../../_utils";

const HALL_TYPES = ["velika", "mala"];

const mapBlackout = (row) => ({
  id: row.id,
  hallType: row.hall_type,
  startDate: row.start_date,
  endDate: row.end_date,
  reason: row.reason || "",
  createdAt: row.created_at,
});

export async function POST(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  let payload = {};
  try {
    payload = await request.json();
  } catch (err) {
    // ignore, validate below
  }

  const hallType = typeof payload.hallType === "string" ? payload.hallType : "";
  const reason = typeof payload.reason === "string" ? payload.reason.trim() : "";

  const normalizeDate = (value) => {
    if (!value || typeof value !== "string") return null;
    const trimmed = value.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null;
    const date = new Date(trimmed);
    return Number.isNaN(date.valueOf()) ? null : trimmed;
  };

  const startDate = normalizeDate(payload.startDate);
  const endDate = normalizeDate(payload.endDate);

  if (!HALL_TYPES.includes(hallType)) {
    return NextResponse.json({ error: "hallType mora biti 'velika' ili 'mala'." }, { status: 400 });
  }

  if (!startDate || !endDate) {
    return NextResponse.json({ error: "Unesi ispravan pocetni i krajnji datum." }, { status: 400 });
  }

  if (new Date(startDate) > new Date(endDate)) {
    return NextResponse.json({ error: "Pocetni datum mora biti pre ili isti kao krajnji." }, { status: 400 });
  }

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query(
      `INSERT INTO hall_blackouts (hall_type, start_date, end_date, reason)
       VALUES ($1, $2, $3, $4)
       RETURNING id, hall_type, start_date, end_date, reason, created_at`,
      [hallType, startDate, endDate, reason || null]
    );

    return NextResponse.json({ blackout: mapBlackout(result.rows[0]) }, { status: 201 });
  } catch (error) {
    console.error("Admin hall blackout POST failed:", error);
    return NextResponse.json({ error: "Nije uspelo dodavanje blokade." }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function DELETE(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  let payload = {};
  try {
    payload = await request.json();
  } catch (err) {
    // ignore
  }

  const id = Number(payload.id);
  if (!id) {
    return NextResponse.json({ error: "ID blokade je obavezan." }, { status: 400 });
  }

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query("DELETE FROM hall_blackouts WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Blokada nije pronadjena." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin hall blackout DELETE failed:", error);
    return NextResponse.json({ error: "Nije uspelo brisanje blokade." }, { status: 500 });
  } finally {
    await client.end();
  }
}
