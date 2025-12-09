import { NextResponse } from "next/server";
import { Client } from "pg";
import { resolveDbConnectionString } from "../admin/_utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const mapDishRow = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description || "",
  imageUrl: row.image_url,
  price: row.price || "",
  sort: row.sort ?? 0,
});

export async function GET() {
  let connectionString;

  try {
    connectionString = resolveDbConnectionString();
  } catch (error) {
    return NextResponse.json({ items: [], reason: error.message }, { status: 200 });
  }

  const client = new Client({ connectionString });
  await client.connect();

  try {
    const result = await client.query(
      `SELECT id, title, description, image_url, price, sort
       FROM featured_dishes
       ORDER BY sort ASC, id DESC
       LIMIT 50`
    );

    return NextResponse.json({ items: result.rows.map(mapDishRow) });
  } catch (error) {
    console.error("Public featured dishes GET failed:", error);
    return NextResponse.json({ items: [], error: "Failed to load featured dishes" }, { status: 500 });
  } finally {
    await client.end();
  }
}
