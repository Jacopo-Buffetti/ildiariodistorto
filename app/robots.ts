import type { MetadataRoute } from "next";

const SITE_URL = "https://ildiariodistorto.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/area-riservata/",
        "/login",
        "/api/",
        // componenti nella cartella /pages che Next espone come pagine
        "/ChiSono/",
        "/Scritti/",
        "/AggiungiScritto/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
