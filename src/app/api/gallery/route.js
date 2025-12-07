import { NextResponse } from "next/server";

import { fetchGalleryData } from "@library/gallery";

export async function GET() {
  const data = await fetchGalleryData();

  return NextResponse.json(data);
}
