import {
  LogoTile,
  MetaItem,
  MetadataRow,
  SectionEyebrow,
  StatusBadge,
} from "@/components/ui";
import { education } from "@/data";
import { ArrowUpRight } from "lucide-react";

/**
 * EducationSection — supporting evidence, sized accordingly.
 *
 * Coursework used to render as `Tag` pills, which made "Mobile Application
 * Development" look exactly like "PostgreSQL" in the skills section. Now that
 * skills are set as plain text, pills here would have made coursework the
 * single most prominent list on the page — subjects sat through outranking
 * technologies actually shipped with.
 *
 * So coursework is an inline run of muted text: present for anyone who wants
 * it, invisible to anyone scanning. The whole section is one row, deliberately
 * lighter than Work or Selected work.
 */

/** "https://uom.lk" -> "uom.lk". Falls back to the raw string if unparseable. */
function displayHost(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

export default function EducationSection() {
  return (
    <div className="flex flex-col gap-2">
      {education.map((edu) => (
        <div
          key={edu.id}
          className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4 sm:p-5"
        >
          <div className="flex items-start gap-3">
            {/* 36px rather than the 40px used by Work and Projects — the size
                difference is small but it reads as subordinate. */}
            <LogoTile src={edu.logoUrl} alt={edu.school} className="size-9" />

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="text-sm font-medium text-foreground">
                  {edu.school}
                </h3>
                {edu.end === "Present" && <StatusBadge label="Current" />}
              </div>

              <p className="text-sm text-muted-foreground">{edu.degree}</p>

              <MetadataRow>
                <time>{`${edu.start} — ${edu.end}`}</time>
                {/* CGPA is a public claim by choice. Delete `cgpa` in
                    education.data.ts and this disappears everywhere. */}
                {edu.cgpa && <MetaItem>CGPA {edu.cgpa}</MetaItem>}
              </MetadataRow>
            </div>

            {edu.href && (
              <a
                href={edu.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/site inline-flex flex-none items-center gap-1 font-mono text-2xs text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                <span className="hidden sm:inline">
                  {displayHost(edu.href)}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-200 group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5"
                />
                <span className="sr-only">
                  Visit {edu.school} (opens in a new tab)
                </span>
              </a>
            )}
          </div>

          {edu.courses && edu.courses.length > 0 && (
            // Indented to the text column, not the card edge, so it reads as a
            // footnote to the degree rather than as a second field.
            <div className="flex flex-col gap-1.5 sm:pl-12">
              <SectionEyebrow className="text-muted-foreground/55">
                Selected coursework
              </SectionEyebrow>
              <p className="text-xs leading-relaxed text-muted-foreground/80">
                {edu.courses.join(" · ")}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
