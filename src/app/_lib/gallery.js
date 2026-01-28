import GalleryData from "@data/gallery.json";

export async function fetchGalleryData() {
  return {
    intro: GalleryData.intro,
    categories: GalleryData.categories || [],
  };
}

export function combineGalleryItems(categories = []) {
  return categories.flatMap((category) => category.items || []);
}
