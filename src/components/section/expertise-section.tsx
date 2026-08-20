import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { expertisePages } from "@/data/expertise.data";
import { Section } from "@/components/ui";

export default function ExpertiseSection() {
  return (
    <Section
      id="expertise"
      eyebrow="Expertise"
      index={6}
      title="Engineering capabilities"
      description="Focused guides to the systems I build, each connected to real projects and technical writing."
    >
      <ul className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
        {expertisePages.map((page) => (
          <li key={page.slug} className="bg-surface">
            <Link
              href={`/${page.slug}`}
              className="group flex h-full flex-col gap-2 p-4 transition-colors hover:bg-surface-hover sm:p-5"
            >
              <h3 className="text-base font-medium text-foreground">
                {page.label}
              </h3>
              <p className="line-clamp-3 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">
                {page.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-foreground/80 transition-colors group-hover:text-brand-hover">
                Evidence and approach
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
