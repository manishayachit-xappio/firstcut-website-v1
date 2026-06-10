import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://firstcut.film",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
