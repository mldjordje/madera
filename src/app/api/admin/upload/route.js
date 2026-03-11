import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { requireAdmin } from "../_auth";

function sanitizeSegment(value, fallback) {
  const cleaned = String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || fallback;
}

function fileExtension(fileName) {
  const parts = String(fileName || "").split(".");
  const ext = parts.length > 1 ? parts.pop().toLowerCase() : "";
  return ext.replace(/[^a-z0-9]/g, "") || "jpg";
}

export async function POST(request) {
  const auth = requireAdmin(request);
  if (!auth.ok) {
    return auth.response;
  }

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!blobToken) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is missing. Configure Vercel Blob token first." },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const sectionKey = sanitizeSegment(formData.get("sectionKey"), "uploads");
    const ext = fileExtension(file.name);
    const pathname = `madera/${sectionKey}/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const uploaded = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
      token: blobToken,
      contentType: file.type || undefined,
    });

    return NextResponse.json({
      url: uploaded.url,
      pathname: uploaded.pathname,
    });
  } catch (error) {
    console.error("Blob upload failed:", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}

