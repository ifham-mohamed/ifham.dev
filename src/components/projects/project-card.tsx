"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface ProjectLink {
  icon: React.ReactNode;
  type: string;
  href: string;
}

interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly ProjectLink[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "group relative flex flex-col overflow-hidden border border-border bg-card",
        "transition-all duration-300 ease-out h-full",
        "hover:border-foreground/20 hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      <Link
        href={href || "#"}
        className={cn("relative block cursor-pointer overflow-hidden", {
          "pointer-events-none": !href,
        })}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {image && !video && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {!image && !video && (
          <div className="h-40 w-full bg-linear-to-br from-muted to-muted/40 flex items-center justify-center">
            <span className="text-3xl font-semibold text-muted-foreground/40">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div
          aria-hidden
          className="absolute top-2 right-2 inline-flex size-7 items-center justify-center rounded-full bg-background/90 backdrop-blur border border-border opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200"
        >
          <ArrowUpRight className="size-3.5 text-foreground" />
        </div>
      </Link>
      <CardHeader className="px-3 pt-3">
        <div className="space-y-1">
          <CardTitle className="text-base leading-tight group-hover:text-foreground transition-colors">
            {title}
          </CardTitle>
          <time className="font-sans text-xs text-muted-foreground tabular-nums">
            {dates}
          </time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert pt-1">
            <Markdown>{description}</Markdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-3">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center h-5 px-1.5 rounded border border-border/70 bg-background text-[10px] font-medium text-foreground/75"
              >
                {tag}
              </span>
            ))}
            {tags.length > 6 && (
              <span className="inline-flex items-center h-5 px-1.5 rounded text-[10px] text-muted-foreground">
                +{tags.length - 6}
              </span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-3 pb-3 pt-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge
                  key={idx}
                  className="flex gap-1.5 px-2 py-0.5 text-[10px] bg-background text-foreground border border-border hover:bg-muted/60 transition-colors"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
