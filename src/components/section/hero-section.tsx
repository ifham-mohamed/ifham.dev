import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ActionLink,
  MetaItem,
  MetadataRow,
  Metric,
  MetricGrid,
  StatusBadge,
} from "@/components/ui";
import { Icons } from "@/components/icons";
import { metrics, personalInfo, socialLinks } from "@/data";
import { FileText, Mail, MapPin } from "lucide-react";

/**
 * HeroSection — proof-first.
 *
 * The old hero led with "Hi, I'm Ifham 👋", a waving-hand animation and an
 * amber underline, then buried the numbers that actually qualify him inside a
 * markdown paragraph three sections down. This states the role, then the
 * evidence, then gives one obvious next action.
 *
 * Reading order for someone scanning: status → name → role → what he builds →
 * résumé → the three numbers. That covers "who", "what kind of engineer",
 * "what impact" and "how to contact" above the fold.
 */
export default function HeroSection() {
  const github = socialLinks.GitHub;

  return (
    <section id="hero" className="flex flex-col gap-8">
      <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex min-w-0 flex-col gap-3">
          <MetadataRow>
            <StatusBadge label="Available for work" />
            <MetaItem icon={<MapPin aria-hidden className="size-3" />}>
              {personalInfo.location}
            </MetaItem>
          </MetadataRow>

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
          <AvatarFallback className="bg-muted font-mono text-lg font-medium tracking-tight text-muted-foreground">
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

      <MetricGrid>
        {metrics.map((metric) => (
          <Metric
            key={metric.label}
            value={metric.value}
            label={metric.label}
            detail={metric.detail}
          />
        ))}
      </MetricGrid>
    </section>
  );
}
