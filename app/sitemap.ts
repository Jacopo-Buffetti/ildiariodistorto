import type { MetadataRoute } from "next";

import { getTales } from "@/api/controllers/tales-db";

const SITE_URL = "https://ildiariodistorto.vercel.app";

// La sitemap viene rigenerata al massimo ogni ora,
// così i nuovi scritti compaiono senza rifare il deploy.
export const revalidate = 3600;

type SitemapTale = {
  _id?: { toString(): string } | string;
  id?: string;
  published?: boolean;
  updatedAt?: Date | string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/i-miei-scritti`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const response = await getTales({ limit: 1000 });
  if ("error" in response) {
    return staticPages;
  }

  const talePages: MetadataRoute.Sitemap = (response.data as unknown as SitemapTale[])
    .filter((tale) => tale.published === true)
    .map((tale) => {
      const id = tale.id ?? tale._id?.toString() ?? "";
      return {
        url: `${SITE_URL}/scritto/${id}`,
        lastModified: tale.updatedAt ? new Date(tale.updatedAt) : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    })
    .filter((page) => !page.url.endsWith("/scritto/"));

  return [...staticPages, ...talePages];
}
