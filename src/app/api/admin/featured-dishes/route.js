import { NextResponse } from "next/server";
import { getDbClient, requireAdmin } from "../_utils";

const mapDishRow = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description || "",
  imageUrl: row.image_url,
  price: row.price || "",
  sort: row.sort ?? 0,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const parseSort = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export async function GET(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query(
      `SELECT id, title, description, image_url, price, sort, created_at, updated_at
       FROM featured_dishes
       ORDER BY sort ASC, id DESC`
    );

    return NextResponse.json({ items: result.rows.map(mapDishRow) });
  } catch (error) {
    console.error("Admin featured dishes GET failed:", error);
    return NextResponse.json({ error: "Failed to fetch featured dishes" }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function POST(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  const payload = await request.json();
  const { title, description, imageUrl, price, sort = 0 } = payload || {};

  if (!title || !title.trim() || !imageUrl || !imageUrl.trim()) {
    return NextResponse.json({ error: "Naslov i slika su obavezni." }, { status: 400 });
  }

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query(
      `INSERT INTO featured_dishes (title, description, image_url, price, sort)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, description, image_url, price, sort, created_at, updated_at`,
      [title.trim(), description?.trim() || null, imageUrl.trim(), price?.trim() || null, parseSort(sort)]
    );

    return NextResponse.json({ ok: true, item: mapDishRow(result.rows[0]) }, { status: 201 });
  } catch (error) {
    console.error("Admin featured dishes POST failed:", error);
    return NextResponse.json({ error: "Failed to save dish" }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function PATCH(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  const payload = await request.json();
  const { id, title, description, imageUrl, price, sort = 0 } = payload || {};
  const numericId = Number(id);

  if (!numericId) {
    return NextResponse.json({ error: "Nedostaje ID jela za izmenu." }, { status: 400 });
  }

  if (!title || !title.trim() || !imageUrl || !imageUrl.trim()) {
    return NextResponse.json({ error: "Naslov i slika su obavezni." }, { status: 400 });
  }

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query(
      `UPDATE featured_dishes
       SET title = $2,
           description = $3,
           image_url = $4,
           price = $5,
           sort = $6,
           updated_at = NOW()
       WHERE id = $1
       RETURNING id, title, description, image_url, price, sort, created_at, updated_at`,
      [numericId, title.trim(), description?.trim() || null, imageUrl.trim(), price?.trim() || null, parseSort(sort)]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Jelo nije pronađeno." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, item: mapDishRow(result.rows[0]) });
  } catch (error) {
    console.error("Admin featured dishes PATCH failed:", error);
    return NextResponse.json({ error: "Nije uspelo ažuriranje jela" }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function DELETE(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  const payload = await request.json().catch(() => ({}));
  const idParam = payload?.id ?? request.nextUrl.searchParams.get("id");
  const numericId = Number(idParam);

  if (!numericId) {
    return NextResponse.json({ error: "Nedostaje ID jela za brisanje." }, { status: 400 });
  }

  const client = getDbClient();
  await client.connect();

  try {
    const result = await client.query("DELETE FROM featured_dishes WHERE id = $1", [numericId]);
    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Jelo nije pronađeno." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, id: numericId });
  } catch (error) {
    console.error("Admin featured dishes DELETE failed:", error);
    return NextResponse.json({ error: "Nije uspelo brisanje jela" }, { status: 500 });
  } finally {
    await client.end();
  }
}
