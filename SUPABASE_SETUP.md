# Supabase Setup Guide

## 1. Create a Supabase project

Go to https://supabase.com and create a free project. Once it's ready, grab your credentials from **Settings → API**:

- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `publishable` key → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Create your `.env.local` file

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_TOKEN=run-this-to-generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 3. Run the SQL schema

Open **Supabase Dashboard → SQL Editor**, paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql), and click **Run**.

This creates four tables with proper foreign-key relationships:

| Table | Description |
|---|---|
| `categories` | Bag types (Tote, Shoulder, Hobo, Mini, …) |
| `collections` | Curated editorial groupings ("Eid Edit", "New Arrivals", …) |
| `products` | All product listings. References `categories` via FK. |
| `product_collections` | Many-to-many: which products belong to which collection |

### Table relationships

```
categories ──< products (products.category_id → categories.id)
collections ──< product_collections >── products
```

### Key column notes

- `products.price` — stored in **PKR** (Pakistani Rupees)
- `products.category` — denormalized display name for fast reads; `category_id` is the FK
- `products.tags` — `TEXT[]` array; use for filtering (e.g. `["new", "sale", "limited"]`)
- `collections.is_active` — set to `false` to hide a collection from the storefront without deleting it
- `product_collections.sort_order` — controls the order products appear *within* a collection

## 4. Create the Storage bucket for images

1. Go to **Supabase Dashboard → Storage**
2. Click **New bucket**
3. Name it `product-images`
4. Enable **Public bucket** (so image URLs work without auth)
5. Click **Save**

## 5. Seed the database with your existing products

Start your dev server (`npm run dev`), go to `/admin/products`, and click **Seed from static data**. This imports all 16 products and their categories from the hardcoded data into Supabase.

Alternatively, call `POST /api/admin/seed` directly (requires the `admin_session` cookie).

## 6. You're done

Visit `/admin` and log in with the `ADMIN_PASSWORD` you set. You can now:

- **Add / edit / delete products** at `/admin/products`
- **Reorder products** by dragging rows
- **Upload product images** directly from the product form
- **Manage categories** at `/admin/categories`

## Using collections

Collections are curated groups of products — great for seasonal edits, promotions, or featured sets. To set one up:

1. Create a collection in Supabase SQL Editor or the future admin UI:
   ```sql
   INSERT INTO collections (slug, name, tagline, description, badge_text, cover_image)
   VALUES ('eid-edit-2026', 'Eid Edit 2026', 'Crafted for the occasion.', 'Our curated selection for Eid.', 'Limited', '');
   ```
2. Link products to it:
   ```sql
   INSERT INTO product_collections (product_id, collection_id, sort_order)
   SELECT 'hobo-brown', id, 0 FROM collections WHERE slug = 'eid-edit-2026';
   ```
3. Query a collection with its products:
   ```sql
   SELECT p.*
   FROM products p
   JOIN product_collections pc ON pc.product_id = p.id
   JOIN collections c ON c.id = pc.collection_id
   WHERE c.slug = 'eid-edit-2026'
   ORDER BY pc.sort_order;
   ```

## RLS (Row Level Security)

RLS is enabled on all tables. The admin API uses the `service_role` key which bypasses RLS. The public storefront uses the `anon` key, which can only read:

- All categories
- All products
- **Active** collections only (`is_active = true`)
- Product-collection links

Writes from the storefront are blocked — all mutations go through the admin API routes which use the service role key.
