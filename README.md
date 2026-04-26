# Resonate Adaptive frontend

Static Next.js rebuild of the current Resonate Adaptive public website.

## Goals

- capture current live-site content into local source files
- localize key assets for deployment independence
- keep the site simple and Vercel-friendly
- avoid WordPress lock-in for future iterations

## Content model

- `content/raw/pages` — captured page content from the current live site
- `content/site/assets.json` — localized asset manifest
- `scripts/capture-content.mts` — pulls core pages from the WordPress JSON API and converts them to markdown
- `scripts/fetch-assets.mts` — downloads the logo and page hero images locally

## Commands

```bash
pnpm install
pnpm capture:content
pnpm fetch:assets
pnpm dev
pnpm check
```

## Current page scope

- `/`
- `/our-story`
- `/our-why`
- `/waiting-list-confirmation`

## Notes

This is intentionally a smaller rebuild than the Strathcona frontend because the source site is structurally much smaller.

## Migration approach

This repo should follow the same core migration pattern used for Strathcona, adapted to a smaller WordPress source:

1. **Sitemap defines public scope**
   - Capture only the real public page set from the live sitemap.

2. **Raw capture stays local**
   - Store cleaned source capture under `content/raw/pages`.
   - Treat those files as source material, not hand-authored marketing copy.

3. **Assets are localized**
   - Download page/brand assets into `public/`.
   - Track them in `content/site/assets.json`.

4. **Normalization happens in code**
   - Rendering logic should clean and shape source content without depending on the live CMS.

5. **Static frontend first**
   - Keep the site Vercel-friendly and static unless a more complex backend is actually needed.
