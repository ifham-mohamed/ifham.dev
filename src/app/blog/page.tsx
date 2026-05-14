import BlurFade from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/ui/section-heading";
import { allPosts } from "../../../.content-collections/generated";
import { mediumPosts } from "@/data";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, life, and more.",
  openGraph: {
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Thoughts on software development, life, and more.",
  },
};

const BLUR_FADE_DELAY = 0.015;

export default function BlogPage() {
  const sortedPosts = [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <section id="blog" className="flex flex-col gap-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <SectionHeading
          eyebrow="WRITING"
          title="Blog"
          description="Thoughts on software development, life, and more."
          anchor="blog"
          as="h1"
        />
      </BlurFade>

      {sortedPosts.length > 0 ? (
        <div className="flex flex-col gap-3">
          {sortedPosts.map((post, id) => {
            const slug = post._meta.path.replace(/\.mdx$/, "");
            const indexNumber = id + 1;
            return (
              <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.015} key={slug}>
                <Link
                  className={cn(
                    "group block w-full border border-border rounded-xl bg-card/50 backdrop-blur-sm",
                    "p-3 md:p-4 transition-all duration-200",
                    "hover:border-foreground/20 hover:bg-card/80 hover:shadow-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                  href={`/blog/${slug}`}
                >
                  <div className="flex items-start gap-x-3 justify-between">
                    <div className="flex items-start gap-x-3 flex-1 min-w-0">
                      <span className="inline-flex items-center justify-center h-6 px-1.5 rounded-md border border-border bg-background text-[10px] font-mono font-semibold tabular-nums text-foreground/70 flex-none mt-0.5">
                        {String(indexNumber).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <p className="text-base font-medium leading-tight tracking-tight group-hover:text-foreground transition-colors">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground tabular-nums">
                          {post.publishedAt}
                        </p>
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="inline-flex size-7 items-center justify-center rounded-full bg-muted/60 border border-border/60 transition-all duration-200 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 flex-none"
                    >
                      <ArrowUpRight className="size-3.5 text-muted-foreground" />
                    </span>
                  </div>
                </Link>
              </BlurFade>
            );
          })}
        </div>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center gap-3 py-12 px-4 border border-border rounded-xl bg-card/50">
            <div className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-linear-to-br from-muted to-muted/50 ring-1 ring-border/40 shadow-sm">
              <BookOpen
                className="size-5 text-muted-foreground"
                aria-hidden
              />
            </div>
            <p className="text-sm font-medium text-foreground">
              No posts yet — check back soon.
            </p>
            <Link
              href="/projects"
              className={cn(
                "group/cta inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md",
                "border border-border bg-background text-xs text-foreground/80",
                "hover:text-foreground hover:bg-muted/60 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              Browse projects instead
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </BlurFade>
      )}

      {mediumPosts.length > 0 && (
        <div className="mt-10 flex flex-col gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <SectionHeading
              eyebrow="EXTERNAL"
              title="On Medium"
              description="Long-form articles I've published off-site."
            />
          </BlurFade>
          <div className="flex flex-col gap-3">
            {mediumPosts.map((post, idx) => (
              <BlurFade
                delay={BLUR_FADE_DELAY * 5 + idx * 0.015}
                key={post.url}
              >
                <Link
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group block w-full border border-border rounded-xl bg-card/50 backdrop-blur-sm",
                    "p-3 md:p-4 transition-all duration-200",
                    "hover:border-foreground/20 hover:bg-card/80 hover:shadow-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                >
                  <div className="flex items-start gap-x-3 justify-between">
                    <div className="flex items-start gap-x-3 flex-1 min-w-0">
                      <span className="inline-flex items-center justify-center h-6 px-1.5 rounded-md border border-border bg-background text-[10px] font-semibold uppercase tracking-wider text-foreground/70 flex-none mt-0.5">
                        Medium
                      </span>
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <p className="text-base font-medium leading-tight tracking-tight group-hover:text-foreground transition-colors">
                          {post.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                          <span className="tabular-nums">
                            {formatDate(post.publishedAt)}
                          </span>
                          {post.readingTime && (
                            <>
                              <span aria-hidden>·</span>
                              <span>{post.readingTime}</span>
                            </>
                          )}
                        </div>
                        {post.excerpt && (
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="inline-flex size-7 items-center justify-center rounded-full bg-muted/60 border border-border/60 transition-all duration-200 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 flex-none"
                    >
                      <ArrowUpRight className="size-3.5 text-muted-foreground" />
                    </span>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
