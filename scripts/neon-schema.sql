-- Madera Neon schema
-- Run with: psql "$DATABASE_URL" -f scripts/neon-schema.sql

CREATE TABLE IF NOT EXISTS site_gallery_items (
  id BIGSERIAL PRIMARY KEY,
  section_key TEXT NOT NULL CHECK (
    section_key IN ('svecana_velika', 'svecana_mala', 'restoran', 'bazen')
  ),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  layout TEXT NOT NULL DEFAULT 'default' CHECK (layout IN ('default', 'wide', 'tall')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_gallery_items_section_sort
  ON site_gallery_items (section_key, sort_order, id);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (key, value, updated_at)
VALUES ('hall_booking', '{"enabled": false}'::jsonb, NOW())
ON CONFLICT (key) DO NOTHING;

