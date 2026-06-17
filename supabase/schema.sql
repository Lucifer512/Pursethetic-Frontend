-- ============================================================
--  Pursethetic — Supabase Database Schema
--  Run once in: Supabase Dashboard → SQL Editor
-- ============================================================


-- ── SHARED TRIGGER ───────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ── 1. CATEGORIES ────────────────────────────────────────────
--  Bag types (Tote, Shoulder, Hobo, Mini, etc.)
--  Products reference a category by ID (FK) and cache its name
--  in the denormalized `products.category` column for fast reads.

CREATE TABLE IF NOT EXISTS categories (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT        UNIQUE NOT NULL,   -- URL-safe: "shoulder-bag"
  name        TEXT        UNIQUE NOT NULL,   -- Display: "Shoulder"
  description TEXT        NOT NULL DEFAULT '',
  image       TEXT        NOT NULL DEFAULT '',   -- category hero image URL
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories (sort_order);


-- ── 2. COLLECTIONS ───────────────────────────────────────────
--  Curated editorial groupings of products.
--  Examples: "Eid Edit 2026", "New Arrivals", "Best Sellers".
--  A product can belong to multiple collections (via junction table).

CREATE TABLE IF NOT EXISTS collections (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT        UNIQUE NOT NULL,   -- used in URL: /collection/<slug>
  name         TEXT        NOT NULL,          -- "Eid Edit 2026"
  tagline      TEXT        NOT NULL DEFAULT '',   -- short subtitle on cards
  description  TEXT        NOT NULL DEFAULT '',
  cover_image  TEXT        NOT NULL DEFAULT '',   -- hero banner image URL
  badge_text   TEXT        NOT NULL DEFAULT '',   -- e.g. "New", "Limited Edition"
  is_active    BOOLEAN     NOT NULL DEFAULT true, -- false = hidden from storefront
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_collections_active_sort ON collections (is_active, sort_order);


-- ── 3. PRODUCTS ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS products (
  id              TEXT        PRIMARY KEY,               -- matches slug (e.g. "hobo-brown")
  slug            TEXT        UNIQUE NOT NULL,
  name            TEXT        NOT NULL,
  price           INTEGER     NOT NULL DEFAULT 0,        -- price in PKR (Pakistani Rupees)
  category        TEXT        NOT NULL DEFAULT '',       -- denormalized name for fast reads / filtering
  category_id     UUID        REFERENCES categories(id) ON DELETE SET NULL,
  description     TEXT        NOT NULL DEFAULT '',
  details         TEXT        NOT NULL DEFAULT '',
  shipping        TEXT        NOT NULL DEFAULT 'Nationwide shipping. Free on orders over Rs. 4,000.',
  care            TEXT        NOT NULL DEFAULT 'Wipe gently with a damp cloth. Store in a dust bag when not in use.',
  featured        BOOLEAN     NOT NULL DEFAULT false,
  sort_order      INTEGER     NOT NULL DEFAULT 0,
  image           TEXT        NOT NULL DEFAULT '',       -- primary image URL
  secondary_image TEXT        NOT NULL DEFAULT '',       -- hover / alternate image URL
  images          TEXT[]      NOT NULL DEFAULT '{}',     -- full gallery array (ordered)
  tags            TEXT[]      NOT NULL DEFAULT '{}',     -- e.g. ["new", "sale", "limited"]
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_products_category    ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured    ON products (featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_sort        ON products (sort_order);


-- ── 4. PRODUCT_COLLECTIONS ───────────────────────────────────
--  Many-to-many junction: which products belong to which collection,
--  and in what order they appear within that collection.

CREATE TABLE IF NOT EXISTS product_collections (
  product_id    TEXT    NOT NULL REFERENCES products(id)    ON DELETE CASCADE,
  collection_id UUID    NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (product_id, collection_id)
);

CREATE INDEX IF NOT EXISTS idx_pc_collection ON product_collections (collection_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_pc_product    ON product_collections (product_id);


-- ── ROW LEVEL SECURITY ───────────────────────────────────────
--  Admin API uses the service_role key, which bypasses RLS entirely.
--  The public storefront uses the anon key, so RLS controls what it can read.

ALTER TABLE categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections         ENABLE ROW LEVEL SECURITY;
ALTER TABLE products            ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_collections ENABLE ROW LEVEL SECURITY;

-- Anon / authenticated users may read all categories
CREATE POLICY "categories_public_read"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anon / authenticated users may only see active collections
CREATE POLICY "collections_public_read"
  ON collections FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Anon / authenticated users may read all products
CREATE POLICY "products_public_read"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anon / authenticated users may read product_collection links
CREATE POLICY "product_collections_public_read"
  ON product_collections FOR SELECT
  TO anon, authenticated
  USING (true);
