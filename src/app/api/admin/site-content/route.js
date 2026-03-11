import { NextResponse } from "next/server";

import { requireAdmin } from "../_auth";
import {
  createGalleryItem,
  deleteGalleryItem,
  getAdminGalleryPayload,
  updateGalleryItem,
} from "@library/site-content";

function withAuth(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) {
    return auth.response;
  }
  return null;
}

export async function GET(request) {
  const denied = withAuth(request);
  if (denied) return denied;

  const payload = await getAdminGalleryPayload();
  return NextResponse.json(payload);
}

export async function POST(request) {
  const denied = withAuth(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    const item = await createGalleryItem(body);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to create gallery item." }, { status: 400 });
  }
}

export async function PATCH(request) {
  const denied = withAuth(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    const id = Number(body?.id);
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: "Valid id is required." }, { status: 400 });
    }

    const item = await updateGalleryItem(id, body);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to update gallery item." }, { status: 400 });
  }
}

export async function DELETE(request) {
  const denied = withAuth(request);
  if (denied) return denied;

  try {
    const body = await request.json();
    const id = Number(body?.id);
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: "Valid id is required." }, { status: 400 });
    }

    const deleted = await deleteGalleryItem(id);
    if (!deleted) {
      return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Unable to delete gallery item." }, { status: 400 });
  }
}

