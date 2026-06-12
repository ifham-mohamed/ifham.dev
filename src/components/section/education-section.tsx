"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { education } from "@/data";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

function SchoolLogo({ src, alt }: { src?: string; alt: string }) {
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

export default function EducationSection() {
  return (
    <div className="flex flex-col gap-3 w-full min-w-0">
      {education.map((edu) => {
        const isCurrent = edu.end === "Present";
        return (
          <div
            key={edu.id}
            className={cn(
              "w-full min-w-0 max-w-full overflow-hidden border border-border rounded-xl bg-card/50 backdrop-blur-sm",
              "transition-all duration-200",
              "hover:border-foreground/20 hover:bg-card/80 hover:shadow-sm"
            )}
          >
            <div className="p-3 md:p-4 flex flex-col gap-4">
              <div className="flex items-center gap-x-3 justify-between">
                <div className="flex items-center gap-x-3 flex-1 min-w-0">
                  <SchoolLogo src={edu.logoUrl} alt={edu.school} />
                  <div className="flex-1 min-w-0 gap-1 flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold leading-tight truncate">
                        {edu.school}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                          <span className="relative inline-flex size-1.5">
                            <span className="absolute inset-0 size-1.5 rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                            <span className="relative size-1.5 rounded-full bg-emerald-500" />
                          </span>
                          Current
                        </span>
                      )}
                    </div>
                    <div className="font-sans text-xs sm:text-sm text-muted-foreground truncate">
                      {edu.degree}
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-xs tabular-nums text-muted-foreground flex-none">
                  {edu.start} - {edu.end}
                </span>
              </div>

              <div className="flex flex-col gap-3 pl-13 md:pl-14">
                <span className="block sm:hidden text-xs tabular-nums text-muted-foreground/80">
                  {edu.start} - {edu.end}
                </span>

                {edu.cgpa && (
                  <div className="flex items-baseline gap-2 text-sm">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                      CGPA
                    </span>
                    <span className="tabular-nums text-foreground/85">
                      {edu.cgpa}
                    </span>
                  </div>
                )}

                {edu.courses && edu.courses.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
                      Coursework
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="inline-flex items-center h-6 px-2 rounded-md border border-border bg-background text-[11px] font-medium text-foreground/80"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.href && (
                  <div className="flex flex-wrap items-center gap-2 border-t border-border/60 mt-1 -mx-3 md:-mx-4 px-3 md:px-4 pt-3">
                    <Link
                      href={edu.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "btn-sheen group/cta inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md",
                        "bg-foreground text-background text-xs font-medium",
                        "shadow-sm hover:shadow-md transition-all duration-200",
                        "hover:gap-2",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      )}
                    >
                      Visit School
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                        aria-hidden
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
