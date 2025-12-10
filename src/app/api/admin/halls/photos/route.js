import { NextResponse } from "next/server";

import { getDbClient, requireAdmin } from "../../_utils";

const HALL_TYPES = ["velika", "mala"];

const mapPhoto = (row) => ({
  id: row.id,
  hallType: row.hall_type,
  url: row.url,
  alt: row.alt || "",
  sort: row.sort ?? 0,
});

export async function GET(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query(
      "SELECT id, hall_type, url, alt, sort FROM hall_photos ORDER BY hall_type, sort, id"
    );
    const grouped = { velika: [], mala: [] };
    result.rows.forEach((row) => {
      if (grouped[row.hall_type]) {
        grouped[row.hall_type].push(mapPhoto(row));
      }
    });
    return NextResponse.json({ photos: grouped });
  } catch (error) {
    console.error("Admin hall photos GET failed:", error);
    return NextResponse.json({ error: "Nije uspelo ucitavanje slika sala." }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function POST(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  let payload = {};
  try {
    payload = await request.json();
  } catch (err) {
    // ignore
  }

  const hallType = typeof payload.hallType === "string" ? payload.hallType : "";
  const url = typeof payload.url === "string" ? payload.url.trim() : "";
  const alt = typeof payload.alt === "string" ? payload.alt.trim() : "";
  const sort = Number.isFinite(payload.sort) ? payload.sort : Number(payload.sort) || 0;

  if (!HALL_TYPES.includes(hallType)) {
    return NextResponse.json({ error: "hallType mora biti 'velika' ili 'mala'." }, { status: 400 });
  }

  if (!url) {
    return NextResponse.json({ error: "URL slike je obavezan." }, { status: 400 });
  }

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query(
      `INSERT INTO hall_photos (hall_type, url, alt, sort)
       VALUES ($1, $2, $3, $4)
       RETURNING id, hall_type, url, alt, sort`,
      [hallType, url, alt || null, sort]
    );

    return NextResponse.json({ photo: mapPhoto(result.rows[0]) }, { status: 201 });
  } catch (error) {
    console.error("Admin hall photos POST failed:", error);
    return NextResponse.json({ error: "Nije uspelo cuvanje slike." }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function PATCH(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  let payload = {};
  try {
    payload = await request.json();
  } catch (err) {
    // ignore
  }

  const id = Number(payload.id);
  const hallType = typeof payload.hallType === "string" ? payload.hallType : undefined;
  const url = typeof payload.url === "string" ? payload.url.trim() : undefined;
  const alt = typeof payload.alt === "string" ? payload.alt.trim() : undefined;
  const sort = payload.sort !== undefined ? (Number(payload.sort) || 0) : undefined;

  if (!id) {
    return NextResponse.json({ error: "ID je obavezan." }, { status: 400 });
  }

  if (hallType && !HALL_TYPES.includes(hallType)) {
    return NextResponse.json({ error: "hallType mora biti 'velika' ili 'mala'." }, { status: 400 });
  }

  const updates = [];
  const values = [];
  let idx = 1;

  if (hallType) {
    updates.push(`hall_type = $${idx++}`);
    values.push(hallType);
  }
  if (url !== undefined) {
    updates.push(`url = $${idx++}`);
    values.push(url);
  }
  if (alt !== undefined) {
    updates.push(`alt = $${idx++}`);
    values.push(alt || null);
  }
  if (sort !== undefined) {
    updates.push(`sort = $${idx++}`);
    values.push(sort);
  }

  if (!updates.length) {
    return NextResponse.json({ error: "Nema promena za cuvanje." }, { status: 400 });
  }

  values.push(id);

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query(
      `UPDATE hall_photos
       SET ${updates.join(", ")}
       WHERE id = $${idx}
       RETURNING id, hall_type, url, alt, sort`,
      values
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Slika nije pronadjena." }, { status: 404 });
    }

    return NextResponse.json({ photo: mapPhoto(result.rows[0]) });
  } catch (error) {
    console.error("Admin hall photos PATCH failed:", error);
    return NextResponse.json({ error: "Nije uspelo azuriranje slike." }, { status: 500 });
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
    return NextResponse.json({ error: "ID je obavezan." }, { status: 400 });
  }

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query("DELETE FROM hall_photos WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Slika nije pronadjena." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin hall photos DELETE failed:", error);
    return NextResponse.json({ error: "Nije uspelo brisanje slike." }, { status: 500 });
  } finally {
    await client.end();
  }
}
