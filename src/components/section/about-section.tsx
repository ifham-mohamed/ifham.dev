import Markdown from "react-markdown";
import { Divider, EditorialSection, SectionEyebrow } from "@/components/ui";
import { aboutParagraphs, focusAreas } from "@/data";

/**
 * AboutSection — editorial two-column.
 *
 * The old version dropped `personalInfo.summary` into a prose block, which
 * meant the section opened with the exact sentence already used as the hero's
 * description. It restated the headline instead of adding to it.
 *
 * The two-column layout now comes from `EditorialSection`, shared with the
 * Experience section, rather than being hand-built here.
 */
export default function AboutSection() {
  return (
    <EditorialSection
      id="about"
      index={1}
      eyebrow="Background"
      title="A few words about me"
    >
      {/* Anchor offset is handled by EditorialSection via ANCHOR_OFFSET. */}
      <div className="flex min-w-0 flex-col gap-6">
        {/* Emphasis is raised contrast and weight, not a badge: the marked
            phrases stay part of the sentence instead of interrupting it. Body
            sits at muted, emphasis at full foreground, so the step between
            metadata and copy is visible without colour. */}
        <div className="flex max-w-[68ch] flex-col gap-4">
          {aboutParagraphs.map((paragraph) => (
            <div
              key={paragraph.slice(0, 48)}
              className="text-base leading-[1.75] text-muted-foreground [&_p]:m-0 [&_strong]:font-medium [&_strong]:text-foreground"
            >
              <Markdown>{paragraph}</Markdown>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <Divider />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-0.5">
            <SectionEyebrow className="text-muted-foreground/70">
              Focus
            </SectionEyebrow>
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {focusAreas.map((area, i) => (
                <li key={area.label} className="flex items-center gap-3">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="h-3 w-px bg-hairline max-sm:hidden"
                    />
                  )}
                  <span
                    title={area.evidence}
                    className="text-xs text-foreground/80"
                  >
                    {area.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </EditorialSection>
  );
}
