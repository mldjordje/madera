import { NextResponse } from "next/server";
import { tryGetDbClient } from "../admin/_utils";
import { getDemoFeaturedDishes } from "@library/demoStore";

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
  const client = tryGetDbClient();

  if (!client) {
    return NextResponse.json({ items: getDemoFeaturedDishes(), source: "demo" }, { status: 200 });
  }

  try {
    await client.connect();
    const result = await client.query(
      `SELECT id, title, description, image_url, price, sort
       FROM featured_dishes
       ORDER BY sort ASC, id DESC
       LIMIT 50`
    );

    return NextResponse.json({ items: result.rows.map(mapDishRow) });
  } catch (error) {
    console.error("Public featured dishes GET failed:", error);
    return NextResponse.json({ items: getDemoFeaturedDishes(), source: "demo", error: error.message }, { status: 200 });
  } finally {
    await client.end();
  }
}
