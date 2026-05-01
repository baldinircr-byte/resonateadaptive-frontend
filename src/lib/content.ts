import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";

export type PageContent = {
  slug: string;
  title: string;
  sourceUrl: string;
  body: string;
};

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "content", "raw", "pages");
const ASSET_MANIFEST_PATH = path.join(ROOT, "content", "site", "assets.json");
const BASE_PATH = process.env.GITHUB_ACTIONS === "true" ? "/resonateadaptive-frontend" : "";

export type AssetManifest = {
  generatedAt: string;
  logo: string;
  logoLight?: string;
  logoDark?: string;
  markLight?: string;
  markDark?: string;
  pages: Record<string, { image: string }>;
};

function readMarkdown(file: string): PageContent {
  const raw = fs.readFileSync(path.join(RAW_DIR, file), "utf8");
  const parsed = matter(raw);
  const slug = path.basename(file, ".md");
  return {
    slug,
    title: typeof parsed.data.title === "string" ? parsed.data.title : slug,
    sourceUrl:
      typeof parsed.data.source_url === "string" ? parsed.data.source_url : "",
    body: parsed.content.trim(),
  };
}

export const getPages = cache(() =>
  fs
    .readdirSync(RAW_DIR)
    .filter((entry) => entry.endsWith(".md"))
    .map(readMarkdown),
);

export const getPageBySlug = cache((slug: string) =>
  getPages().find((page) => page.slug === slug) ?? null,
);

function withBasePath(assetPath: string) {
  if (!assetPath.startsWith("/")) return assetPath;
  return `${BASE_PATH}${assetPath}`;
}

export const getAssetManifest = cache(() => {
  const manifest = JSON.parse(fs.readFileSync(ASSET_MANIFEST_PATH, "utf8")) as AssetManifest;

  return {
    ...manifest,
    logo: withBasePath(manifest.logo),
    logoLight: manifest.logoLight ? withBasePath(manifest.logoLight) : undefined,
    logoDark: manifest.logoDark ? withBasePath(manifest.logoDark) : undefined,
    markLight: manifest.markLight ? withBasePath(manifest.markLight) : undefined,
    markDark: manifest.markDark ? withBasePath(manifest.markDark) : undefined,
    pages: Object.fromEntries(
      Object.entries(manifest.pages).map(([slug, value]) => [
        slug,
        { image: withBasePath(value.image) },
      ]),
    ),
  } satisfies AssetManifest;
});
