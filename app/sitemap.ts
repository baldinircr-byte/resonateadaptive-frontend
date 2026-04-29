import type { MetadataRoute } from "next";

import { getPages } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return getPages().map((page: { slug: string }) => ({
    url: page.slug === "index" ? site.domain : `${site.domain}/${page.slug}`,
    lastModified: new Date(),
  }));
}
