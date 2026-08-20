export type AnalyticsEvent = {
  name:
    | "article_open"
    | "article_to_expertise"
    | "contact_intent"
    | "profile_open"
    | "project_open"
    | "repository_open"
    | "resume_open";
  params: Record<string, string>;
};

const EXPERTISE_PATHS = new Set([
  "/full-stack-developer",
  "/nextjs-developer",
  "/react-developer",
  "/saas-development",
  "/ecommerce-development",
]);

function slugFrom(pathname: string, prefix: string) {
  const slug = pathname.slice(prefix.length).split("/")[0];
  return slug || undefined;
}

function profilePlatform(hostname: string) {
  if (hostname === "github.com") return "github";
  if (hostname === "linkedin.com" || hostname.endsWith(".linkedin.com")) {
    return "linkedin";
  }
  if (hostname === "medium.com" || hostname.endsWith(".medium.com")) {
    return "medium";
  }
  if (hostname === "x.com" || hostname === "twitter.com") return "x";
  return undefined;
}

/**
 * Classifies only intentional, high-signal navigation without returning email
 * addresses, phone numbers, query strings, or arbitrary external URLs.
 */
export function classifyAnalyticsLink({
  href,
  sourcePath,
  siteOrigin,
  linkLocation,
}: {
  href: string;
  sourcePath: string;
  siteOrigin: string;
  linkLocation: string;
}): AnalyticsEvent | null {
  const common = {
    link_location: linkLocation,
    source_path: sourcePath,
  };

  if (href.toLowerCase().startsWith("mailto:")) {
    return {
      name: "contact_intent",
      params: { ...common, contact_method: "email" },
    };
  }

  if (href.toLowerCase().startsWith("tel:")) {
    return {
      name: "contact_intent",
      params: { ...common, contact_method: "phone" },
    };
  }

  let url: URL;
  try {
    url = new URL(href, siteOrigin);
  } catch {
    return null;
  }

  const sameOrigin = url.origin === siteOrigin;

  if (sameOrigin && url.pathname.toLowerCase().endsWith(".pdf")) {
    return { name: "resume_open", params: common };
  }

  if (sameOrigin && EXPERTISE_PATHS.has(url.pathname)) {
    const expertiseSlug = url.pathname.slice(1);

    if (sourcePath.startsWith("/blog/")) {
      return {
        name: "article_to_expertise",
        params: {
          ...common,
          article_slug: sourcePath.slice("/blog/".length),
          expertise_slug: expertiseSlug,
        },
      };
    }

    return null;
  }

  if (sameOrigin && url.pathname.startsWith("/projects/")) {
    const projectSlug = slugFrom(url.pathname, "/projects/");
    return projectSlug
      ? {
          name: "project_open",
          params: { ...common, project_slug: projectSlug },
        }
      : null;
  }

  if (sameOrigin && url.pathname.startsWith("/blog/")) {
    const articleSlug = slugFrom(url.pathname, "/blog/");
    return articleSlug
      ? {
          name: "article_open",
          params: { ...common, article_slug: articleSlug },
        }
      : null;
  }

  if (!sameOrigin) {
    const platform = profilePlatform(url.hostname.toLowerCase());
    if (!platform) return null;

    const pathParts = url.pathname.split("/").filter(Boolean);
    const isRepository = platform === "github" && pathParts.length >= 2;

    return {
      name: isRepository ? "repository_open" : "profile_open",
      params: isRepository
        ? { ...common, repository: pathParts[1] }
        : { ...common, platform },
    };
  }

  return null;
}

