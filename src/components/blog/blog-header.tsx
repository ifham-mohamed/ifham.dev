"use client";

import { formatDate } from "@/lib/format-date";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlurFade from "../magicui/blur-fade";

interface BlogHeaderProps {
  title: string;
  date: string;
  readingTime?: string;
}

const BLUR_FADE_DELAY = 0.04;

export function BlogHeader({ title, date, readingTime }: BlogHeaderProps) {
  return (
    <header className="space-y-4 mb-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          {title}
        </h1>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time>{formatDate(date)}</time>
          {readingTime && (
            <>
              <span>•</span>
              <span>{readingTime}</span>
            </>
          )}
        </div>
      </BlurFade>
    </header>
  );
}

export default BlogHeader;
