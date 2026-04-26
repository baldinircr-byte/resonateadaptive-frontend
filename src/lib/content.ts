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

export type AssetManifest = {
  generatedAt: string;
  logo: string;
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

export const getAssetManifest = cache(() =>
  JSON.parse(fs.readFileSync(ASSET_MANIFEST_PATH, "utf8")) as AssetManifest,
);
