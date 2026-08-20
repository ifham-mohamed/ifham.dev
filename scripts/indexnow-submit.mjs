import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const origin = new URL("https://ifham.dev");
const endpoint = "https://api.indexnow.org/indexnow";
const key = "a204ccf145eb4873a1e80dab3c895132";
const keyLocation = new URL(`/${key}.txt`, origin).href;
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const submitAll = args.includes("--all");
const requestedUrls = args.filter((arg) => !arg.startsWith("--"));

function urlsFromSitemap() {
  const sitemapPath = join(process.cwd(), "out", "sitemap.xml");
  if (!existsSync(sitemapPath)) {
    throw new Error("Missing out/sitemap.xml. Run `pnpm build` first.");
  }

  const sitemap = readFileSync(sitemapPath, "utf8");
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

const urls = submitAll ? urlsFromSitemap() : requestedUrls;
if (urls.length === 0) {
  throw new Error(
    "Pass one or more deployed ifham.dev URLs, or use --all for the first full-site notification."
  );
}

for (const value of urls) {
  const url = new URL(value);
  if (url.origin !== origin.origin) {
    throw new Error(`Refusing to submit a URL outside ${origin.origin}: ${value}`);
  }
}

const uniqueUrls = [...new Set(urls)];
const payload = {
  host: origin.hostname,
  key,
  keyLocation,
  urlList: uniqueUrls,
};

if (dryRun) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

// The public key must already be deployed before a notification is sent.
const keyResponse = await fetch(keyLocation, { redirect: "error" });
const deployedKey = keyResponse.ok ? (await keyResponse.text()).trim() : "";
if (deployedKey !== key) {
  throw new Error(
    `IndexNow key is not deployed at ${keyLocation}. Deploy this release before submitting.`
  );
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow rejected the notification with HTTP ${response.status}.`);
}

console.log(
  `IndexNow accepted ${uniqueUrls.length} URL${uniqueUrls.length === 1 ? "" : "s"} (HTTP ${response.status}).`
);

