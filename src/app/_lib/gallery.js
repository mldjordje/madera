import GalleryData from "@data/gallery.json";
import { getDemoGalleryCombined } from "@library/demoStore";

const CMS_GALLERY_ENDPOINT = process.env.CMS_GALLERY_ENDPOINT;
const CMS_GALLERY_TOKEN = process.env.CMS_GALLERY_TOKEN;

async function fetchFromCms() {
  if (!CMS_GALLERY_ENDPOINT) return null;

  try {
    const headers = { "content-type": "application/json" };

    if (CMS_GALLERY_TOKEN) {
      headers.Authorization = `Bearer ${CMS_GALLERY_TOKEN}`;
    }

    const response = await fetch(CMS_GALLERY_ENDPOINT, {
      cache: "no-store",
      headers,
    });

    if (!response.ok) {
      console.warn(`[gallery] CMS request failed with status ${response.status}`);
      return null;
    }

    const payload = await response.json();

    if (!payload || !Array.isArray(payload.categories)) {
      console.warn("[gallery] CMS payload missing categories array");
      return null;
    }

    return {
      intro: payload.intro || GalleryData.intro,
      categories: payload.categories,
    };
  } catch (error) {
    console.warn("[gallery] Unable to fetch CMS gallery content", error);
    return null;
  }
}

export async function fetchGalleryData() {
  const demoData = getDemoGalleryCombined();
  if (demoData?.categories?.length) return demoData;

  const cmsData = await fetchFromCms();
  if (cmsData) return cmsData;

  return {
    intro: GalleryData.intro,
    categories: GalleryData.categories || [],
  };
}

export function combineGalleryItems(categories = []) {
  return categories.flatMap((category) => category.items || []);
}
