-- Base schema for Railway PostgreSQL
-- Run this from psql:  \i scripts/railway-schema.sql

-- Enable indexes needed for range-overlap constraint
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Gallery categories and items (aligns with src/data/gallery.json shape)
CREATE TABLE IF NOT EXISTS gallery_categories (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES gallery_categories(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  orientation VARCHAR(1) NOT NULL CHECK (orientation IN ('h', 'v')),
  alt TEXT,
  sort INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_items_category_sort
  ON gallery_items (category_id, sort, id);

-- Hall reservations and blackout periods
CREATE TABLE IF NOT EXISTS hall_blackouts (
  id BIGSERIAL PRIMARY KEY,
  hall_type TEXT NOT NULL CHECK (hall_type IN ('velika', 'mala')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hall_reservations (
  id BIGSERIAL PRIMARY KEY,
  hall_type TEXT NOT NULL CHECK (hall_type IN ('velika', 'mala')),
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (start_at < end_at)
);

CREATE INDEX IF NOT EXISTS idx_hall_reservations_hall_start
  ON hall_reservations (hall_type, start_at DESC);

-- Prevent overlapping reservations for the same hall when status is pending/confirmed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'hall_reservations_no_overlap'
  ) THEN
    ALTER TABLE hall_reservations
    ADD CONSTRAINT hall_reservations_no_overlap
    EXCLUDE USING GIST (
      hall_type WITH =,
      tstzrange(start_at, end_at, '[)') WITH &&
    ) WHERE (status IN ('pending', 'confirmed'));
  END IF;
END$$;
