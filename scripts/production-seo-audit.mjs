const origin = "https://ifham.dev";
const errors = [];

function matches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

async function fetchManual(url) {
  try {
    return await fetch(url, {
      redirect: "manual",
      headers: { "user-agent": "ifham.dev production SEO audit" },
    });
  } catch (error) {
    errors.push(`${url}: request failed (${error.message})`);
    return undefined;
  }
}

const sitemapResponse = await fetchManual(`${origin}/sitemap.xml`);
if (!sitemapResponse || sitemapResponse.status !== 200) {
  errors.push(`${origin}/sitemap.xml: expected HTTP 200`);
}

const sitemap = sitemapResponse ? await sitemapResponse.text() : "";
const sitemapUrls = matches(sitemap, /<loc>([^<]+)<\/loc>/g);
const resources = new Set();

await Promise.all(
  sitemapUrls.map(async (url) => {
    const response = await fetchManual(url);
    if (!response || response.status !== 200) {
      errors.push(`${url}: expected HTTP 200, received ${response?.status ?? "no response"}`);
      return;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      errors.push(`${url}: expected HTML, received ${contentType || "unknown content type"}`);
      return;
    }

    const html = await response.text();
    const canonical = matches(html, /<link rel="canonical" href="([^"]+)"/g);
    if (canonical.length !== 1 || canonical[0] !== url) {
      errors.push(`${url}: production canonical does not match the sitemap URL`);
    }

    if (/\b(?:src|srcset)="http:\/\//i.test(html)) {
      errors.push(`${url}: contains an insecure active-media reference`);
    }

    if (/This page could not be found|Page not found/i.test(html)) {
      errors.push(`${url}: looks like a soft 404`);
    }

    for (const value of matches(
      html,
      /<(?:script|img|source)\b[^>]*\b(?:src|srcset)="([^"]+)"/gi
    )) {
      for (const candidate of value.split(",").map((part) => part.trim().split(/\s+/)[0])) {
        if (!candidate) continue;
        const resource = new URL(candidate, url);
        if (resource.origin === origin) resources.add(resource.href);
      }
    }

    for (const value of matches(
      html,
      /<link\b[^>]*\b(?:href)="([^"]+)"[^>]*>/gi
    )) {
      const resource = new URL(value, url);
      if (resource.origin === origin && !resource.hash) resources.add(resource.href);
    }
  })
);

await Promise.all(
  [...resources].map(async (url) => {
    const response = await fetchManual(url);
    if (!response || response.status !== 200) {
      errors.push(`${url}: referenced resource returned ${response?.status ?? "no response"}`);
    }
  })
);

const missingUrl = `${origin}/__seo-audit-confirmed-missing-route__`;
const missingResponse = await fetchManual(missingUrl);
if (!missingResponse || missingResponse.status !== 404) {
  errors.push(`${missingUrl}: expected a real HTTP 404`);
}

const redirectChecks = [
  ["http://ifham.dev/", `${origin}/`],
  ["http://www.ifham.dev/", `${origin}/`],
  ["https://www.ifham.dev/", `${origin}/`],
];

for (const [url, expectedLocation] of redirectChecks) {
  const response = await fetchManual(url);
  const location = response?.headers.get("location");
  if (!response || ![301, 302, 307, 308].includes(response.status)) {
    errors.push(`${url}: expected a permanent or temporary redirect`);
  } else if (new URL(location, url).href !== expectedLocation) {
    errors.push(`${url}: redirects to ${location}, expected ${expectedLocation}`);
  }
}

if (errors.length > 0) {
  console.error(`Production SEO audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Production SEO audit passed: ${sitemapUrls.length} canonical pages, ${resources.size} same-origin resources, HTTPS redirects, and a real 404.`
  );
}
