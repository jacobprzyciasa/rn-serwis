import type { MetadataRoute } from "next";
import { getAllRealizations, getCategorySlugs } from "@/data/realizations";
import { SITE_URL } from "@/utils/constants";

// Sitemap traffic is low (search engine crawlers only) and one Contentful
// call is cheap — render fresh on every request instead of relying on ISR,
// so it can never lag behind Contentful the way a timed/on-demand-revalidate
// cache can when nothing happens to hit this exact route in between.
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/o-mnie`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/kontakt`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/galeria`, changeFrequency: "weekly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategorySlugs().map((category) => ({
    url: `${SITE_URL}/${category}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const realizations = await getAllRealizations();
  const realizationRoutes: MetadataRoute.Sitemap = realizations.map((r) => ({
    url: `${SITE_URL}/${r.category}/${r.slug}`,
    lastModified: r.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...realizationRoutes];
}
