# SEO TODO — Kapadia High School

Baseline audit: 2026-11-13. 19 indexable URLs, all 200, self-canonical, one H1 each.

## Phase 1 — metadata and crawl hygiene (code) — DONE

- [x] `pageMetadata()` now uses each page's own title/description for OG + Twitter
- [x] Titles and descriptions rewritten for all 19 pages (location + board where real)
- [x] Sitemap: `lastModified`, priority by page type
- [x] robots.txt: `/api/` and `/metrics/` disallowed as well as `/admin/`, `/health/`
- [x] Campus schema: `telephone` + `openingHoursSpecification`
- [ ] Deploy and re-check the live domain (titles, descriptions, OG, sitemap)
- [ ] nginx: 301 `www.` → apex (server step, command in the deploy notes)

## Phase 2 — campus content — DONE for what facts allow

- [x] Campus page template: "About the <campus>" block + 5-question FAQ
- [x] `FAQPage` structured data on all five campus pages
- [x] Campus pages now 354–379 words (were 169–182)
- [ ] Deeper local copy (landmarks, transport routes, founding year per campus,
      student numbers) — needs facts from the school, cannot be invented
- [x] Campus disclosure documents registered (16 CBSE PDFs on Chhatral) —
      campus pages and `/disclosures/` now list them

## Phase 3 — images and speed — DONE except content

- [x] Gallery thumbnail: 640 px JPEG generated from the first photo, used by the
      gallery grid (full image still opens in the lightbox)
- [x] `manage.py backfill_gallery_thumbs` for existing galleries (run once after deploy)
- [x] Re-encode threshold 400 KB, logo asset reduced 1 MB → 48 KB
- [ ] Real 1920×800 campus hero photos (school supplies these; uploads now require ≥1200×600)

## Phase 4 — measurement — code ready, accounts are yours

- [x] `GOOGLE_SITE_VERIFICATION` env emits the Search Console meta tag
- [ ] Add that token to `.env` and verify the domain in Search Console
- [ ] Submit `https://kapadiahighschool.com/sitemap.xml`
- [ ] Google Business Profile for each campus, same NAP as the site
- [ ] Record current Search Console CTR before the new titles age in

## Known limits

- Two pages share intent (`/our-team/` leadership, `/team/` faculty). Kept separate
  because both have real content; titles now differ clearly.
- No blog or news section, so there is no fresh-content signal. Adding one is a
  product decision, not a technical fix.
