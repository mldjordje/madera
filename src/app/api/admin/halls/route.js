import { NextResponse } from "next/server";
import { getDbClient, requireAdmin } from "../_utils";

const mapReservation = (row) => ({
  id: row.id,
  hallType: row.hall_type,
  startAt: row.start_at,
  endAt: row.end_at,
  guestName: row.guest_name,
  guestEmail: row.guest_email,
  guestPhone: row.guest_phone,
  status: row.status,
  notes: row.notes,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const mapBlackout = (row) => ({
  id: row.id,
  hallType: row.hall_type,
  startDate: row.start_date,
  endDate: row.end_date,
  reason: row.reason,
  createdAt: row.created_at,
});

export async function GET(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  const client = getDbClient();
  await client.connect();

  try {
    const reservationsPromise = client.query(
      `SELECT id, hall_type, start_at, end_at, guest_name, guest_email, guest_phone, status, notes, created_at, updated_at
       FROM hall_reservations
       ORDER BY start_at DESC
       LIMIT 200`
    );
    const blackoutsPromise = client.query(
      `SELECT id, hall_type, start_date, end_date, reason, created_at
       FROM hall_blackouts
       ORDER BY start_date DESC
       LIMIT 100`
    );

    const [reservations, blackouts] = await Promise.all([reservationsPromise, blackoutsPromise]);

    return NextResponse.json({
      reservations: reservations.rows.map(mapReservation),
      blackouts: blackouts.rows.map(mapBlackout),
    });
  } catch (error) {
    console.error("Admin halls GET failed:", error);
    return NextResponse.json({ error: "Failed to fetch hall data" }, { status: 500 });
  } finally {
    await client.end();
  }
}

