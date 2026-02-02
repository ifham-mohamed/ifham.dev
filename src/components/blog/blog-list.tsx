"use client";

import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import BlurFade from "../magicui/blur-fade";

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
}

interface BlogListProps {
  posts: BlogPost[];
  delay?: number;
}

const BLUR_FADE_DELAY = 0.04;

export function BlogList({ posts, delay = BLUR_FADE_DELAY }: BlogListProps) {
  return (
    <section>
      <ul className="flex flex-col gap-4">
        {posts.map((post, index) => (
          <BlurFade key={post.slug} delay={delay + index * 0.05}>
            <li>
              <BlogCard
                slug={post.slug}
                title={post.title}
                summary={post.summary}
                date={post.date}
              />
            </li>
          </BlurFade>
        ))}
      </ul>
    </section>
  );
}

interface BlogCardProps {
  slug: string;
  title: string;
  summary: string;
  date: string;
}

export function BlogCard({ slug, title, summary, date }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block p-4 -mx-4 rounded-lg hover:bg-muted/50 transition-colors"
    >
      <article className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold text-lg tracking-tight">{title}</h2>
          <time className="text-sm text-muted-foreground shrink-0">
            {formatDate(date)}
          </time>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{summary}</p>
      </article>
    </Link>
  );
}

export default BlogList;
