import { NextResponse } from "next/server";

import { getHallBookingEnabled, getShowcaseForPage } from "@library/site-content";

const ALLOWED_SECTIONS = new Set(["svecanasala", "restoran", "bazen"]);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const section = (searchParams.get("section") || "").trim().toLowerCase();

  if (!ALLOWED_SECTIONS.has(section)) {
    return NextResponse.json(
      { error: "Invalid section. Use one of: svecanasala, restoran, bazen." },
      { status: 400 },
    );
  }

  const showcase = await getShowcaseForPage(section);
  if (!showcase) {
    return NextResponse.json({ error: "Section data not found." }, { status: 404 });
  }

  const hallBookingEnabled = await getHallBookingEnabled();
  return NextResponse.json({
    section,
    showcase,
    hallBookingEnabled,
  });
}

