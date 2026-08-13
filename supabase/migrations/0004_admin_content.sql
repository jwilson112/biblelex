-- Devotionals
CREATE TABLE IF NOT EXISTS devotionals (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  reading_reference TEXT,
  audience TEXT DEFAULT 'general',
  tags TEXT[],
  author TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- Maps
CREATE TABLE IF NOT EXISTS maps (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  region TEXT,
  related_references TEXT[],
  audience TEXT DEFAULT 'general'
);

-- Kids Bibles
CREATE TABLE IF NOT EXISTS kids_bibles (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  language TEXT NOT NULL,
  age_range TEXT,
  description TEXT,
  source TEXT,
  license_type TEXT NOT NULL,
  license_text TEXT,
  attribution TEXT
);

-- Devotional plans
CREATE TABLE IF NOT EXISTS devotional_plans (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  total_days INT NOT NULL,
  is_kids BOOLEAN DEFAULT FALSE
);

-- Devotional plan entries
CREATE TABLE IF NOT EXISTS devotional_plan_entries (
  id BIGSERIAL PRIMARY KEY,
  plan_id BIGINT NOT NULL REFERENCES devotional_plans(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  devotional_id BIGINT NOT NULL REFERENCES devotionals(id) ON DELETE CASCADE,
  UNIQUE (plan_id, day_number)
);

-- Settings
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB
);

INSERT INTO settings (key, value)
VALUES ('features', '{"kids_mode": true}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_devotionals_audience ON devotionals(audience);
CREATE INDEX IF NOT EXISTS idx_maps_audience ON maps(audience);
