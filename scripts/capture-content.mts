import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";
import TurndownService from "turndown";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "content", "raw", "pages");
const SITE_URL = "https://www.resonateadaptive.com";
const SITEMAP_URL = `${SITE_URL}/page-sitemap.xml`;
const WORDPRESS_API_URL = `${SITE_URL}/wp-json/wp/v2/pages?per_page=50`;
const TARGET_SLUG_MAP: Record<string, string> = {
  "": "index",
  "our-story": "our-story",
  "our-why": "our-why",
  "waiting-list-confirmation": "waiting-list-confirmation",
};

const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });

type WpPage = {
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
};

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function normalizeWhitespace(value: string) {
  return value.replace(/\u00a0/g, " ").replace(/[ \t]+/g, " ").trim();
}

function collapseDuplicateLines(markdown: string) {
  const result: string[] = [];
  const seenWindow: string[] = [];

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    const normalized = normalizeWhitespace(line);

    if (!normalized) {
      if (result.at(-1) !== "") result.push("");
      continue;
    }

    const recent = seenWindow.slice(-6);
    const isExactRecentDuplicate = recent.includes(normalized);
    const isBoilerplate = [
      "Our Story",
      "Our Why",
      "Tell Us Your Story",
      "Home Page",
      "Instagram Youtube",
      "Receive updates",
      "Message",
      "Email",
      "Name",
    ].includes(normalized);

    if (isExactRecentDuplicate && isBoilerplate) {
      continue;
    }

    if (result.length > 0 && normalizeWhitespace(result[result.length - 1] ?? "") === normalized) {
      continue;
    }

    result.push(line);
    seenWindow.push(normalized);
  }

  return result.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function collapseDuplicateBlocks(markdown: string) {
  const blocked = new Set([
    "[Tell Us Your Story](#contact-us)",
    "[Tell Us Your Story](https://www.resonateadaptive.com/)",
    "[Home Page](https://www.resonateadaptive.com/)",
    "[Home page](https://www.resonateadaptive.com)",
    "[Our Story](https://www.resonateadaptive.com/our-story/)",
    "[Our Why](https://www.resonateadaptive.com/our-why/)",
  ]);

  const blocks = markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  const seen = new Set<string>();
  const result: string[] = [];

  for (const block of blocks) {
    const normalized = normalizeWhitespace(block.replace(/\n/g, " "));
    if (!normalized || blocked.has(block)) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(block);
  }

  return result.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

function cleanElementorHtml(html: string, sourceUrl: string) {
  const $ = load(html);

  $("header, footer, nav, script, style, noscript, iframe, svg").remove();
  $("form, input, textarea, select, button").remove();
  $(".elementor-widget-nav-menu, .elementor-location-footer, .elementor-widget-theme-site-logo").remove();
  $(".grecaptcha-badge").remove();

  $("a").each((_, element) => {
    const href = $(element).attr("href") ?? "";
    const text = normalizeWhitespace($(element).text());
    if (!href || href === sourceUrl || href === SITE_URL || href === `${SITE_URL}/`) {
      if (!text) $(element).remove();
    }
  });

  $("img").each((_, element) => {
    const src = $(element).attr("data-src") || $(element).attr("src") || "";
    if (src.startsWith("data:image/gif")) {
      $(element).remove();
      return;
    }
    if ($(element).attr("data-src")) {
      $(element).attr("src", $(element).attr("data-src"));
    }
    $(element).removeAttr("srcset");
    $(element).removeAttr("sizes");
    $(element).removeAttr("loading");
    $(element).removeAttr("decoding");
    $(element).removeAttr("class");
  });

  const root = $("main, .elementor").first();
  if (root.length) {
    return $.html(root);
  }

  return $.root().html() ?? "";
}

async function fetchSitemapUrls() {
  const xml = await (await fetch(SITEMAP_URL)).text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => match[1])
    .filter((url) => url.startsWith(SITE_URL));
}

async function fetchPages() {
  const response = await fetch(WORDPRESS_API_URL);
  if (!response.ok) throw new Error(`Failed to fetch pages: ${response.status}`);
  return (await response.json()) as WpPage[];
}

function slugFromUrl(url: string) {
  const pathname = new URL(url).pathname.replace(/^\//, "").replace(/\/$/, "");
  return pathname;
}

async function main() {
  ensureDir(RAW_DIR);

  const [sitemapUrls, pages] = await Promise.all([fetchSitemapUrls(), fetchPages()]);
  const pagesBySlug = new Map(pages.map((page) => [page.slug, page]));

  for (const url of sitemapUrls) {
    const sitemapSlug = slugFromUrl(url);
    if (!(sitemapSlug in TARGET_SLUG_MAP)) continue;

    const outputSlug = TARGET_SLUG_MAP[sitemapSlug];
    const page = sitemapSlug ? pagesBySlug.get(sitemapSlug) : pages.find((entry) => entry.link === `${SITE_URL}/` || entry.slug === "our-why-2");

    if (!page) continue;

    const cleanedHtml = cleanElementorHtml(page.content.rendered, page.link);
    const markdown = collapseDuplicateBlocks(
      collapseDuplicateLines(turndown.turndown(cleanedHtml)),
    );

    const frontmatter = [
      "---",
      `title: ${JSON.stringify(page.title.rendered)}`,
      `source_url: ${JSON.stringify(page.link)}`,
      `slug: ${JSON.stringify(outputSlug)}`,
      `captured_at: ${JSON.stringify(new Date().toISOString())}`,
      "---",
      "",
    ].join("\n");

    fs.writeFileSync(path.join(RAW_DIR, `${outputSlug}.md`), `${frontmatter}${markdown}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
