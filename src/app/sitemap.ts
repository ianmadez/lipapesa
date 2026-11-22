import type { MetadataRoute } from "next";
import { SITE_URL, PUBLIC_ROUTES } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r === "/" ? "/" : r}`,
    changeFrequency: "weekly",
    priority: r === "/" ? 1 : 0.6,
  }));
}
