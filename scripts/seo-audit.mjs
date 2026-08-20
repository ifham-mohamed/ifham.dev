import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const origin = "https://ifham.dev";
const ignoredHtml = new Set(["404.html", "_not-found.html"]);

if (!existsSync(outDir)) {
  throw new Error("Missing out/. Run `pnpm build` before the SEO audit.");
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function routeFor(file) {
  const path = relative(outDir, file).split(sep).join("/");
  if (path === "index.html") return "/";
  return `/${path.replace(/\.html$/, "")}`;
}

function textMatches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function localTargetExists(href) {
  const withoutFragment = href.split("#")[0].split("?")[0];
  if (!withoutFragment) return true;
  if (withoutFragment === "/") return existsSync(join(outDir, "index.html"));

  const decoded = decodeURIComponent(withoutFragment).replace(/^\/+/, "");
  const direct = join(outDir, decoded);
  return (
    existsSync(direct) ||
    existsSync(`${direct}.html`) ||
    existsSync(join(direct, "index.html"))
  );
}

const errors = [];
const pages = walk(outDir)
  .filter((file) => extname(file) === ".html")
  .filter((file) => !ignoredHtml.has(relative(outDir, file)));
const titles = new Map();
const descriptions = new Map();
const canonicals = new Set();

for (const file of pages) {
  const route = routeFor(file);
  const html = readFileSync(file, "utf8");
  const expectedCanonical = route === "/" ? origin : `${origin}${route}`;
  const title = textMatches(html, /<title>([\s\S]*?)<\/title>/g)[0];
  const description = textMatches(
    html,
    /<meta name="description" content="([^"]*)"/g
  )[0];
  const pageCanonicals = textMatches(
    html,
    /<link rel="canonical" href="([^"]+)"/g
  );
  const h1Count = (html.match(/<h1\b/g) ?? []).length;

  if (!title) errors.push(`${route}: missing title`);
  if (!description) errors.push(`${route}: missing meta description`);
  if (h1Count !== 1) errors.push(`${route}: expected 1 h1, found ${h1Count}`);
  if (pageCanonicals.length !== 1) {
    errors.push(`${route}: expected 1 canonical, found ${pageCanonicals.length}`);
  } else if (pageCanonicals[0] !== expectedCanonical) {
    errors.push(
      `${route}: canonical ${pageCanonicals[0]} does not match ${expectedCanonical}`
    );
  } else {
    canonicals.add(pageCanonicals[0]);
  }

  if (title) {
    if (titles.has(title)) errors.push(`${route}: duplicate title also used by ${titles.get(title)}`);
    titles.set(title, route);
  }
  if (description) {
    if (descriptions.has(description)) {
      errors.push(
        `${route}: duplicate description also used by ${descriptions.get(description)}`
      );
    }
    descriptions.set(description, route);
  }

  for (const payload of textMatches(
    html,
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    try {
      JSON.parse(payload);
    } catch (error) {
      errors.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const href of textMatches(html, /<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (!localTargetExists(href)) errors.push(`${route}: broken internal link ${href}`);
  }
}

const sitemapPath = join(outDir, "sitemap.xml");
const robotsPath = join(outDir, "robots.txt");

if (!existsSync(sitemapPath)) {
  errors.push("missing sitemap.xml");
} else {
  const sitemap = readFileSync(sitemapPath, "utf8");
  const sitemapUrls = new Set(textMatches(sitemap, /<loc>([^<]+)<\/loc>/g));
  for (const canonical of canonicals) {
    if (!sitemapUrls.has(canonical)) errors.push(`sitemap missing ${canonical}`);
  }
  for (const url of sitemapUrls) {
    if (!canonicals.has(url)) errors.push(`sitemap contains non-canonical or missing page ${url}`);
  }
}

if (!existsSync(robotsPath)) {
  errors.push("missing robots.txt");
} else {
  const robots = readFileSync(robotsPath, "utf8");
  if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) {
    errors.push("robots.txt does not reference the canonical sitemap");
  }
}

if (errors.length > 0) {
  console.error(`SEO audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `SEO audit passed: ${pages.length} pages, ${canonicals.size} canonicals, valid metadata, JSON-LD, sitemap, robots, and internal links.`
  );
}
