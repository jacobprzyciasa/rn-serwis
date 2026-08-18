import type { MetadataRoute } from "next";
import { REALIZATIONS, getCategorySlugs } from "@/data/realizations";
import { SITE_URL } from "@/utils/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/o-mnie`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/kontakt`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategorySlugs().map((category) => ({
    url: `${SITE_URL}/${category}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const realizationRoutes: MetadataRoute.Sitemap = REALIZATIONS.map((r) => ({
    url: `${SITE_URL}/${r.category}/${r.slug}`,
    lastModified: r.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...realizationRoutes];
}
