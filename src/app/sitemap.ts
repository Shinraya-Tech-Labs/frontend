import type { MetadataRoute } from "next";
import { navigation, siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map(({ href }) => ({
    url: new URL(href, siteUrl).href,
    changeFrequency: "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
}
