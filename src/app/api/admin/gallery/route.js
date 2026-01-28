import { NextResponse } from "next/server";
import { requireAdmin, tryGetDbClient } from "../_utils";
import { addDemoGalleryItem, getDemoStore } from "@library/demoStore";

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

export async function GET(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  let client;
  const demoStore = getDemoStore();

  try {
    client = tryGetDbClient();
    if (!client) {
      return NextResponse.json({
        categories: demoStore.gallery.categories,
        items: demoStore.gallery.items,
        source: "demo",
      });
    }

    await client.connect();
    const categories = await client.query(
      "SELECT id, slug, title, description FROM gallery_categories ORDER BY title ASC"
    );
    const items = await client.query(
      "SELECT id, category_id, url, orientation, alt, sort FROM gallery_items ORDER BY category_id ASC, sort ASC, id ASC"
    );

    return NextResponse.json({
      categories: categories.rows.map(mapCategoryRow),
      items: items.rows.map(mapItemRow),
    });
  } catch (error) {
    console.error("Admin gallery GET failed:", error);
    return NextResponse.json({
      categories: demoStore.gallery.categories,
      items: demoStore.gallery.items,
      source: "demo",
      error: error.message,
    });
  } finally {
    if (client) {
      await client.end();
    }
  }
}

export async function POST(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) return auth.response;

  const payload = await request.json();
  const {
    categorySlug,
    categoryTitle,
    categoryDescription,
    url,
    orientation = "h",
    alt,
    sort = 0,
  } = payload || {};

  if (!categorySlug || (!url)) {
    return NextResponse.json({ error: "categorySlug and url (ili fajl) su obavezni" }, { status: 400 });
  }

  let client;

  try {
    client = tryGetDbClient();
    if (!client) {
      const result = addDemoGalleryItem({
        categorySlug,
        categoryTitle,
        categoryDescription,
        url,
        orientation,
        alt,
        sort,
      });
      if (!result) {
        return NextResponse.json({ error: "Nije uspelo cuvanje slike." }, { status: 500 });
      }
      return NextResponse.json({ ok: true, category: result.category, item: result.item, source: "demo" });
    }

    await client.connect();
    await client.query("BEGIN");

    const catResult = await client.query(
      `INSERT INTO gallery_categories (slug, title, description)
       VALUES ($1, COALESCE($2, $1), $3)
       ON CONFLICT (slug) DO UPDATE SET title = COALESCE(EXCLUDED.title, gallery_categories.title), description = COALESCE(EXCLUDED.description, gallery_categories.description)
       RETURNING id, slug, title, description`,
      [categorySlug, categoryTitle, categoryDescription]
    );

    const categoryId = catResult.rows[0].id;

    const itemResult = await client.query(
      `INSERT INTO gallery_items (category_id, url, orientation, alt, sort)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, category_id, url, orientation, alt, sort`,
      [categoryId, url, orientation, alt, sort]
    );

    await client.query("COMMIT");

    return NextResponse.json({
      ok: true,
      category: mapCategoryRow(catResult.rows[0]),
      item: mapItemRow(itemResult.rows[0]),
    });
  } catch (error) {
    if (client) {
      await client.query("ROLLBACK");
    }
    console.error("Admin gallery POST failed:", error);
    const result = addDemoGalleryItem({
      categorySlug,
      categoryTitle,
      categoryDescription,
      url,
      orientation,
      alt,
      sort,
    });
    if (result) {
      return NextResponse.json({ ok: true, category: result.category, item: result.item, source: "demo" });
    }
    return NextResponse.json({ error: "Failed to save gallery item" }, { status: 500 });
  } finally {
    if (client) {
      await client.end();
    }
  }
}
