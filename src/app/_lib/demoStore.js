import { addDays, addHours, startOfDay } from "date-fns";

import GalleryData from "@data/gallery.json";
import HallSettings from "@data/hall-settings.json";
import HallsData from "@data/halls.json";
import Products from "@data/products";

const buildGallery = () => {
  const categories = [];
  const items = [];
  let nextCategoryId = 1;
  let nextItemId = 1;

  (GalleryData.categories || []).forEach((category) => {
    const categoryId = nextCategoryId++;
    categories.push({
      id: categoryId,
      slug: category.slug,
      title: category.title,
      description: category.description || "",
    });

    (category.items || []).forEach((item, index) => {
      items.push({
        id: nextItemId++,
        categoryId,
        url: item.url,
        orientation: item.orientation || "h",
        alt: item.alt || "",
        sort: Number.isFinite(item.sort) ? item.sort : index,
      });
    });
  });

  return { categories, items, nextCategoryId, nextItemId };
};

const buildFeaturedDishes = () => {
  const list = (Products.collection?.popular || []).map((item, index) => ({
    id: index + 1,
    title: item.title,
    description: item.text || "",
    imageUrl: item.image,
    price: item.price ? `${item.price} ${item.currency || ""}`.trim() : "",
    sort: index,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return { items: list, nextId: list.length + 1 };
};

const buildHallPhotos = () => {
  const grouped = { velika: [], mala: [] };
  let nextId = 1;

  (HallsData.halls || []).forEach((hall) => {
    grouped[hall.slug] = [
      {
        id: nextId++,
        hallType: hall.slug,
        url: hall.image,
        alt: hall.name,
        sort: 0,
      },
    ];
  });

  return { photos: grouped, nextId };
};

const buildHallReservations = () => {
  const today = startOfDay(new Date());

  const makeSlot = (dayOffset, hour, durationHours) => {
    const start = addHours(addDays(today, dayOffset), hour);
    const end = addHours(start, durationHours);
    return { startAt: start.toISOString(), endAt: end.toISOString() };
  };

  const reservations = [
    {
      id: 1,
      hallType: "velika",
      ...makeSlot(4, 17, 6),
      guestName: "Marko Petrovic",
      guestEmail: "marko@example.com",
      guestPhone: "+381 60 123 456",
      status: "confirmed",
      notes: "Svadba",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      hallType: "mala",
      ...makeSlot(9, 18, 5),
      guestName: "Jovana Nikolic",
      guestEmail: "jovana@example.com",
      guestPhone: "+381 64 987 111",
      status: "pending",
      notes: "Rodjendan",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const blackouts = [
    {
      id: 1,
      hallType: "velika",
      startDate: addDays(today, 12).toISOString().slice(0, 10),
      endDate: addDays(today, 13).toISOString().slice(0, 10),
      reason: "Odrzavanje",
      createdAt: new Date().toISOString(),
    },
  ];

  return { reservations, blackouts, nextReservationId: 3, nextBlackoutId: 2 };
};

const createStore = () => ({
  gallery: buildGallery(),
  featuredDishes: buildFeaturedDishes(),
  hallSettings: {
    allowReservations: HallSettings.allowReservations !== false,
    contactPhone: HallSettings.contactPhone || "+381 63 000 000",
  },
  hallPhotos: buildHallPhotos(),
  halls: buildHallReservations(),
});

export function getDemoStore() {
  if (!globalThis.__maderaDemoStore) {
    globalThis.__maderaDemoStore = createStore();
  }

  return globalThis.__maderaDemoStore;
}

export function getDemoGalleryCombined() {
  const store = getDemoStore();
  const { categories, items } = store.gallery;

  const map = new Map();
  categories.forEach((cat) => map.set(cat.id, { ...cat, items: [] }));
  items.forEach((item) => {
    const bucket = map.get(item.categoryId);
    if (bucket) bucket.items.push(item);
  });

  return {
    intro: GalleryData.intro,
    categories: Array.from(map.values()),
  };
}

export function addDemoGalleryItem({ categorySlug, categoryTitle, categoryDescription, url, orientation, alt, sort }) {
  const store = getDemoStore();
  const slug = categorySlug?.trim();
  if (!slug || !url) return null;

  let category = store.gallery.categories.find((item) => item.slug === slug);
  if (!category) {
    category = {
      id: store.gallery.nextCategoryId++,
      slug,
      title: categoryTitle?.trim() || slug,
      description: categoryDescription?.trim() || "",
    };
    store.gallery.categories.push(category);
  } else {
    category = {
      ...category,
      title: categoryTitle?.trim() || category.title,
      description: categoryDescription?.trim() || category.description,
    };
    store.gallery.categories = store.gallery.categories.map((item) =>
      item.id === category.id ? category : item
    );
  }

  const item = {
    id: store.gallery.nextItemId++,
    categoryId: category.id,
    url,
    orientation: orientation || "h",
    alt: alt || "",
    sort: Number.isFinite(sort) ? sort : 0,
  };

  store.gallery.items.push(item);

  return { category, item };
}

export function getDemoFeaturedDishes() {
  return getDemoStore().featuredDishes.items;
}

export function addDemoFeaturedDish(payload) {
  const store = getDemoStore();
  const item = {
    id: store.featuredDishes.nextId++,
    title: payload.title?.trim(),
    description: payload.description?.trim() || "",
    imageUrl: payload.imageUrl?.trim(),
    price: payload.price?.trim() || "",
    sort: Number(payload.sort) || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.featuredDishes.items.push(item);
  return item;
}

export function updateDemoFeaturedDish(payload) {
  const store = getDemoStore();
  const id = Number(payload.id);
  const idx = store.featuredDishes.items.findIndex((item) => item.id === id);
  if (idx === -1) return null;

  const updated = {
    ...store.featuredDishes.items[idx],
    title: payload.title?.trim(),
    description: payload.description?.trim() || "",
    imageUrl: payload.imageUrl?.trim(),
    price: payload.price?.trim() || "",
    sort: Number(payload.sort) || 0,
    updatedAt: new Date().toISOString(),
  };
  store.featuredDishes.items[idx] = updated;
  return updated;
}

export function deleteDemoFeaturedDish(id) {
  const store = getDemoStore();
  const numericId = Number(id);
  const before = store.featuredDishes.items.length;
  store.featuredDishes.items = store.featuredDishes.items.filter((item) => item.id !== numericId);
  return store.featuredDishes.items.length < before;
}

export function getDemoHallSettings() {
  return getDemoStore().hallSettings;
}

export function updateDemoHallSettings(next) {
  const store = getDemoStore();
  store.hallSettings = {
    allowReservations: typeof next.allowReservations === "boolean" ? next.allowReservations : true,
    contactPhone: next.contactPhone?.trim() || store.hallSettings.contactPhone,
  };
  return store.hallSettings;
}

export function getDemoHallPhotos() {
  return getDemoStore().hallPhotos.photos;
}

export function addDemoHallPhoto(payload) {
  const store = getDemoStore();
  const photo = {
    id: store.hallPhotos.nextId++,
    hallType: payload.hallType,
    url: payload.url,
    alt: payload.alt || "",
    sort: Number(payload.sort) || 0,
  };
  if (!store.hallPhotos.photos[payload.hallType]) {
    store.hallPhotos.photos[payload.hallType] = [];
  }
  store.hallPhotos.photos[payload.hallType].push(photo);
  return photo;
}

export function updateDemoHallPhoto(payload) {
  const store = getDemoStore();
  const id = Number(payload.id);
  let updated = null;
  Object.keys(store.hallPhotos.photos).forEach((key) => {
    store.hallPhotos.photos[key] = store.hallPhotos.photos[key].map((photo) => {
      if (photo.id !== id) return photo;
      updated = {
        ...photo,
        hallType: payload.hallType || photo.hallType,
        url: payload.url ?? photo.url,
        alt: payload.alt ?? photo.alt,
        sort: payload.sort !== undefined ? Number(payload.sort) || 0 : photo.sort,
      };
      return updated;
    });
  });
  return updated;
}

export function deleteDemoHallPhoto(id) {
  const store = getDemoStore();
  const numericId = Number(id);
  let removed = false;
  Object.keys(store.hallPhotos.photos).forEach((key) => {
    const before = store.hallPhotos.photos[key].length;
    store.hallPhotos.photos[key] = store.hallPhotos.photos[key].filter((photo) => photo.id !== numericId);
    if (store.hallPhotos.photos[key].length < before) {
      removed = true;
    }
  });
  return removed;
}

export function getDemoHallData() {
  return getDemoStore().halls;
}

export function addDemoReservation(payload) {
  const store = getDemoStore();
  const reservation = {
    id: store.halls.nextReservationId++,
    hallType: payload.hallType,
    startAt: payload.startAt,
    endAt: payload.endAt,
    guestName: payload.guestName?.trim() || "Gost",
    guestEmail: payload.guestEmail?.trim() || "",
    guestPhone: payload.guestPhone?.trim() || "",
    status: payload.status || "pending",
    notes: payload.notes?.trim() || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.halls.reservations.unshift(reservation);
  return reservation;
}

export function updateDemoReservationStatus(id, status) {
  const store = getDemoStore();
  const numericId = Number(id);
  const idx = store.halls.reservations.findIndex((item) => item.id === numericId);
  if (idx === -1) return null;
  store.halls.reservations[idx] = {
    ...store.halls.reservations[idx],
    status,
    updatedAt: new Date().toISOString(),
  };
  return store.halls.reservations[idx];
}

export function addDemoBlackout(payload) {
  const store = getDemoStore();
  const blackout = {
    id: store.halls.nextBlackoutId++,
    hallType: payload.hallType,
    startDate: payload.startDate,
    endDate: payload.endDate,
    reason: payload.reason || "",
    createdAt: new Date().toISOString(),
  };
  store.halls.blackouts.unshift(blackout);
  return blackout;
}

export function deleteDemoBlackout(id) {
  const store = getDemoStore();
  const numericId = Number(id);
  const before = store.halls.blackouts.length;
  store.halls.blackouts = store.halls.blackouts.filter((item) => item.id !== numericId);
  return store.halls.blackouts.length < before;
}
