# Resonate Adaptive frontend agent guide

## Working rules

1. Do not commit directly to `main` for feature work.
   - Use a branch.
   - Open a PR.

2. Validate before proposing merge.
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm build`

3. Treat live-site capture as source material.
   - Keep captured pages in `content/raw/pages`.
   - Prefer updating normalization/rendering code before editing captured files by hand.

4. Keep the site static and Vercel-friendly unless a backend is explicitly needed.

5. Do not commit generated junk.
   - `.next/`
   - `test-results/`
   - `.DS_Store`
   - `*.tsbuildinfo`

6. Prefer small reviewable changes.

## Default workflow

1. Capture or refresh live-site content.
2. Refresh localized assets.
3. Make the smallest correct UI/content-model change.
4. Run validation.
5. Commit, push, and open a PR.
