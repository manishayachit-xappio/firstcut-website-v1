import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://firstcut.film/sitemap.xml",
    host: "https://firstcut.film",
  };
}
