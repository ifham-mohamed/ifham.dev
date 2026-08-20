import type { Metadata } from "next";
import Link from "next/link";
import { AnalyticsPreferencesButton } from "@/components/analytics/analytics-preferences-button";
import { JsonLd } from "@/components/seo/json-ld";
import { PageContainer, SectionEyebrow } from "@/components/ui";
import { analyticsConfig } from "@/config/analytics.config";
import { personalInfo } from "@/data";
import { breadcrumbJsonLd, personId } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy & Analytics",
  description:
    "How ifham.dev handles essential browser storage, hosting data, and optional Google Analytics consent.",
  alternates: { canonical: `${personalInfo.url}/privacy` },
  openGraph: {
    title: "Privacy & Analytics",
    description:
      "Privacy and analytics choices for visitors to ifham.dev.",
    url: `${personalInfo.url}/privacy`,
    type: "website",
    images: [
      {
        url: `${personalInfo.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Privacy and analytics choices on ifham.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy & Analytics",
    description: "Privacy and analytics choices for visitors to ifham.dev.",
    images: [`${personalInfo.url}/opengraph-image`],
  },
};

const externalLinkClass =
  "font-medium text-brand underline underline-offset-4 hover:text-brand-hover";

export default function PrivacyPage() {
  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${personalInfo.url}/privacy#webpage`,
        url: `${personalInfo.url}/privacy`,
        name: "Privacy & Analytics",
        description:
          "How ifham.dev handles essential browser storage, hosting data, and optional analytics consent.",
        author: { "@id": personId },
        dateModified: "2026-08-20",
      },
      breadcrumbJsonLd([
        { name: "Home", url: personalInfo.url },
        { name: "Privacy & Analytics", url: `${personalInfo.url}/privacy` },
      ]),
    ],
  };

  return (
    <PageContainer width="prose">
      <JsonLd data={privacyJsonLd} />
      <article className="flex flex-col gap-10 pb-8 pt-10 sm:gap-12 sm:pb-12 sm:pt-14 lg:pt-20">
        <header className="flex flex-col gap-4 border-b border-hairline pb-8">
          <SectionEyebrow>Site information</SectionEyebrow>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Privacy &amp; analytics
          </h1>
          <p className="max-w-[64ch] text-base leading-relaxed text-muted-foreground">
            This personal portfolio uses only essential browser storage by
            default. Google Analytics is optional and does not load or send a
            request until you explicitly allow analytics.
          </p>
          <p className="font-mono text-2xs text-subtle-foreground">
            Last updated: 20 August 2026
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            Your analytics choice
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            You can allow or decline optional analytics and change that choice
            at any time. Declining disables future Analytics collection in this
            browser and removes Google Analytics cookies created for this site.
          </p>
          <AnalyticsPreferencesButton />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-foreground">
            Before you consent
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The Google Analytics tag is blocked completely. The site may store
            only functional preferences in your browser, including your colour
            theme and the analytics choice saved under{" "}
            <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs text-foreground">
              {analyticsConfig.consentStorageKey}
            </code>
            . These preferences are not sent to Google Analytics.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-foreground">
            If you allow Google Analytics
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This site loads Google Analytics 4 using measurement ID{" "}
            <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs text-foreground">
              {analyticsConfig.measurementId}
            </code>
            . The default implementation can collect page views, session and
            engagement information, approximate location, and browser or device
            information. Google Analytics may set first-party cookies such as{" "}
            <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-xs text-foreground">
              _ga
            </code>
            .
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The implementation disables Google Signals, advertising
            personalisation signals, advertising storage, advertising user
            data, and advertising personalisation. Analytics is used only to
            understand aggregate site usage and improve the content and user
            experience. No contact-form or account data is sent to Analytics.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Learn more from Google&apos;s official pages about{" "}
            <Link
              className={externalLinkClass}
              href="https://support.google.com/analytics/answer/11593727"
              target="_blank"
              rel="noopener noreferrer"
            >
              Analytics data collection
            </Link>
            ,{" "}
            <Link
              className={externalLinkClass}
              href="https://support.google.com/analytics/answer/6004245"
              target="_blank"
              rel="noopener noreferrer"
            >
              Analytics data safeguards
            </Link>
            , and the{" "}
            <Link
              className={externalLinkClass}
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-foreground">
            Hosting and external links
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The site is delivered by Netlify. Like other hosting providers,
            Netlify may process technical request information needed to deliver,
            protect, and operate the service. See the{" "}
            <Link
              className={externalLinkClass}
              href="https://www.netlify.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Netlify Privacy Statement
            </Link>
            . Links to GitHub, LinkedIn, Medium, and other external sites are
            governed by those services&apos; own privacy practices.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-foreground">Retention</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your consent choice remains in this browser until you change it or
            clear the site&apos;s browser storage. As verified on 20 August 2026,
            this GA4 property retains event data for 2 months and user data for
            14 months; reset-on-new-user-activity is enabled. These property
            settings may be reviewed and changed as the site evolves.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Changing your choice to Declined stops future collection in this
            browser but does not automatically erase data already processed by
            Google. Google explains the scope of these controls in its{" "}
            <Link
              className={externalLinkClass}
              href="https://support.google.com/analytics/answer/7667196"
              target="_blank"
              rel="noopener noreferrer"
            >
              data retention documentation
            </Link>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3 border-t border-hairline pt-8">
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            For a privacy question about this site, email{" "}
            <Link
              className={externalLinkClass}
              href={`mailto:${personalInfo.email}`}
            >
              {personalInfo.email}
            </Link>
            .
          </p>
        </section>
      </article>
    </PageContainer>
  );
}
