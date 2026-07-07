import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { basePath } from "@/lib/base-path";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // Includes the basePath in multi-zone mode — the page's real URL.
      url: `${siteUrl}${basePath}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
