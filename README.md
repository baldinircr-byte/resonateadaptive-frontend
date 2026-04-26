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
