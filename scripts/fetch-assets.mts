import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE_URL = "https://www.resonateadaptive.com";
const RAW_DIR = path.join(ROOT, "content", "raw", "pages");
const SITE_DIR = path.join(ROOT, "public", "images", "site");
const PAGES_DIR = path.join(ROOT, "public", "images", "pages");
const MANIFEST_PATH = path.join(ROOT, "content", "site", "assets.json");

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function absoluteUrl(value: string) {
  return new URL(value, SITE_URL).toString();
}

async function download(url: string, outputPath: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, buffer);
}

function firstMatch(value: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

async function main() {
  ensureDir(SITE_DIR);
  ensureDir(PAGES_DIR);
  ensureDir(path.dirname(MANIFEST_PATH));

  const homeHtml = await (await fetch(`${SITE_URL}/`)).text();
  const logoUrl = firstMatch(homeHtml, [
    /data-src="([^"]*Resonate-Site-Icon[^"]+)"/i,
    /src="([^"]*Resonate-Site-Icon[^"]+)"/i,
  ]);

  const manifest: Record<string, unknown> = {
    generatedAt: new Date().toISOString(),
    logo: "/images/site/logo.png",
    pages: {},
  };

  if (logoUrl) {
    await download(absoluteUrl(logoUrl), path.join(SITE_DIR, "logo.png"));
  }

  for (const file of fs.readdirSync(RAW_DIR).filter((entry) => entry.endsWith('.md'))) {
    const raw = fs.readFileSync(path.join(RAW_DIR, file), 'utf8');
    const sourceUrl = firstMatch(raw, [/source_url:\s*"([^"]+)"/, /source_url:\s*([^\n]+)/]);
    if (!sourceUrl) continue;
    const html = await (await fetch(sourceUrl.trim())).text();
    const imageUrl = firstMatch(html, [
      /<meta property="og:image" content="([^"]+)"/i,
      /data-src="([^"]+\.(?:png|jpe?g|webp))"/i,
      /src="([^"]+\.(?:png|jpe?g|webp))"/i,
    ]);
    if (!imageUrl) continue;
    const ext = path.extname(new URL(imageUrl).pathname) || '.png';
    const slug = path.basename(file, '.md');
    const out = path.join(PAGES_DIR, `${slug}${ext}`);
    await download(absoluteUrl(imageUrl), out);
    (manifest.pages as Record<string, { image: string }>)[slug] = {
      image: `/images/pages/${slug}${ext}`,
    };
  }

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
