import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { basePath } from "@/lib/base-path";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    // In multi-zone mode this file serves under the basePath; the sitemap does
    // too, so the reference must include it. (The shell app owns /robots.txt.)
    sitemap: `${siteUrl}${basePath}/sitemap.xml`,
  };
}
