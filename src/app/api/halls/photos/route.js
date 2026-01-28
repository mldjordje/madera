import { NextResponse } from "next/server";

import halls from "@data/halls.json";
import { getDbClient } from "../../admin/_utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const HALL_TYPES = ["velika", "mala"];

const mapPhoto = (row) => ({
  id: row.id,
  hallType: row.hall_type,
  url: row.url,
  alt: row.alt || "",
  sort: row.sort ?? 0,
});

const defaultPhotos = halls.halls.reduce((acc, hall) => {
  acc[hall.slug] = [{ id: `static-${hall.slug}`, hallType: hall.slug, url: hall.image, alt: hall.name, sort: 0 }];
  return acc;
}, {});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const hallParam = searchParams.get("hall");
  const hallsFilter = hallParam ? HALL_TYPES.filter((h) => h === hallParam) : HALL_TYPES;

  if (!hallsFilter.length) {
    return NextResponse.json({ error: "Invalid hall parameter." }, { status: 400 });
  }

  let client;

  try {
    client = getDbClient();
    await client.connect();
    const result = await client.query(
      `SELECT id, hall_type, url, alt, sort
       FROM hall_photos
       WHERE hall_type = ANY($1)
       ORDER BY hall_type, sort, id`,
      [hallsFilter]
    );

    const grouped = { velika: [], mala: [] };
    result.rows.forEach((row) => {
      if (grouped[row.hall_type]) {
        grouped[row.hall_type].push(mapPhoto(row));
      }
    });

    // Use defaults for halls without uploaded photos
    HALL_TYPES.forEach((hall) => {
      if (!grouped[hall] || grouped[hall].length === 0) {
        grouped[hall] = defaultPhotos[hall] || [];
      }
    });

    return NextResponse.json({ source: "database", photos: grouped });
  } catch (error) {
    console.error("Hall photos GET failed:", error);
    return NextResponse.json({ source: "fallback", photos: defaultPhotos });
  } finally {
    if (client) {
      await client.end();
    }
  }
}
