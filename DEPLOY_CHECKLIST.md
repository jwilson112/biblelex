# BibleLex Deployment Checklist

Use this checklist before launching BibleLex to production.

## 1. Data & Schema

- [ ] Supabase schema is complete:
  - Core tables: `books`, `verses`, `translations`, `verse_texts`
  - Original languages: `words`, `lexicon_entries`, `word_usage_stats`
  - Admin content: `devotionals`, `maps`, `kids_bibles`, `devotional_plans`, `devotional_plan_entries`, `settings`
- [ ] All migrations applied successfully in Supabase:
  - `0001_initial_schema.sql`
  - `0002_seed_functions.sql`
  - `0003_strongs_lexicon.sql` (if created)
  - `0004_admin_content.sql`
- [ ] STEPBible importer has run:
  - Hebrew lexicon (TBESH) imported.
  - Greek lexicon (TBESG) imported.
  - Hebrew OT words (TAHOT) imported.
  - Greek NT words (TAGNT) imported.
  - `refresh_word_usage_stats` function executed.
- [ ] At least one public-domain translation imported (KJV, WEB, ASV, etc.).
- [ ] `translations` table contains all the slugs you want live.

## 2. Admin UI

- [ ] Admin layout loads:
  - `/admin` renders dashboard using `AdminLayout`.
- [ ] Devotionals:
  - `/admin/content/devotionals` shows list.
  - `/admin/content/devotionals/new` lets you add a devotional.
- [ ] Settings:
  - `/admin/settings` has "Enable Kids Mode" option.
- [ ] At least 5–10 sample devotionals seeded (mix of general + kids).

## 3. Main App UX

- [ ] Home:
  - `/` shows BibleLex description and links to Search and Sample Verse.
- [ ] Kids mode:
  - Toggle visible in header.
  - When enabled, UI is simplified (larger fonts, bigger buttons).
- [ ] Search:
  - `/search` uses `search_verses` RPC and returns results.
- [ ] Verse reader:
  - `/verse/JHN.3.16` shows multiple translations side-by-side.
  - "View original languages & lexicon" link works.
- [ ] Lexicon:
  - `/lexicon?strongs=H7225` shows Hebrew entry for "beginning".
  - `/lexicon?strongs=G26` shows Greek entry for "love".
- [ ] Licenses & attribution:
  - `/licenses` shows STEPBible attribution and translation licenses.
  - `/about` explains BibleLex, data sources, and licensing.

## 4. Licensing & Legal

- [ ] `ATTRIBUTION.md` lists:
  - All public-domain translations you've imported.
  - STEPBible Data (CC BY 4.0) attribution.
- [ ] App displays:
  - Footer attribution ("Hebrew & Greek data from STEP Bible").
  - Modal or dedicated section explaining CC BY 4.0 requirements.
- [ ] Privacy policy:
  - Simple page or external link explaining data collection (basic analytics, no sensitive personal data).
- [ ] Terms of use:
  - Optional but recommended.

## 5. Deployment (Web)

- [ ] Vercel connected to `jwilson112/biblelex`.
- [ ] Environment variables set in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Build passes (`npm run build`).
- [ ] Live site:
  - URL works (e.g., `https://biblelex.vercel.app`).
  - All key pages load without errors (/, /search, /verse/JHN.3.16, /lexicon, /licenses, /about, /admin).
- [ ] Custom domain:
  - Domain purchased (e.g., `biblelex.app`).
  - DNS pointed to Vercel.
  - HTTPS active.

## 6. Content Launch

- [ ] Seed initial devotionals (e.g., 20–30 based on key passages).
- [ ] Seed initial maps (e.g., Top 5 Bible geography maps).
- [ ] Seed at least one kids Bible entry and kids devotional plan.
- [ ] Test admin editing workflow:
  - Add new devotional.
  - Edit one and verify changes on the public verse page.
  - Add a kid‑friendly map and verify it appears.

## 7. Post-Launch

- [ ] Monitor error logs (Vercel + Supabase).
- [ ] Gather user feedback.
- [ ] Plan next content updates (more devotionals, maps, kids stories).
