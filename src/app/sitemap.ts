import type { MetadataRoute } from "next";
import { allPosts, allResearch } from "../../.content-collections/generated";
import { expertisePages } from "@/data/expertise.data";
import { personalInfo, projects } from "@/data";
import { slugOfPost } from "@/lib/writing";

export const dynamic = "force-static";

/** Canonical, indexable URLs only. Dates are emitted only when source data is exact. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: personalInfo.url },
    { url: `${personalInfo.url}/projects` },
    { url: `${personalInfo.url}/research` },
    { url: `${personalInfo.url}/blog` },
  ];

  const expertise: MetadataRoute.Sitemap = expertisePages.map((page) => ({
    url: `${personalInfo.url}/${page.slug}`,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${personalInfo.url}/projects/${project.id}`,
  }));

  const posts: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${personalInfo.url}/blog/${slugOfPost(post)}`,
    lastModified: post.updatedAt ?? post.publishedAt,
  }));

  const research: MetadataRoute.Sitemap = allResearch.map((document) => ({
    url: `${personalInfo.url}/research/${document.researchId}`,
    lastModified: document.updatedAt ?? document.publishedAt,
  }));

  return [...staticPages, ...expertise, ...projectPages, ...posts, ...research];
}
