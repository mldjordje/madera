import { NextResponse } from "next/server";
import { getDbClient } from "../admin/_utils";
import GalleryData from "@data/gallery.json";

const mapCategoryRow = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  description: row.description,
});

const mapItemRow = (row) => ({
  id: row.id,
  categoryId: row.category_id,
  url: row.url,
  orientation: row.orientation,
  alt: row.alt,
  sort: row.sort ?? 0,
});

function combine(categories = [], items = []) {
  const map = new Map();
  categories.forEach((cat) => map.set(cat.id, { ...cat, items: [] }));
  items.forEach((item) => {
    const bucket = map.get(item.categoryId);
    if (bucket) bucket.items.push(item);
  });
  return Array.from(map.values());
}

export async function GET() {
  const client = getDbClient();
  await client.connect();

  try {
    const categories = await client.query(
      "SELECT id, slug, title, description FROM gallery_categories ORDER BY title ASC"
    );
    const items = await client.query(
      "SELECT id, category_id, url, orientation, alt, sort FROM gallery_items ORDER BY category_id ASC, sort ASC, id ASC"
    );

    const cats = categories.rows.map(mapCategoryRow);
    const pics = items.rows.map(mapItemRow);

    const combined = combine(cats, pics).filter((cat) => (cat.items || []).length > 0);

    if (!combined.length) {
      throw new Error("No categories with items in database");
    }

    return NextResponse.json({
      intro: GalleryData.intro,
      categories: combined,
    });
  } catch (error) {
    return NextResponse.json({
      intro: GalleryData.intro,
      categories: [],
      reason: error.message,
    });
  } finally {
    await client.end();
  }
}
