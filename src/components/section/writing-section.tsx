import Link from "next/link";
import { SectionHeading } from "@/components/ui";
import { getRecentMediumPosts, mediumPosts } from "@/data";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export default function WritingSection() {
  const posts = getRecentMediumPosts(3);

  return (
    <div className="flex w-full flex-col gap-6">
      <SectionHeading
        eyebrow="Writing"
        title="Latest articles"
        anchor="writing"
        count={mediumPosts.length}
        action={{ label: "All posts", href: "/blog" }}
      />

      {/* A list, not a stack of cards. Each post is one line of text plus a
          date — wrapping that in a bordered panel was more chrome than
          content. */}
      <ul className="flex flex-col divide-y divide-hairline border-y border-hairline">
        {posts.map((post) => (
          <li key={post.url}>
            <Link
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 py-3 transition-colors"
            >
              <span className="min-w-0 text-sm text-foreground/85 transition-colors group-hover:text-foreground">
                {post.title}
                <ArrowUpRight
                  aria-hidden
                  className="ml-1 inline size-3 -translate-y-px opacity-0 transition-opacity group-hover:opacity-60"
                />
              </span>
              <time
                dateTime={post.publishedAt}
                className="flex-none text-2xs tabular-nums text-muted-foreground"
              >
                {formatDate(post.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
