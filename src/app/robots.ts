import type { MetadataRoute } from "next";
import { personalInfo } from "@/data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${personalInfo.url}/sitemap.xml`,
    host: personalInfo.url,
  };
}
