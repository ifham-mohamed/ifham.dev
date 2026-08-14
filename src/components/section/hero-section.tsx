import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Icons } from "@/components/icons";
import {
  ActionLink,
  AvailabilityStatus,
  CopyValueButton,
  Divider,
  Metric,
  MetricGrid,
  SectionEyebrow,
} from "@/components/ui";
import {
  education,
  featuredSkills,
  metrics,
  personalInfo,
  socialLinks,
  workExperience,
} from "@/data";
import { cn } from "@/lib/utils";

/**
 * HeroSection — asymmetric editorial, not a centred landing page.
 *
 * Reading order answers a recruiter's first four questions in the order they
 * ask them: is he available → who is he → what kind of engineer → what has he
 * actually shipped. The name is the strongest element on the page but is
 * capped at 2.5rem, because a name that fills the viewport is a poster, not a
 * portfolio.
 *
 * The supporting column is metadata rather than artwork. Everything in it is
 * read from existing data files — nothing is authored here — so it cannot
 * drift out of sync with the sections below.
 */

/** One row of the supporting metadata column. */
function MetaField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 min-[30rem]:flex-col min-[30rem]:gap-0.5">
      <dt className="w-16 flex-none font-mono text-2xs uppercase tracking-[0.12em] text-subtle-foreground min-[30rem]:w-auto">
        {label}
      </dt>
      <dd className="min-w-0 text-xs text-foreground/80">{children}</dd>
    </div>
  );
}

export default function HeroSection() {
  const github = socialLinks.GitHub;
  const linkedin = socialLinks.LinkedIn;

  // Most recent role. Note this one has ended, so it is labelled "Recent"
  // rather than "Now" — the data says February–August 2025.
  const recentRole = workExperience[0];
  // The genuinely current commitment: `end` is "Present".
  const current = education.find((e) => e.end === "Present");
  const stack = featuredSkills.slice(0, 3).map((s) => s.name);
  const phoneHref = `tel:${personalInfo.phone.replace(/\s/g, "")}`;
  const githubHandle = github?.url.split("/").filter(Boolean).at(-1);
  const linkedinHandle = linkedin?.url.split("/").filter(Boolean).at(-1);

  const tertiary = [
    github && {
      name: "GitHub",
      value: githubHandle,
      url: github.url,
      icon: Icons.github,
    },
    linkedin && {
      name: "LinkedIn",
      value: linkedinHandle,
      url: linkedin.url,
      icon: Icons.linkedin,
    },
    {
      name: "Email",
      value: personalInfo.email,
      url: `mailto:${personalInfo.email}`,
      icon: Icons.email,
    },
    {
      name: "Phone",
      value: personalInfo.phone.replace(/\s/g, ""),
      url: phoneHref,
      icon: Phone,
    },
  ].filter(Boolean) as {
    name: string;
    value: string;
    url: string;
    icon: typeof Icons.github;
  }[];

  return (
    <section id="hero" className="flex flex-col gap-10">
      <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-10">
        {/* ---------------- Main column ---------------- */}
        <div className="flex min-w-0 flex-col gap-5">
          {/* Same component as the contact section's, so the page opens and
              closes on the same statement. The label is shortened here because
              the hero is scanned, not read; contact uses the full wording. */}
          <div data-hero-step>
            <AvailabilityStatus
              label="Available for work"
              location={personalInfo.location}
            />
          </div>

          <div data-hero-step style={{ animationDelay: "60ms" }}>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {personalInfo.name}
            </h1>
            <p className="mt-1 text-base text-muted-foreground">
              {personalInfo.title}
            </p>
          </div>

          <p
            data-hero-step
            style={{ animationDelay: "120ms" }}
            className="max-w-[52ch] text-base leading-relaxed text-muted-foreground"
          >
            {personalInfo.description}
          </p>

          {/* Three tiers, three visual weights: solid, outlined, bare. */}
          <div
            data-hero-step
            style={{ animationDelay: "180ms" }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <ActionLink
                href="/Ifham_Mohamed_SE.pdf"
                variant="primary"
                external
              >
                View résumé
              </ActionLink>
              <ActionLink href="/projects" external={false}>
                Selected work
              </ActionLink>
            </div>

            <ul className="grid max-w-[55rem] gap-x-5 gap-y-3 min-[36rem]:grid-cols-2 xl:grid-cols-4">
              {tertiary.map(({ name, value, url, icon: Icon }) => (
                <li key={name} className="min-w-0">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <Link
                      href={url}
                      target={url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={`${name}: ${value}`}
                      className={cn(
                        "group/tertiary grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-2",
                        "text-muted-foreground transition-colors hover:text-brand-hover"
                      )}
                    >
                      <Icon className="size-4 opacity-70 transition-opacity group-hover/tertiary:opacity-100" />
                      <span className="flex min-w-0 flex-col gap-0.5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-subtle-foreground">
                          {name}
                        </span>
                        <span className="truncate font-mono text-xs text-foreground/80 transition-colors group-hover/tertiary:text-brand-hover">
                          {value}
                        </span>
                      </span>
                    </Link>

                    {(name === "Email" || name === "Phone") && (
                      <CopyValueButton
                        value={value}
                        label={name.toLowerCase()}
                        className="size-7 border-transparent bg-transparent opacity-70 hover:opacity-100"
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------- Supporting column ---------------- */}
        <aside
          data-hero-step
          style={{ animationDelay: "240ms" }}
          aria-label="Profile summary"
          className={cn(
            "flex min-w-0 flex-col gap-4 sm:w-[13.5rem]",
            "rounded-lg border border-border bg-surface p-4",
          )}
        >
          <div className="flex items-center gap-3">
            <span className="relative size-11 flex-none overflow-hidden rounded-md border border-border-strong bg-surface-raised shadow-sm">
              <Image
                src={personalInfo.avatarUrl}
                alt={`Portrait of ${personalInfo.name}`}
                fill
                sizes="44px"
                className="scale-[1.72] object-cover object-[50%_12%]"
              />
            </span>
            <SectionEyebrow>Profile</SectionEyebrow>
          </div>

          <Divider />

          <dl className="flex flex-col gap-3">
            <MetaField label="Focus">Full-stack · SaaS · E-commerce</MetaField>
            {recentRole && (
              <MetaField label="Recent">{recentRole.company}</MetaField>
            )}
            {current && (
              <MetaField label="Studying">{current.school}</MetaField>
            )}
            <MetaField label="Stack">{stack.join(" · ")}</MetaField>
          </dl>
        </aside>
      </div>

      {/* ---------------- Evidence strip ---------------- */}
      <div
        data-hero-step
        style={{ animationDelay: "300ms" }}
        className="flex flex-col gap-3"
      >
        <SectionEyebrow>Production impact</SectionEyebrow>
        <MetricGrid>
          {metrics.map((metric) => (
            <Metric
              key={metric.label}
              value={metric.value}
              label={metric.label}
              context={metric.context}
              detail={metric.detail}
            />
          ))}
        </MetricGrid>
      </div>
    </section>
  );
}
