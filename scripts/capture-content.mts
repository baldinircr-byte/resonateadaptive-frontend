import fs from "node:fs";
import path from "node:path";

import TurndownService from "turndown";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "content", "raw", "pages");
const SITE_URL = "https://www.resonateadaptive.com";
const API_URL = `${SITE_URL}/wp-json/wp/v2/pages?per_page=50`;
const allowed = new Set(["our-story", "our-why", "waiting-list-confirmation", "our-why-2"]);

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

function cleanMarkdown(value: string) {
  return value
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\u00a0/g, " ")
    .trim();
}

async function main() {
  ensureDir(RAW_DIR);
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`Failed to fetch pages: ${response.status}`);

  const pages = (await response.json()) as WpPage[];

  for (const page of pages) {
    if (!allowed.has(page.slug)) continue;

    const slug = page.slug === "our-why-2" ? "index" : page.slug;
    const markdown = cleanMarkdown(turndown.turndown(page.content.rendered));
    const frontmatter = [
      "---",
      `title: ${JSON.stringify(page.title.rendered)}`,
      `source_url: ${JSON.stringify(page.link)}`,
      `slug: ${JSON.stringify(slug)}`,
      "---",
      "",
    ].join("\n");

    fs.writeFileSync(path.join(RAW_DIR, `${slug}.md`), `${frontmatter}${markdown}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
