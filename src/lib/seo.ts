import { personalInfo } from "@/data";

export const personId = `${personalInfo.url}/#person`;
export const websiteId = `${personalInfo.url}/#website`;

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Google expects Article date values to include a time and time zone. Content
 * frontmatter intentionally stores editorial dates without a time, so use the
 * beginning of that date in the site's Sri Lanka time zone for JSON-LD only.
 */
export function schemaDate(value: string) {
  return DATE_ONLY_PATTERN.test(value) ? `${value}T00:00:00+05:30` : value;
}

/**
 * Keep the canonical Person identity while exposing the fields Google's
 * Article parser expects on inline author and publisher objects.
 */
export function personJsonLdReference() {
  return {
    "@type": "Person",
    "@id": personId,
    name: personalInfo.name,
    url: personalInfo.url,
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
