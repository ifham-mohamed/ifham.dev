import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { getRecentMediumPosts } from "@/data";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WritingSection() {
  const posts = getRecentMediumPosts(2);

  return (
    <div className="flex min-h-0 flex-col gap-y-6 w-full">
      <SectionHeading
        eyebrow="WRITING"
        title="Latest writing"
        description="Recent articles I've published — full list lives on the blog."
        anchor="writing"
      />

      <div className="grid gap-3">
        {posts.map((post) => (
          <Link
            key={post.url}
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
                  <p className="text-sm md:text-base font-medium leading-tight tracking-tight group-hover:text-foreground transition-colors">
                    {post.title}
                  </p>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {formatDate(post.publishedAt)}
                  </span>
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
        ))}
      </div>

      <Link
        href="/blog"
        className={cn(
          "group/cta inline-flex items-center gap-1.5 self-start h-8 px-3.5 rounded-md",
          "border border-border bg-background text-xs text-foreground/80",
          "hover:text-foreground hover:bg-muted/60 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        View all writing
        <ArrowUpRight
          className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
          aria-hidden
        />
      </Link>
    </div>
  );
}
