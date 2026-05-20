"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { activities } from "@/data";
import { ArrowUpRight, GlobeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";

function ActivityLogo({ src, alt }: { src?: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        aria-hidden
        className="size-10 md:size-11 rounded-lg border border-border bg-linear-to-br from-muted to-muted/50 ring-1 ring-border/40 shadow-sm flex-none flex items-center justify-center"
      >
        <span className="text-sm font-semibold text-muted-foreground">
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={44}
      height={44}
      className="size-10 md:size-11 rounded-lg border border-border ring-1 ring-border/40 shadow-sm overflow-hidden object-contain flex-none bg-background p-1"
      onError={() => setImageError(true)}
    />
  );
}

export default function HackathonsSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6 w-full">
      <SectionHeading
        eyebrow="COMMUNITY"
        title="Activities & leadership"
        description="Highlights from community initiatives, volunteer work, and events I've participated in."
        anchor="activities"
      />

      <div className="flex flex-col gap-3 w-full min-w-0">
        {activities.map((activity) => {
          const dates =
            activity.start === activity.end
              ? activity.start
              : `${activity.start} - ${activity.end}`;
          const isOngoing =
            activity.end === "Present" ||
            activity.end === String(new Date().getFullYear());

          return (
            <div
              key={activity.id}
              className={cn(
                "w-full min-w-0 max-w-full overflow-hidden border border-border rounded-xl bg-card/50 backdrop-blur-sm",
                "transition-all duration-200",
                "hover:border-foreground/20 hover:bg-card/80 hover:shadow-sm"
              )}
            >
              <div className="p-3 md:p-4 flex flex-col gap-3">
                <div className="flex items-start gap-x-3 justify-between">
                  <div className="flex items-start gap-x-3 flex-1 min-w-0">
                    <ActivityLogo
                      src={activity.logoUrl}
                      alt={activity.title}
                    />
                    <div className="flex-1 min-w-0 gap-1 flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold leading-tight">
                          {activity.title}
                        </span>
                        {isOngoing && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                            <span className="relative inline-flex size-1.5">
                              <span className="absolute inset-0 size-1.5 rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                              <span className="relative size-1.5 rounded-full bg-emerald-500" />
                            </span>
                            Ongoing
                          </span>
                        )}
                      </div>
                      <div className="font-sans text-xs sm:text-sm text-muted-foreground">
                        {activity.organization}
                        <span className="text-muted-foreground/60"> · </span>
                        {activity.role}
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex text-xs tabular-nums text-muted-foreground flex-none">
                    {dates}
                  </span>
                </div>

                {(activity.description || activity.href) && (
                  <div className="flex flex-col gap-3 pl-13 md:pl-14">
                    <span className="block sm:hidden text-xs tabular-nums text-muted-foreground/80">
                      {dates}
                    </span>

                    {activity.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed wrap-break-word">
                        {activity.description}
                      </p>
                    )}

                    {activity.href && (
                      <div className="flex flex-wrap items-center gap-2 border-t border-border/60 mt-1 -mx-3 md:-mx-4 px-3 md:px-4 pt-3">
                        <Link
                          href={activity.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "group/cta inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md",
                            "border border-border bg-background text-xs font-medium text-foreground/80",
                            "hover:text-foreground hover:bg-muted/60 transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          )}
                        >
                          <GlobeIcon className="size-3.5" aria-hidden />
                          Website
                          <ArrowUpRight
                            className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                            aria-hidden
                          />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
