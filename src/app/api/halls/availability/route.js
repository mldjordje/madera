import { NextResponse } from "next/server";
import { addMonths, startOfDay } from "date-fns";
import { Client } from "pg";

import { resolveDbConnectionString } from "../../admin/_utils";

const HALL_TYPES = ["velika", "mala"];
const DEFAULT_MONTHS = 6;

export const dynamic = "force-dynamic";
export const revalidate = 0;

const clampMonths = (value) => {
  if (Number.isNaN(value) || value < 1) return DEFAULT_MONTHS;
  if (value > 12) return 12;
  return value;
};

const mapReservationRow = (row) => ({
  id: row.id,
  hallType: row.hall_type,
  startAt: row.start_at instanceof Date ? row.start_at.toISOString() : row.start_at,
  endAt: row.end_at instanceof Date ? row.end_at.toISOString() : row.end_at,
  status: row.status,
  guestName: row.guest_name,
  guestEmail: row.guest_email,
  guestPhone: row.guest_phone,
  notes: row.notes,
});

const mapBlackoutRow = (row) => ({
  id: row.id,
  hallType: row.hall_type,
  startDate: row.start_date instanceof Date ? row.start_date.toISOString() : row.start_date,
  endDate: row.end_date instanceof Date ? row.end_date.toISOString() : row.end_date,
  reason: row.reason,
});

async function fetchFromDatabase({ windowStart, windowEnd, halls, connectionString }) {
  const conn = connectionString || resolveDbConnectionString();

  const client = new Client({ connectionString: conn });

  await client.connect();

  try {
    const reservationsQuery = client.query(
      `SELECT id, hall_type, start_at, end_at, status, guest_name, guest_email, guest_phone, notes
       FROM hall_reservations
       WHERE hall_type = ANY($1)
         AND start_at <= $3
         AND end_at >= $2
       ORDER BY start_at ASC`,
      [halls, windowStart.toISOString(), windowEnd.toISOString()]
    );

    const blackoutsQuery = client.query(
      `SELECT id, hall_type, start_date, end_date, reason
       FROM hall_blackouts
       WHERE hall_type = ANY($1)
         AND start_date <= $3
         AND end_date >= $2
       ORDER BY start_date ASC`,
      [halls, windowStart.toISOString(), windowEnd.toISOString()]
    );

    const [reservations, blackouts] = await Promise.all([reservationsQuery, blackoutsQuery]);

    return {
      reservations: reservations.rows.map(mapReservationRow),
      blackouts: blackouts.rows.map(mapBlackoutRow),
    };
  } finally {
    await client.end();
  }
}

const buildEmptyData = (windowStart, months, reason) => ({
  source: "fallback",
  reason: reason || "Nema podataka ili baza nije dostupna.",
  range: {
    from: windowStart.toISOString(),
    to: addMonths(windowStart, months).toISOString(),
  },
  reservations: [],
  blackouts: [],
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const months = clampMonths(parseInt(searchParams.get("months") || DEFAULT_MONTHS, 10));
  const hallParam = searchParams.get("hall");

  const halls = hallParam ? HALL_TYPES.filter((hall) => hall === hallParam) : HALL_TYPES;
  if (!halls.length) {
    return NextResponse.json({ error: "Invalid hall parameter." }, { status: 400 });
  }

  const windowStart = startOfDay(new Date());
  const windowEnd = addMonths(windowStart, months);

  let connectionString;
  try {
    connectionString = resolveDbConnectionString();
  } catch (error) {
    return NextResponse.json(buildEmptyData(windowStart, months, error.message));
  }

  try {
    const data = await fetchFromDatabase({ windowStart, windowEnd, halls, connectionString });
    return NextResponse.json({
      source: "database",
      range: {
        from: windowStart.toISOString(),
        to: windowEnd.toISOString(),
      },
      reservations: data.reservations,
      blackouts: data.blackouts,
    });
  } catch (error) {
    console.error("Failed to load hall availability:", error);
    const isConnectionIssue = ["ECONNREFUSED", "ENOTFOUND", "EHOSTUNREACH", "ECONNRESET", "ETIMEDOUT"].includes(
      error.code || ""
    );
    const reason = isConnectionIssue
      ? "Baza nije dostupna. Proveri DATABASE_URL (koristi Railway public connection string na Vercel-u)."
      : error.message;
    return NextResponse.json(buildEmptyData(windowStart, months, reason), { status: 200 });
  }
}

export async function POST(request) {
  let connectionString;
  try {
    connectionString = resolveDbConnectionString();
  } catch (error) {
    return NextResponse.json(
      { error: error.message, hint: "Postavi DATABASE_URL (Railway public connection string za Vercel) i ponovi." },
      { status: 503 }
    );
  }

  const payload = await request.json();
  const {
    hallType,
    startAt,
    endAt,
    guestName,
    guestEmail,
    guestPhone,
    notes,
  } = payload || {};

  if (!HALL_TYPES.includes(hallType)) {
    return NextResponse.json({ error: "hallType mora biti 'velika' ili 'mala'." }, { status: 400 });
  }

  const start = startAt ? new Date(startAt) : null;
  const end = endAt ? new Date(endAt) : null;

  if (!start || !end || Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) {
    return NextResponse.json({ error: "Neispravan datum ili vreme." }, { status: 400 });
  }

  if (start >= end) {
    return NextResponse.json({ error: "Krajnje vreme mora biti posle pocetnog." }, { status: 400 });
  }

  if (!guestName || !guestName.trim()) {
    return NextResponse.json({ error: "Ime gosta je obavezno." }, { status: 400 });
  }

  const client = new Client({ connectionString });

  try {
    await client.connect();

    const insert = await client.query(
      `INSERT INTO hall_reservations (hall_type, start_at, end_at, guest_name, guest_email, guest_phone, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, hall_type, start_at, end_at, status, guest_name, guest_email, guest_phone, notes, created_at`,
      [
        hallType,
        start.toISOString(),
        end.toISOString(),
        guestName.trim(),
        guestEmail?.trim() || null,
        guestPhone?.trim() || null,
        notes?.trim() || null,
      ]
    );

    const record = insert.rows[0];

    return NextResponse.json(
      {
        ok: true,
        reservation: {
          ...mapReservationRow(record),
          createdAt: record.created_at instanceof Date ? record.created_at.toISOString() : record.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save hall reservation:", error);
    const isOverlap = error.code === "23P01";
    const isConnectionIssue = ["ECONNREFUSED", "ENOTFOUND", "EHOSTUNREACH", "ECONNRESET", "ETIMEDOUT"].includes(
      error.code || ""
    );
    return NextResponse.json(
      {
        error: isConnectionIssue
          ? "Baza nije dostupna. Proveri DATABASE_URL (Railway public connection string na Vercel-u)."
          : isOverlap
            ? "Termin se preklapa sa postojecim rezervacijama."
            : "Nije moguce sacuvati rezervaciju.",
        details: isConnectionIssue ? undefined : error.message,
      },
      { status: isConnectionIssue ? 503 : isOverlap ? 409 : 500 }
    );
  } finally {
    await client.end();
  }
}
