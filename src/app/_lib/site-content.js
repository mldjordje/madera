import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { pageShowcaseContent } from "@data/showcase-content";
import { getSqlClient, requireSqlClient } from "./neon-db";

export const GALLERY_SECTIONS = [
  { key: "svecana_velika", label: "Svecana sala - velika" },
  { key: "svecana_mala", label: "Svecana sala - mala" },
  { key: "restoran", label: "Restoran" },
  { key: "bazen", label: "Bazen" },
];

const SECTION_KEY_SET = new Set(GALLERY_SECTIONS.map((section) => section.key));
const SECTION_LABELS = GALLERY_SECTIONS.reduce((acc, section) => {
  acc[section.key] = section.label;
  return acc;
}, {});

const PAGE_SECTION_KEYS = {
  svecanasala: ["svecana_velika", "svecana_mala"],
  restoran: ["restoran"],
  bazen: ["bazen"],
};

const FALLBACK_SECTION_ITEMS = {
  svecana_velika: [
    {
      title: "Velika sala - prvi utisak",
      description: "Reprezentativan kadar prostora za vencanja, jubileje i veca slavlja.",
      category: "Velika sala",
      imageUrl: "/svecanasala/IMG_20250919_161505.jpg",
      altText: "Velika svecana sala",
      layout: "wide",
      sortOrder: 10,
    },
    {
      title: "Vecernja postavka",
      description: "Osvetljenje i dekoracija koji sali daju svecan, elegantan ton.",
      category: "Velika sala",
      imageUrl: "/svecanasala/IMG_20250918_165838.jpg",
      altText: "Vecernji ambijent velike sale",
      layout: "default",
      sortOrder: 20,
    },
    {
      title: "Raspored za slavlje",
      description: "Postavka koja ostavlja dovoljno prostora za goste, posluzenje i glavne trenutke veceri.",
      category: "Velika sala",
      imageUrl: "/svecanasala/IMG_20250920_164436.jpg",
      altText: "Raspored stolova u velikoj sali",
      layout: "default",
      sortOrder: 30,
    },
    {
      title: "Zimska postavka",
      description: "Topliji tonovi i puniji ambijent za slavlje u hladnijem delu godine.",
      category: "Velika sala",
      imageUrl: "/svecanasala/20251228_172631.jpg",
      altText: "Zimska postavka velike sale",
      layout: "default",
      sortOrder: 40,
    },
    {
      title: "Formalni raspored",
      description: "Urednija i ozbiljnija postavka za poslovna okupljanja i svecane prijeme.",
      category: "Velika sala",
      imageUrl: "/svecanasala/20230114_152110_0000.png",
      altText: "Formalna postavka velike sale",
      layout: "tall",
      sortOrder: 50,
    },
  ],
  svecana_mala: [
    {
      title: "Mala sala - elegantna postavka",
      description: "Topao prostor za intimnija slavlja, porodicne ruckove i privatne dogadjaje.",
      category: "Mala sala",
      imageUrl: "/svecanasala/IMG_20250918_165826.jpg",
      altText: "Mala sala elegantna postavka",
      layout: "wide",
      sortOrder: 10,
    },
    {
      title: "Mala sala - intimniji format",
      description: "Idealna kada zelite bliskiji ambijent i uredjen prostor za manje grupe gostiju.",
      category: "Mala sala",
      imageUrl: "/svecanasala/20240429_155233_0000.png",
      altText: "Mala sala Madera",
      layout: "default",
      sortOrder: 20,
    },
    {
      title: "Dekoracija male sale",
      description: "Detalji prostora koji stvaraju prijatan, nenametljivo svecan utisak.",
      category: "Mala sala",
      imageUrl: "/svecanasala/20240429_155322_0000.png",
      altText: "Dekoracija male sale",
      layout: "tall",
      sortOrder: 30,
    },
    {
      title: "Postavka za privatne proslave",
      description: "Raspored koji se lako prilagodjava broju gostiju i prirodi okupljanja.",
      category: "Mala sala",
      imageUrl: "/svecanasala/20240429_155400_0000.png",
      altText: "Postavka male sale",
      layout: "default",
      sortOrder: 40,
    },
    {
      title: "Detalji sale",
      description: "Uredjenje koje maloj sali daje uredan i gostoprimljiv karakter.",
      category: "Mala sala",
      imageUrl: "/svecanasala/20240429_155523_0000.png",
      altText: "Detalji male sale",
      layout: "default",
      sortOrder: 50,
    },
  ],
  restoran: [
    {
      title: "Glavni restoran",
      description: "Sirok kadar koji pokazuje topao enterijer i raspored prostora za goste.",
      category: "Restoran",
      imageUrl: "/restoran/IMG_20250921_184124.jpg",
      altText: "Glavni restoran Madera",
      layout: "wide",
      sortOrder: 10,
    },
    {
      title: "Terasa",
      description: "Otvoreni deo restorana za opusteniji ritam tokom toplijih dana.",
      category: "Restoran",
      imageUrl: "/restoran/IMG_20250919_173541.jpg",
      altText: "Terasa restorana",
      layout: "default",
      sortOrder: 20,
    },
    {
      title: "Ulaz i ambijent",
      description: "Prvi pogled na restoran i pristup koji gostima olaksava dolazak.",
      category: "Restoran",
      imageUrl: "/restoran/IMG_20231024_175715.jpg",
      altText: "Ulaz restorana",
      layout: "default",
      sortOrder: 30,
    },
    {
      title: "Vecernje osvetljenje",
      description: "Atmosfera restorana kada prostor dobije mirniji, elegantniji vecernji ton.",
      category: "Ambijent",
      imageUrl: "/restoran/IMG_20250919_174921.jpg",
      altText: "Vecernje osvetljenje restorana",
      layout: "default",
      sortOrder: 40,
    },
    {
      title: "Topli unutrasnji tonovi",
      description: "Drveni detalji i uredjen enterijer koji ostavljaju prijatan, domacinski utisak.",
      category: "Enterijer",
      imageUrl: "/restoran/20211124_081935.jpg",
      altText: "Topli enterijer restorana",
      layout: "default",
      sortOrder: 50,
    },
    {
      title: "Zona za rucak",
      description: "Praktican prostor za porodicne obroke, poslovne ruckove i dogovorena okupljanja.",
      category: "Enterijer",
      imageUrl: "/restoran/20211124_082159.jpg",
      altText: "Zona za rucak u restoranu",
      layout: "tall",
      sortOrder: 60,
    },
  ],
  bazen: [
    {
      title: "Relax zona - glavni kadar",
      description: "Vizuelni pregled prostora za letnji predah i opustanje u okviru kompleksa.",
      category: "Relax zona",
      imageUrl: "/sobe/IMG_20230906_180646.jpg",
      layout: "wide",
      sortOrder: 10,
    },
    {
      title: "Dodatni ugao prostora",
      description: "Jos jedan kadar koji pokazuje organizaciju i preglednost letnje zone za goste.",
      category: "Relax zona",
      imageUrl: "/sobe/IMG_20230906_180741.jpg",
      layout: "default",
      sortOrder: 20,
    },
    {
      title: "Prateci kadar",
      description: "Dnevni kadar koji daje realan utisak o atmosferi i rasporedu prostora.",
      category: "Relax zona",
      imageUrl: "/sobe/IMG_20230906_180904.jpg",
      layout: "default",
      sortOrder: 30,
    },
    {
      title: "Detalji enterijera",
      description: "Dodatni pogled na uredjene detalje koji pojacavaju osecaj komfora.",
      category: "Relax zona",
      imageUrl: "/sobe/IMG_20230906_180919.jpg",
      altText: "Detalji prostora za odmor",
      layout: "default",
      sortOrder: 40,
    },
    {
      title: "Topli tonovi",
      description: "Mirniji kadar prostora namenjenog dnevnom odmoru i letnjem predahu.",
      category: "Relax zona",
      imageUrl: "/sobe/IMG_20230906_180926.jpg",
      altText: "Topli tonovi ambijenta",
      layout: "default",
      sortOrder: 50,
    },
    {
      title: "Kutak za opustanje",
      description: "Intimniji kadar koji istice mirniju i udobniju stranu letnjeg boravka.",
      category: "Relax zona",
      imageUrl: "/sobe/IMG_20230906_180729.jpg",
      altText: "Kutak za opustanje",
      layout: "tall",
      sortOrder: 60,
    },
    {
      title: "Madera eksterijer",
      description: "Spoljasnji kadar kompleksa koji zaokruzuje utisak o ambijentu i lokaciji.",
      category: "Ambijent",
      imageUrl: "/img/4.jpg",
      altText: "Madera eksterijer",
      layout: "default",
      sortOrder: 70,
    },
  ],
};

const BOOKING_SETTING_KEY = "hall_booking";

function normalizeLayout(value) {
  if (value === "wide" || value === "tall") {
    return value;
  }
  return "default";
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function mapDbItem(row) {
  return {
    id: Number(row.id),
    sectionKey: row.section_key,
    title: row.title || "",
    description: row.description || "",
    category: row.category || "",
    imageUrl: row.image_url,
    altText: row.alt_text || "",
    layout: normalizeLayout(row.layout),
    sortOrder: toNumber(row.sort_order, 0),
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
    isFallback: false,
  };
}

function fallbackRecords(sectionKey) {
  const source = FALLBACK_SECTION_ITEMS[sectionKey] || [];
  return source.map((item, index) => ({
    id: null,
    sectionKey,
    title: item.title,
    description: item.description || "",
    category: item.category || SECTION_LABELS[sectionKey],
    imageUrl: item.imageUrl,
    altText: item.altText || item.title || "",
    layout: normalizeLayout(item.layout),
    sortOrder: toNumber(item.sortOrder, index * 10),
    createdAt: null,
    updatedAt: null,
    isFallback: true,
  }));
}

function groupBySection(rows) {
  const grouped = new Map();
  rows.forEach((row) => {
    const key = row.sectionKey;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key).push(row);
  });
  return grouped;
}

async function loadGalleryRows(sectionKeys) {
  const sql = getSqlClient();
  if (!sql) {
    return null;
  }

  try {
    const rows = await sql`
      SELECT
        id,
        section_key,
        title,
        description,
        category,
        image_url,
        alt_text,
        layout,
        sort_order,
        created_at,
        updated_at
      FROM site_gallery_items
      WHERE section_key = ANY(${sectionKeys})
      ORDER BY sort_order ASC, id ASC
    `;
    return rows.map(mapDbItem);
  } catch (error) {
    console.error("Unable to read gallery rows from Neon:", error);
    return null;
  }
}

function parseBookingSetting(rawValue) {
  if (!rawValue) return false;
  if (typeof rawValue === "object") {
    return Boolean(rawValue.enabled);
  }
  if (typeof rawValue === "string") {
    try {
      const parsed = JSON.parse(rawValue);
      return Boolean(parsed?.enabled);
    } catch (error) {
      return false;
    }
  }
  return false;
}

function normalizeInput(payload) {
  const sectionKey = String(payload?.sectionKey || "").trim();
  const imageUrl = String(payload?.imageUrl || "").trim();

  if (!SECTION_KEY_SET.has(sectionKey)) {
    throw new Error("Invalid sectionKey.");
  }

  if (!imageUrl) {
    throw new Error("imageUrl is required.");
  }

  const title = String(payload?.title || "").trim() || "Nova slika";
  const description = String(payload?.description || "").trim();
  const category = String(payload?.category || "").trim();
  const altText = String(payload?.altText || "").trim();
  const layout = normalizeLayout(payload?.layout);
  const sortOrder = toNumber(payload?.sortOrder, 0);

  return {
    sectionKey,
    title,
    description,
    category,
    imageUrl,
    altText,
    layout,
    sortOrder,
  };
}

function toShowcaseItem(record) {
  const sectionLabel = SECTION_LABELS[record.sectionKey] || "Galerija";
  const item = {
    src: record.imageUrl,
    title: record.title || sectionLabel,
    text: record.description || "",
    category: record.category || sectionLabel,
    alt: record.altText || record.title || sectionLabel,
  };

  if (record.layout === "wide" || record.layout === "tall") {
    item.layout = record.layout;
  }

  return item;
}

export function isValidSectionKey(sectionKey) {
  return SECTION_KEY_SET.has(sectionKey);
}

export async function getAdminGalleryPayload() {
  noStore();
  const sectionKeys = GALLERY_SECTIONS.map((section) => section.key);
  const dbRows = await loadGalleryRows(sectionKeys);
  const grouped = groupBySection(dbRows || []);

  const sections = GALLERY_SECTIONS.map((section) => {
    const dbItems = grouped.get(section.key) || [];
    const items = dbItems.length ? dbItems : fallbackRecords(section.key);
    return {
      key: section.key,
      label: section.label,
      items,
    };
  });

  return { sections };
}

export async function getShowcaseForPage(pageKey) {
  noStore();
  const base = pageShowcaseContent[pageKey];
  if (!base) {
    return null;
  }

  const sectionKeys = PAGE_SECTION_KEYS[pageKey];
  if (!sectionKeys?.length) {
    return base;
  }

  const dbRows = await loadGalleryRows(sectionKeys);
  const grouped = groupBySection(dbRows || []);

  const items = sectionKeys.flatMap((sectionKey) => {
    const records = grouped.get(sectionKey);
    const source = records?.length ? records : fallbackRecords(sectionKey);
    return source.map(toShowcaseItem);
  });

  return {
    ...base,
    items,
  };
}

export async function getHallBookingEnabled() {
  noStore();
  const sql = getSqlClient();
  if (!sql) {
    return false;
  }

  try {
    const rows = await sql`
      SELECT value
      FROM site_settings
      WHERE key = ${BOOKING_SETTING_KEY}
      LIMIT 1
    `;
    return parseBookingSetting(rows[0]?.value);
  } catch (error) {
    console.error("Unable to read hall booking setting:", error);
    return false;
  }
}

export async function updateHallBookingEnabled(enabled) {
  const sql = requireSqlClient();
  const value = JSON.stringify({ enabled: Boolean(enabled) });
  const rows = await sql`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (${BOOKING_SETTING_KEY}, ${value}::jsonb, NOW())
    ON CONFLICT (key)
    DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
    RETURNING value
  `;
  return parseBookingSetting(rows[0]?.value);
}

export async function createGalleryItem(payload) {
  const sql = requireSqlClient();
  const input = normalizeInput(payload);
  const rows = await sql`
    INSERT INTO site_gallery_items (
      section_key,
      title,
      description,
      category,
      image_url,
      alt_text,
      layout,
      sort_order
    )
    VALUES (
      ${input.sectionKey},
      ${input.title},
      ${input.description},
      ${input.category},
      ${input.imageUrl},
      ${input.altText},
      ${input.layout},
      ${input.sortOrder}
    )
    RETURNING
      id,
      section_key,
      title,
      description,
      category,
      image_url,
      alt_text,
      layout,
      sort_order,
      created_at,
      updated_at
  `;
  return mapDbItem(rows[0]);
}

export async function updateGalleryItem(id, payload) {
  const sql = requireSqlClient();
  const numericId = toNumber(id, NaN);
  if (!Number.isFinite(numericId)) {
    throw new Error("Valid id is required.");
  }

  const input = normalizeInput(payload);
  const rows = await sql`
    UPDATE site_gallery_items
    SET
      section_key = ${input.sectionKey},
      title = ${input.title},
      description = ${input.description},
      category = ${input.category},
      image_url = ${input.imageUrl},
      alt_text = ${input.altText},
      layout = ${input.layout},
      sort_order = ${input.sortOrder},
      updated_at = NOW()
    WHERE id = ${numericId}
    RETURNING
      id,
      section_key,
      title,
      description,
      category,
      image_url,
      alt_text,
      layout,
      sort_order,
      created_at,
      updated_at
  `;
  return rows.length ? mapDbItem(rows[0]) : null;
}

export async function deleteGalleryItem(id) {
  const sql = requireSqlClient();
  const numericId = toNumber(id, NaN);
  if (!Number.isFinite(numericId)) {
    throw new Error("Valid id is required.");
  }

  const rows = await sql`
    DELETE FROM site_gallery_items
    WHERE id = ${numericId}
    RETURNING id
  `;
  return rows.length > 0;
}
