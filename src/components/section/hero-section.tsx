import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActionLink } from "@/components/ui/action-link";
import { Icons } from "@/components/icons";
import { metrics, personalInfo, socialLinks } from "@/data";
import { FileText, Mail, MapPin } from "lucide-react";

/**
 * HeroSection — proof-first.
 *
 * The old hero led with "Hi, I'm Ifham 👋" plus a waving-hand animation and an
 * amber underline, then buried the numbers that actually qualify him inside a
 * markdown paragraph three sections down. This leads with the role, states the
 * numbers immediately, and gives a single obvious next action (the résumé).
 *
 * Layout is two-column above the fold on sm+ (identity | avatar) and collapses
 * to one column on mobile. The metric strip below spans the full width.
 */
export default function HeroSection() {
  const github = socialLinks.GitHub;

  return (
    <section id="hero" className="flex flex-col gap-8">
      <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-2xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
              />
              Available for work
            </span>
            <span aria-hidden className="h-3 w-px bg-border" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden className="size-3" />
              {personalInfo.location}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {personalInfo.name}
            </h1>
            <p className="text-base text-muted-foreground">
              {personalInfo.title}
            </p>
          </div>
        </div>

        <Avatar className="size-16 flex-none border border-border sm:size-20">
          {/* Only mount the image when there is a real path. An empty src makes
              the browser re-request the current page as an image. */}
          {personalInfo.avatarUrl && (
            <AvatarImage alt={personalInfo.name} src={personalInfo.avatarUrl} />
          )}
          <AvatarFallback className="bg-muted text-lg font-medium tracking-tight text-muted-foreground">
            {personalInfo.initials}
          </AvatarFallback>
        </Avatar>
      </div>

      <p className="max-w-[58ch] text-base text-muted-foreground">
        {personalInfo.description}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <ActionLink
          href="/Ifham_Mohamed_SE.pdf"
          variant="primary"
          external
          icon={<FileText aria-hidden className="size-3.5" />}
        >
          Résumé
        </ActionLink>
        <ActionLink
          href={`mailto:${personalInfo.email}`}
          icon={<Mail aria-hidden className="size-3.5" />}
        >
          Email
        </ActionLink>
        {github && (
          <ActionLink
            href={github.url}
            icon={<Icons.github aria-hidden className="size-3.5" />}
          >
            GitHub
          </ActionLink>
        )}
      </div>

      <dl className="grid grid-cols-3 divide-x divide-hairline overflow-hidden rounded-lg border border-border bg-surface">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            title={metric.detail}
            className="flex flex-col gap-1 px-3 py-3.5 sm:px-4"
          >
            <dt className="sr-only">{metric.detail}</dt>
            <dd className="flex flex-col gap-1">
              <span className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
                {metric.value}
              </span>
              <span className="text-2xs text-muted-foreground">
                {metric.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
