# ifham.dev SEO master task tracker

Last updated: 2026-08-21

This is the single source of truth for SEO execution and completion status. The [SEO operating plan](./seo-roadmap.md) explains the strategy; this file tracks every implementation, deployment, measurement, content, and authority task.

The objective is durable global visibility for specific query/page pairs. A permanent global number-one result cannot be guaranteed because rankings vary by query, country, language, device, competitors, and algorithm changes. Success is measured by verified indexing, growth in qualified impressions and clicks, target-query positions, conversions, and relevant referring domains.

## Status rules

- `[x] DONE` — completed and supported by repository, build, audit, or production evidence.
- `[ ] READY` — actionable work that can be completed in the repository.
- `[ ] PARTIAL` — some implementation exists, but the acceptance criteria are not fully met.
- `[ ] DEPLOY` — requires the current repository version to be released or checked on production.
- `[ ] ACCOUNT` — requires access to Search Console, analytics, Bing, GitHub, or another owner-controlled account.
- `[ ] ONGOING` — recurring work that must stay active.
- `[ ] BLOCKED` — cannot proceed until a named dependency is available.

Completion rules:

1. Mark a task `DONE` only after its acceptance criteria have been verified.
2. Local implementation and production verification are separate tasks.
3. Add the completion date and a short evidence link or result when closing a task.
4. Keep recurring work as `ONGOING`; record each completed review in the review log.
5. Add new SEO work to the relevant phase before starting it.
6. Do not create a new page until its search intent, target query, evidence source, and internal-link role are recorded.

## Current status

| Workstream | Status | Current evidence or dependency |
| --- | --- | --- |
| Local technical SEO implementation | Complete | The latest lint, production build, TypeScript, rendered-page checks, and 33-page SEO audit pass |
| Search architecture | Implemented and live | Five expertise routes plus reciprocal React article/expertise/DynaPOS connections |
| Production SEO release | Current baseline complete; QA release ready | Release `280eb37` is live; the heading, social-preview, IndexNow, and production-audit release now needs deployment |
| LCP follow-up patch | Complete; field monitoring pending | Deployed with median mobile LCP 2.582 s and TBT 75 ms across three valid runs |
| Google Search Console baseline | Partial | Property and reports verified; 32-URL sitemap accepted and priority indexing requests are processing |
| Analytics/conversion baseline | Live and verified | GA4 `G-HGESN3BVG1` received all seven qualified-link event types and `contact_intent` is configured as the sole key event |
| Content authority | Three substantial refreshes live | TypeScript, measured Next.js, and boundary-first React testing updates are live; supporting cluster work remains |
| External authority | Ongoing | GitHub, publications, contributions, and earned links |
| Ranking iteration | Waiting for data | Starts after deployment and Search Console baseline collection |

## Immediate release gate

- [x] **DONE — 2026-08-20:** Generate the production site successfully with `pnpm build`.
- [x] **DONE — 2026-08-20:** Pass `pnpm lint`.
- [x] **DONE — 2026-08-20:** Pass the build-time SEO audit for 32 pages, 32 canonical URLs, metadata, JSON-LD, sitemap, robots, and internal links. Evidence: [SEO audit script](../scripts/seo-audit.mjs).
- [x] **DONE — 2026-08-20:** Preserve the live pre-release Lighthouse baseline: performance 96, accessibility 93, best practices 96, SEO 100; LCP 2.3 s, TBT 130 ms, CLS 0.
- [x] **DONE — 2026-08-20:** Reach accessibility 100 in the local post-change Lighthouse check.
- [x] **DONE — 2026-08-20:** Release the SEO implementation to `https://ifham.dev`; deployment was confirmed by the owner and verified from production.
- [x] **DONE — 2026-08-20:** Confirm all 32 sitemap URLs return HTTP 200 and their intended production pages.
- [x] **DONE — 2026-08-20:** Run the production crawl audit: 32/32 correct canonicals, titles, descriptions, single H1s, and valid JSON-LD; 33 unique internal targets checked with no failures.
- [x] **DONE — 2026-08-20:** Run production Lighthouse 12.8.2. Mobile: performance 92, accessibility 100, best practices 100, SEO 100, LCP 2.8 s, TBT 190 ms, CLS 0. Desktop: 100/100/100/100, LCP 0.6 s, TBT 0 ms, CLS 0.024.
- [x] **DONE — 2026-08-20:** Confirm production source contains the new metadata, canonical links, internal expertise links, and JSON-LD; browser inspection also confirmed all five expertise links and homepage `WebSite`, `ProfilePage`, and `Person` entities.
- [x] **DONE — 2026-08-20:** Deploy and verify the first hero LCP patch, then run three comparable mobile Lighthouse measurements.
- [x] **DONE — 2026-08-20:** Deploy the second LCP patch and confirm production contains no hero entrance-animation markers.
- [x] **DONE — 2026-08-20:** Submit the deployed sitemap in Google Search Console; Google accepted and read all 32 URLs successfully.
- [x] **DONE — 2026-08-20:** Build the privacy-first analytics release candidate; lint and the production build pass, and the SEO audit now covers 33 canonical pages including `/privacy`.
- [x] **DONE — 2026-08-20:** Release the consent banner, privacy page, consent-gated GA4 tag, CSP update, footer link, and 33-URL sitemap in commit `0b06c73`.
- [x] **DONE — 2026-08-20:** Verify production no-consent and decline behavior: the first visit contains no Google script or `gtag`, decline persists after reload, preferences reopen, and Analytics remains absent while declined.
- [x] **DONE — 2026-08-20:** Verify an explicit production opt-in loads exactly one `gtag.js` script for `G-HGESN3BVG1`; GA4 Realtime receives `page_view`, `first_visit`, and `session_start`, and `/privacy` reports 3 views for 3 active users.
- [x] **DONE — 2026-08-20:** Submit `https://ifham.dev/sitemap.xml` in Bing Webmaster Tools; Bing accepted it with zero errors and status `Processing`.
- [x] **DONE — 2026-08-20:** Release the privacy-safe qualified-link analytics candidate in commit `a64f4a7` and confirm all seven event names are present in the production bundle.
- [x] **DONE — 2026-08-20:** Release the capture-phase click-listener fix in commit `204149e`; production bundle inspection confirms capture mode, and a fresh-browser test delivered `article_to_expertise` to GA4 Realtime.
- [x] **DONE — 2026-08-20:** Release the 156-character homepage meta description in commit `7c79480`; production source matches it and Bing's live test clears both the description and duplicate-canonical issues.
- [x] **DONE — 2026-08-21:** Complete the requested Phase 1/2/4/5 local closure: repair the two heading-level gaps, add route-specific expertise/project/research social images, remove unused stock-image references, add image/heading/OG build gates, add a reusable production audit, and prepare IndexNow with a deployed-key safeguard. Lint, TypeScript, the production build, and the 33-page SEO audit pass.
- [ ] **DEPLOY — 2026-08-21:** The Phase 1/2/4/5 code is live, the 33-page/54-resource production crawl passes, and IndexNow accepted all 33 URLs. The stricter preview-file check then found that Netlify serves all extensionless generated PNG routes as `text/plain`; deploy the prepared MIME-header/audit follow-up and rerun the production/social-preview gate.

## Phase 1 — Measurement, ownership, and baseline

### Google Search Console

- [x] **DONE — 2026-08-20:** Verify the `sc-domain:ifham.dev` Search Console property is accessible in the owner's signed-in Chrome session.
- [x] **DONE — 2026-08-20:** Confirm a Google site-verification metadata value exists in the application configuration.
- [x] **DONE — 2026-08-20:** Confirm Search Console recognizes the verified domain property and exposes its Overview, Performance, Indexing, Sitemaps, Links, and Settings reports.
- [x] **DONE — 2026-08-20:** Submit `https://ifham.dev/sitemap.xml` after deployment.
- [x] **DONE — 2026-08-20:** Confirm the refreshed sitemap was submitted/read on 2026-08-20 with status `Success`, 32 discovered pages, and zero discovered videos.
- [ ] **PARTIAL — 2026-08-21:** Inspect the homepage, five expertise pages, project/blog/research indexes, and the three previously crawled-but-not-indexed URLs. The homepage has now been recrawled successfully on 2026-08-20 at 17:39, but the aggregate coverage report is still dated 2026-08-17 and exposes only six known pages; the remaining detail URLs still need inspection as crawl data becomes available.
- [x] **DONE — 2026-08-20:** Record the pre-recrawl indexing report last updated 2026-08-17: 2 indexed pages and 4 non-indexed URLs across two reasons.
- [x] **DONE — 2026-08-20:** Record the indexed examples: homepage (last crawled 2026-08-17) and `/projects/prompt-copilot` (last crawled 2026-07-01).
- [x] **DONE — 2026-08-20:** Review `Crawled — currently not indexed`: `/projects/total-supply`, `/blog/typescript-best-practices`, and `/blog/building-design-systems`. First action is sitemap resubmission/recrawl; if they remain excluded, strengthen distinct first-hand evidence and inspect each live result.
- [x] **DONE — 2026-08-20:** Record URL Inspection results after sitemap submission: all five expertise pages plus `/projects`, `/blog`, and `/research` are discovered but not yet crawled or indexed; the sitemap is associated with each URL.
- [x] **DONE — 2026-08-20:** Confirm the reported `Page with redirect` example is the expected `http://ifham.dev/` URL, which correctly redirects to the HTTPS canonical.
- [x] **DONE — 2026-08-21:** Check Google's selected canonical against the declared canonical for every currently reported duplicate or alternate URL. The Pages report contains no duplicate/alternate category, and the recrawled homepage reports user-declared `https://ifham.dev/` with Google-selected `Inspected URL`.
- [x] **DONE — 2026-08-20:** Review manual actions and security issues; both reports state `No issues detected`.
- [x] **DONE — 2026-08-20:** Export/capture the 3-month and available 16-month Web-search query, page, country, device, click, impression, CTR, and average-position baseline in [the dated baseline](./seo-baseline-2026-08-20.md).
- [x] **DONE — 2026-08-20:** Save the dated pre-iteration baseline so later gains are comparable. Three-month totals are 21 clicks, 167 impressions, 12.6% CTR, and position 7.0; the available 16-month totals are 21 clicks, 199 impressions, 10.6% CTR, and position 7.8.
- [ ] **PARTIAL — 2026-08-21:** Check Search Console enhancement reports and structured-data errors after Google recrawls the release. The recrawled homepage has no reported enhancement error, but the aggregate Overview still says `No enhancements yet`; recheck when Google processes the article and research URLs.

### Analytics and conversions

- [x] **DONE — 2026-08-20:** Identify the existing Google Analytics 4 property and web-stream Measurement ID `G-HGESN3BVG1`; the property currently reports no received website data.
- [x] **DONE — 2026-08-20:** Choose and implement a privacy-first basic consent approach: Google Analytics is absent before opt-in, advertising storage/signals remain disabled, the preference is persisted locally, declining removes site GA cookies, and visitors can reopen their choice from `/privacy`.
- [x] **DONE — 2026-08-20:** Add the indexable `/privacy` page, footer access, JSON-LD, canonical metadata, and official Google/Netlify privacy references.
- [x] **DONE — 2026-08-20:** Validate the local decline path: the first-visit banner appears, no Google script exists before consent, declining closes the banner and records `Declined`, reopening preferences works, and Google scripts remain absent.
- [x] **DONE — 2026-08-20:** Record the GA4 property retention settings used in the privacy disclosure: event data 2 months, user data 14 months, and reset-on-new-user-activity enabled.
- [x] **DONE — 2026-08-20:** Verify the deployed consent flow and GA4 request behavior on production after the owner released commit `0b06c73`.
- [x] **DONE — 2026-08-20:** Confirm GA4 Realtime receives the first consented events for measurement ID `G-HGESN3BVG1`; the `/privacy` route reports one view per active user in the observed window.
- [x] **DONE — 2026-08-20:** Define and implement privacy-safe qualified-link events: `contact_intent`, `profile_open`, `repository_open`, `project_open`, `article_open`, `resume_open`, and `article_to_expertise`. Event parameters intentionally exclude email addresses, phone numbers, query strings, and arbitrary external URLs.
- [x] **DONE — 2026-08-20:** Pass the local event-classifier audit for email, phone, project, expertise, repository, and résumé links without leaking their sensitive destination values.
- [x] **DONE — 2026-08-20:** Test every qualified-link event on production. GA4 Realtime received `contact_intent`, `profile_open`, `repository_open`, `project_open`, `article_open`, `resume_open`, and—after the capture-phase fix—`article_to_expertise`.
- [x] **DONE — 2026-08-20:** Configure only the approved `contact_intent` event as a GA4 key event using the existing code implementation, no default monetary value, and once-per-event counting. GA4 confirmed `Event created successfully`, and the Key events table now lists `contact_intent` with its star enabled; content-navigation events were not marked as key events.
- [x] **DONE — 2026-08-20:** Record the pre-tag analytics baseline: GA4 reports no received website data and zero active users, events, or key events.
- [x] **DONE — 2026-08-20:** Connect Search Console and GA4 after explicit review of the data-sharing scope. GA4 confirmed `Link created successfully`; the verified row is `ifham.dev` Domain → `form` web stream (`G-HGESN3BVG1`, stream ID `4099190608`) in property `form-ad2c3` (`334272514`), linked on 2026-08-20. Authorized property users can access the shared product data, and the linking identity is recorded in GA4 as disclosed by the setup flow.
- [x] **DONE — 2026-08-21:** Exclude internal/test traffic without collecting a private IP address. GA4 has its default Internal Traffic exclusion in `Testing`, with no unsafe empty IP rule activated; the owner's working Chrome profile is now persistently set to `Declined`, and a reload confirms zero Google Analytics loader scripts.

### Bing and secondary discovery

- [x] **DONE — 2026-08-20:** Confirm the owner imported the verified Google Search Console property into Bing Webmaster Tools; `ifham.dev` is selected and Bing reports that its site data is processing, which may take up to 48 hours.
- [x] **DONE — 2026-08-20:** Inspect Bing's Sitemaps report after import; it shows zero known sitemaps and zero discovered URLs, so the sitemap was not imported automatically.
- [x] **DONE — 2026-08-20:** Submit the 33-URL production sitemap to Bing; Bing now reports `Success`, 33 discovered URLs, zero errors, and zero warnings after crawling it on 2026-08-20.
- [x] **DONE — 2026-08-20:** Inspect the homepage in Bing: it is indexed successfully, crawl/indexing are allowed, and the last indexed fetch succeeded. Bing discovered it on 2026-02-22 and last crawled it on 2026-08-16.
- [ ] **PARTIAL — 2026-08-21:** Review Bing indexing and crawl issues. The post-deploy live homepage test says the URL can be indexed and clears the description and duplicate-canonical issues. The remaining empty-alt notice refers to an intentional decorative duplicate portrait and is retained for accessibility. The signed-in Site Explorer recheck still reports `No data available`; no crawl inventory exists to repair yet.
- [x] **DONE — 2026-08-21:** Send the first safeguarded IndexNow notification after confirming the deployed key. The endpoint accepted all 33 sitemap URLs with HTTP 202; future releases should submit only added, updated, or deleted URLs rather than repeating the full set.

### Ranking and authority baseline

- [ ] **ACCOUNT:** Record current positions for every target query/page pair by country and device where data volume permits.
- [x] **DONE — 2026-08-20:** Record the complete visible three-month Search Console baseline for 2026-05-19 through 2026-08-18: 21 clicks, 167 impressions, 12.6% CTR, and average position 7.0, with every available query, page, country, device, and search-appearance row preserved in [the dated baseline](./seo-baseline-2026-08-20.md).
- [ ] **PARTIAL — 2026-08-20:** The only visible query row is branded query `ifham` with 25 impressions and 0 clicks; privacy/volume limits hide most query attribution, so a reliable branded/non-branded split is not yet available.
- [x] **DONE — 2026-08-20:** Record pages receiving impressions in the visible report: homepage 163 impressions/21 clicks, `/projects/total-supply` 2/0, and `/projects/prompt-copilot` 2/0.
- [x] **DONE — 2026-08-20:** Record visible country baseline: Sri Lanka 74 impressions/20 clicks, United States 34/0, India 16/0, Egypt 13/0, Australia 4/1, with smaller counts across other countries.
- [ ] **PARTIAL — 2026-08-20:** Search Console's Links report currently shows zero external and zero internal link data. Recheck after Google recrawls the current 33-page site and compare with a consistent third-party backlink source.
- [x] **DONE — 2026-08-21:** Record the dated public brand/entity result baseline for `Ifham Mohamed` and `ifham.dev`. The sampled general web results returned the owned homepage first for both exact queries, and also surfaced the TypeScript article for the domain query; methodology and limitations are preserved in [the dated baseline](./seo-baseline-2026-08-20.md).

## Phase 2 — Crawlability, indexing, and canonicalization

### Robots and sitemap

- [x] **DONE — 2026-08-20:** Generate robots directives from [the application robots route](../src/app/robots.ts).
- [x] **DONE — 2026-08-20:** Reference the absolute production sitemap URL in robots output.
- [x] **DONE — 2026-08-20:** Generate the sitemap from [the application sitemap route](../src/app/sitemap.ts) instead of maintaining a stale public XML file.
- [x] **DONE — 2026-08-20:** Include all 32 canonical indexable pages in the generated sitemap.
- [x] **DONE — 2026-08-20:** Add `/privacy` to the local release candidate sitemap and verify the generated sitemap now contains 33 canonical URLs.
- [x] **DONE — 2026-08-20:** Use absolute HTTPS URLs in the sitemap.
- [x] **DONE — 2026-08-20:** Exclude redirects, missing pages, parameter variants, and noncanonical URLs from the sitemap.
- [x] **DONE — 2026-08-20:** Provide meaningful last-modified values from the available content data.
- [x] **DONE — 2026-08-20:** Confirm the production robots and sitemap endpoints return HTTP 200 without authentication or challenge pages; robots references `https://ifham.dev/sitemap.xml`, which contains 32 URLs.
- [x] **DONE — 2026-08-20:** Verify the post-privacy production sitemap returns HTTP 200 and contains all 33 canonical URLs including `/privacy`.

### Host, redirects, and status codes

- [x] **DONE — 2026-08-20:** Verify live HTTP redirects to HTTPS.
- [x] **DONE — 2026-08-20:** Verify live `www` redirects to the canonical non-`www` hostname.
- [x] **DONE — 2026-08-20:** Verify live trailing-slash URLs normalize consistently.
- [x] **DONE — 2026-08-20:** Verify unknown live URLs return 404.
- [x] **DONE — 2026-08-21:** Verify the attempted direct `http www` canonicalization. Netlify upgrades `http://www.ifham.dev` to HTTPS before project redirects, so the platform retains a two-step chain ending at `https://ifham.dev/`; `https www` and `http` apex each canonicalize in one step. Remove the ineffective HTTP-domain rule and keep an automated exact-chain check. No loop, error, or noncanonical final response exists.
- [x] **DONE — 2026-08-20:** Repeat production host, protocol, slash, and 404 checks: HTTP and HTTPS `www` variants reach the HTTPS apex, `/projects/` normalizes to `/projects`, and an unknown URL returns 404. The separate two-hop finding remains open above.
- [x] **DONE — 2026-08-20:** Confirm every intended indexable sitemap URL returns HTTP 200 in production.
- [x] **DONE — 2026-08-21:** Confirm removed/missing URL handling. There is no recorded permanently removed canonical inventory; the production audit confirms a real unknown URL returns 404, all 33 sitemap URLs return canonical pages, and the build contains no internal link or sitemap entry for a missing route.

### Canonicals, index directives, and rendering

- [x] **DONE — 2026-08-20:** Remove the nested-page canonical conflict that also declared the homepage as canonical.
- [x] **DONE — 2026-08-20:** Give every audited indexable page one self-referencing canonical URL.
- [x] **DONE — 2026-08-20:** Confirm the production build has no accidental `noindex` on intended pages.
- [x] **DONE — 2026-08-20:** Render important copy, headings, metadata, links, and JSON-LD into server-generated HTML.
- [x] **DONE — 2026-08-20:** Make the build audit fail on missing/duplicate canonical URLs, invalid metadata, malformed JSON-LD, missing sitemap entries, or broken internal links.
- [x] **DONE — 2026-08-20:** Verify all 32 production pages have exactly one matching self-canonical and no accidental `noindex` directive.
- [ ] **PARTIAL — 2026-08-21:** Compare Google-selected and user-declared canonicals after recrawl. The homepage matches exactly after its 2026-08-20 Googlebot-smartphone crawl; other pages are waiting for stored crawl/index data.
- [x] **DONE — 2026-08-21:** Audit query-string URLs currently visible in analytics and Search Console. No parameter URL is reported, generated navigation uses stable canonical paths, and analytics event classification deliberately discards query strings. Reopen only if a real parameter variant appears in data or logs.
- [ ] **ACCOUNT — 2026-08-21:** Review server/CDN logs, if available, for crawl waste, repeated 4xx/5xx responses, and bot access failures. Netlify request logs are not available in the repository or current account surfaces; the independent production crawl covers public 4xx/5xx and resource failures meanwhile.

### Crawl graph and errors

- [x] **DONE — 2026-08-20:** Audit generated internal links and fail the build for links to missing pages.
- [x] **DONE — 2026-08-20:** Confirm every sitemap page is reachable through the generated internal-link graph.
- [x] **DONE — 2026-08-20:** Crawl the deployed site independently and confirm the sitemap inventory contains 32 canonical pages; check 33 unique internal targets with no HTTP failures.
- [x] **DONE — 2026-08-21:** Check current production for mixed content, TLS problems, 5xx responses, soft 404s, and unexpected blocked resources. The reusable audit passed all 33 canonical pages, 54 same-origin resources, HTTPS redirects, and a real 404 with no failures.
- [ ] **ONGOING:** Review Search Console crawl/indexing errors after every material route or deployment change.

## Phase 3 — Search architecture, keyword research, and mapping

### Site architecture

- [x] **DONE — 2026-08-20:** Keep the homepage focused on Ifham Mohamed and the demonstrated software-engineering portfolio.
- [x] **DONE — 2026-08-20:** Create a focused full-stack developer page.
- [x] **DONE — 2026-08-20:** Create a focused Next.js developer page.
- [x] **DONE — 2026-08-20:** Create a focused React developer page.
- [x] **DONE — 2026-08-20:** Create a focused SaaS development page.
- [x] **DONE — 2026-08-20:** Create a focused e-commerce development page.
- [x] **DONE — 2026-08-20:** Preserve dedicated project, article, and research destinations as evidence pages.
- [x] **DONE — 2026-08-20:** Store expertise intent and supporting evidence in [structured expertise data](../src/data/expertise.data.ts).
- [x] **DONE — 2026-08-20:** Establish the initial intent map in the [SEO operating plan](./seo-roadmap.md).

### Keyword and competitor research

- [x] **DONE — 2026-08-20:** Capture every currently visible real Search Console query before the first data-led priority decision; the dated baseline preserves the branded row and the first visible TypeScript clean-code variants, with privacy-withheld volume explicitly documented.
- [ ] **READY:** Build a keyword inventory for branded, expertise, problem, comparison, tutorial, and case-study intent.
- [ ] **READY:** For each candidate query, record global relevance, target countries/languages, search intent, current result type, difficulty, realistic traffic, business value, and required evidence.
- [ ] **READY:** Review the current top results for each priority query and record content type, depth, freshness, proof, links, and SERP features.
- [ ] **READY:** Identify query gaps that are supported by real experience; reject topics without credible evidence or audience value.
- [ ] **READY:** Assign one primary intent and one canonical page to each approved target query.
- [ ] **READY:** Record secondary queries without allowing multiple pages to target the same primary intent.
- [ ] **ACCOUNT:** Validate the initial architecture against Search Console query/page data after sufficient post-deploy data is available.
- [ ] **ONGOING:** Review cannibalization by finding queries for which multiple ifham.dev pages alternate or compete.

### International/global readiness

- [ ] **READY:** Define the primary publishing language and priority global markets; do not add country pages without distinct value.
- [ ] **READY:** Use internationally understandable terminology while preserving technically precise examples.
- [ ] **READY:** Add `hreflang` only if genuine translated or regional equivalents are created.
- [ ] **ACCOUNT:** Segment ranking and conversion results by country and device before changing content for a market.

## Phase 4 — On-page metadata, copy, media, and accessibility

### Titles, descriptions, headings, and copy

- [x] **DONE — 2026-08-20:** Give all 32 audited pages a valid, unique title.
- [x] **DONE — 2026-08-20:** Give all 32 audited pages a valid, unique description.
- [x] **DONE — 2026-08-20:** Give each audited page one clear H1.
- [x] **DONE — 2026-08-21:** Review every rendered page for logical H2/H3 hierarchy. The audit found and the implementation repaired the `/blog` and `/projects` h1-to-h3 skips; the build now fails on future skipped heading levels and all 33 pages pass.
- [x] **DONE — 2026-08-20:** Add useful server-rendered introductory copy to the five expertise destinations.
- [ ] **ONGOING:** Keep introductions direct, intent-matched, and useful instead of keyword-stuffed.
- [ ] **ONGOING:** Include relevant entities, technologies, problems, outcomes, and constraints naturally in page copy.
- [ ] **ONGOING:** Verify factual and technical claims against the linked project, article, repository, benchmark, or research evidence.

### Social previews and images

- [x] **DONE — 2026-08-20:** Add route-specific Open Graph images for project detail pages.
- [x] **DONE — 2026-08-20:** Add route-specific Open Graph images for article detail pages.
- [x] **DONE — 2026-08-21:** Create distinct, self-hosted social preview images for all five expertise pages, the projects collection, the research collection, and the research dossier; metadata now points to each route-specific image and the static export builds every image route.
- [ ] **DEPLOY — 2026-08-21:** Test representative expertise, projects, research-index, and research-detail URLs in social preview debuggers after the MIME follow-up is deployed. Direct checks confirmed correct route-specific image URLs and PNG bytes, but all 33 generated image responses currently declare `text/plain`; explicit Netlify `image/png` headers and a permanent production MIME gate are ready locally.
- [x] **DONE — 2026-08-20:** Optimize the primary profile image and serve a compact WebP asset.
- [x] **DONE — 2026-08-21:** Audit every rendered image for an explicit alt decision. Meaningful portraits/logos use descriptive text, deliberate visual duplicates use empty alt, and the build now fails if any rendered image omits the attribute.
- [x] **DONE — 2026-08-21:** Confirm image filenames and surrounding context. The local profile filename is descriptive; unused generic Unsplash frontmatter and the decorative TypeScript stock image were removed instead of presenting unowned stock as evidence, and the generated route-specific social artwork uses only repository-controlled design elements.
- [ ] **ONGOING:** Record image source/license/ownership for future non-original media.

### Accessibility that affects discovery and usability

- [x] **DONE — 2026-08-20:** Resolve audited navigation/action-link accessibility issues and reach local Lighthouse accessibility 100.
- [x] **DONE — 2026-08-20:** Pass the production Lighthouse accessibility audit at 100 on both mobile and desktop; retain manual keyboard/focus review as recurring UI QA.
- [ ] **ONGOING:** Run accessibility checks whenever navigation, content components, or color systems change.

## Phase 5 — Structured data and entity consistency

- [x] **DONE — 2026-08-20:** Add `WebSite` structured data to the homepage.
- [x] **DONE — 2026-08-20:** Add `ProfilePage` structured data to the homepage.
- [x] **DONE — 2026-08-20:** Add `Person` structured data for Ifham Mohamed.
- [x] **DONE — 2026-08-20:** Add `Blog`/collection structured data where appropriate.
- [x] **DONE — 2026-08-20:** Add `BlogPosting` structured data to article details.
- [x] **DONE — 2026-08-20:** Add `CollectionPage` structured data to project, blog, and research indexes.
- [x] **DONE — 2026-08-20:** Add `CreativeWork` structured data to project details.
- [x] **DONE — 2026-08-20:** Add `ScholarlyArticle` structured data to the research detail.
- [x] **DONE — 2026-08-20:** Add `BreadcrumbList` data to nested detail and expertise routes.
- [x] **DONE — 2026-08-20:** Validate JSON syntax and required local audit expectations during the production build.
- [x] **DONE — 2026-08-21:** Verify every `sameAs` target. GitHub `ifham-mohamed` and LinkedIn `/in/ifham-mohamed` are signed-in owner profiles named Ifham Mohamed; the Medium publication resolves to `Ifham mohamed` and contains matching software-engineering articles. All three URLs are legitimate identity references.
- [x] **DONE — 2026-08-20:** Validate representative production structured data. Schema.org reports zero errors and zero warnings for the homepage, TypeScript article, DynaPOS project, and Enigmatrix research detail. Google's live tests report a valid Article and Breadcrumbs for both TypeScript and Enigmatrix, plus valid Breadcrumbs for DynaPOS; release `7d7830b` cleared Enigmatrix's final optional image warning.
- [ ] **PARTIAL — 2026-08-21:** Review Search Console enhancement errors after recrawl. The recrawled homepage reports no enhancement problem and HTTPS is valid, while the aggregate report still has `No enhancements yet`; keep open until Google processes eligible article/research structured data.
- [ ] **ONGOING:** Keep structured data consistent with visible page content; never add unsupported ratings, reviews, jobs, awards, or claims.

## Phase 6 — Content clusters and evidence program

### Cluster foundations

- [ ] **PARTIAL:** TypeScript cluster — the data-led seed article now covers strictness, runtime validation, state modelling, errors, domain primitives, and API boundaries with project evidence; supporting articles and a consolidated hub are still needed.
- [ ] **PARTIAL:** Next.js cluster — an expertise page and projects exist, but more original App Router/performance evidence is needed.
- [ ] **PARTIAL:** React cluster — the expertise page, corrected DynaPOS test evidence, and boundary-first testing guide are connected locally; deployment and further state/design-system depth remain.
- [ ] **PARTIAL:** PostgreSQL cluster — project evidence exists, but dedicated tenant-schema, migration, and backfill articles are missing.
- [ ] **PARTIAL:** SaaS architecture cluster — an expertise page and related projects exist, but RBAC, tenancy, webhook, and operations articles are missing.
- [ ] **PARTIAL:** E-commerce engineering cluster — an expertise page and projects exist, but inventory, catalogue/media, and operational evidence need deeper articles.

### Prioritized content backlog

- [x] **DONE — 2026-08-20:** Refresh and expand the existing TypeScript article using original code examples, explicit tradeoffs, Prompt Copilot/DynaPOS evidence, primary TypeScript documentation, and contextual project/expertise links. The substantive update preserves `publishedAt` and sets `updatedAt` to 2026-08-20.
- [x] **DONE — 2026-08-20:** Released the refreshed TypeScript article in `32b8ac7` and verified the production 200 response, title, summary, canonical, `dateModified`, updated date, seven-minute reading time, and contextual links to Prompt Copilot, DynaPOS, and full-stack expertise.
- [x] **DONE — 2026-08-20:** Submit one recrawl request for the refreshed TypeScript article after production and structured-data validation. Search Console confirmed `Indexing requested` and added the URL to its priority crawl queue; do not resubmit because duplicate requests do not change queue position or priority.
- [x] **DONE — 2026-08-20:** Rewrite the thin generic Next.js tips article as a 1,447-word, seven-minute production LCP case study with Lighthouse 12.8.2 method, staged code changes, repeated-run ranges/medians, static-export image constraints, Next.js 16 guidance, contextual expertise/project links, and explicit lab/field limitations. Preserve `publishedAt` and set `updatedAt` to 2026-08-20; lint, build, rendered metadata/JSON-LD checks, and the 33-page SEO audit pass.
- [x] **DONE — 2026-08-20:** Release the measured Next.js case study in `de4afde` and verify the production 200 response, title/H1, summary, seven-minute reading time, updated date, 1,447-word Article JSON-LD, and contextual links to Next.js expertise, DynaPOS, and Prompt Copilot. Google's live test crawled successfully and reports one valid Article plus one valid Breadcrumb item with no warning badge.
- [x] **DONE — 2026-08-20:** Submit one approved indexing request for `/blog/nextjs-performance-tips`. Search Console confirmed `Indexing requested` and added the URL to its priority crawl queue; do not resubmit because duplicate requests do not change queue position or priority.
- [x] **DONE — 2026-08-20:** Rewrite the thin React testing article as a boundary-first, eight-minute guide grounded in the source-audited DynaPOS gap between 2,117 declared scenarios, 38 implemented scenarios, and verified execution. Add a test-level decision table, illustrative React/MSW and Playwright tests, runner-integrity controls, explicit evidence limitations, primary Testing Library/Vitest/Playwright sources, and contextual links to React expertise, DynaPOS, and the TypeScript boundary guide. The rendered Article data contains 1,561 words and a zoned `dateModified`; lint, build, visual review, and the 33-page SEO audit pass.
- [x] **DONE — 2026-08-20:** Release the React testing refresh and corrected DynaPOS evidence in `280eb37`. Production serves the intended title, eight-minute reading time, updated date, exact test-evidence limits, corrected role/outcome claims, and reciprocal same-tab links. Google's fresh live tests crawled successfully at 23:48–23:49 and detected one valid Article plus one valid Breadcrumb item for the React guide, and one valid Breadcrumb item for DynaPOS, with no warning badge.
- [x] **DONE — 2026-08-21:** Submit one approved indexing request for `/blog/testing-react-apps`. A fresh inspection associated the URL with the sitemap and homepage but still reported `Discovered – currently not indexed`; Search Console then confirmed `Indexing requested` and added the URL to its priority crawl queue. Do not resubmit.
- [x] **DONE — 2026-08-21:** Submit one approved indexing request for `/projects/dynapos`. Search Console tested the corrected live URL, confirmed `Indexing requested`, and added it to the priority crawl queue. Do not resubmit because duplicate requests do not change queue position or priority.
- [ ] **READY:** Publish an API design update grounded in a shipped project.
- [ ] **READY:** Publish a Next.js App Router case study with architecture decisions and measurable outcomes.
- [ ] **READY:** Publish a TypeScript article on modelling API errors or other domain states safely.
- [ ] **READY:** Publish a PostgreSQL multi-tenant schema article with isolation and indexing tradeoffs.
- [ ] **READY:** Publish a PostgreSQL migration/backfill article with rollback and observability details.
- [ ] **READY:** Publish a SaaS RBAC article grounded in real authorization requirements.
- [ ] **READY:** Publish an idempotent webhook processing article with failure/retry handling.
- [ ] **READY:** Publish an e-commerce inventory auditability article.
- [ ] **READY:** Publish an image/catalogue performance article with measured results.

### Content quality acceptance criteria

- [ ] **ONGOING:** Every new article answers a defined search intent and contributes to one approved cluster.
- [ ] **ONGOING:** Use first-hand implementation details, original examples, constraints, and outcomes.
- [ ] **ONGOING:** Add original diagrams when architecture or data flow is difficult to explain linearly.
- [ ] **ONGOING:** Add reproducible measurements and before/after results when making performance claims.
- [ ] **ONGOING:** Cite primary documentation or research for non-original technical claims.
- [ ] **ONGOING:** Include author identity, published/updated dates, and a meaningful update when dates change.
- [ ] **ONGOING:** Link every article to its cluster expertise page and relevant project proof.
- [ ] **ONGOING:** Avoid scaled, thin, repetitive, or generic AI-generated pages.
- [ ] **ONGOING:** Review accuracy, code compatibility, and broken outbound links before publication.

## Phase 7 — Experience, expertise, authoritativeness, and trust

- [x] **DONE — 2026-08-20:** Present a consistent named author/owner identity on the site.
- [x] **DONE — 2026-08-20:** Connect expertise statements to visible project and article evidence.
- [x] **DONE — 2026-08-20:** Correct the local DynaPOS case study against the source audit: replace unsupported lead-architecture, production/real-merchant, Vercel, and “~210 automated” claims with the supported QA/deployment contributor role, 192 feature files, 2,117 declared scenarios, 38 implemented scenarios, 2,079 pending scenarios, 22 migrations, 86 API route files, explicit verification limits, and a reciprocal link to the React testing guide.
- [ ] **READY:** Strengthen the author profile with a concise biography, areas of real experience, and links to verifiable work.
- [ ] **ACCOUNT:** Verify site name, name spelling, job description, profile image, and URLs are consistent across GitHub and other controlled profiles.
- [ ] **ACCOUNT:** Verify each external profile links back to the canonical site where appropriate.
- [ ] **READY:** Add repository, live demo, publication, benchmark, or research evidence to each case study where it can be shared safely.
- [ ] **READY:** Add measurable outcomes, role, constraints, dates, collaborators, and technical decisions to case studies where facts are available.
- [ ] **READY:** Clearly label private/client work where public verification is limited; do not invent metrics or endorsements.
- [ ] **ONGOING:** Keep contact, privacy, authorship, and ownership information accurate and easy to find.

## Phase 8 — Internal linking and crawl paths

- [x] **DONE — 2026-08-20:** Add the expertise destinations to the homepage.
- [x] **DONE — 2026-08-20:** Link expertise pages to supporting project proof.
- [x] **DONE — 2026-08-20:** Link expertise pages to supporting articles.
- [x] **DONE — 2026-08-20:** Link project details to related expertise pages.
- [x] **DONE — 2026-08-20:** Link article details to related expertise pages.
- [x] **DONE — 2026-08-20:** Keep every important page reachable within a small number of clicks through site navigation and contextual sections.
- [x] **DONE — 2026-08-20:** Use descriptive labels in the new expertise-related link components.
- [ ] **PARTIAL:** Add contextual in-body links from articles to other genuinely useful articles, not only related cards.
- [ ] **PARTIAL:** Add direct project-to-relevant-article links where the article explains a decision used in that project.
- [ ] **READY:** Link new articles back to the appropriate topic/expertise hub and proof pages before publication.
- [ ] **ONGOING:** Audit anchor text for clarity and variety; avoid generic `click here` and manipulative exact-match repetition.
- [ ] **ONGOING:** Re-run the internal-link audit whenever routes or content slugs change.

## Phase 9 — Performance and page experience

- [x] **DONE — 2026-08-20:** Record a production pre-release Core Web Vitals/Lighthouse lab baseline.
- [x] **DONE — 2026-08-20:** Record pre-release LCP 2.3 s, TBT 130 ms, and CLS 0 in the audited run.
- [x] **DONE — 2026-08-20:** Optimize the primary profile image to a 37,536-byte WebP asset.
- [x] **DONE — 2026-08-20:** Use framework image handling and explicit dimensions/sizing where implemented.
- [x] **DONE — 2026-08-20:** Use framework font loading to reduce unstable font behavior.
- [x] **DONE — 2026-08-20:** Preserve server rendering for important SEO content and avoid making it depend on client-side JavaScript.
- [x] **DONE — 2026-08-20:** Measure production with Lighthouse 12.8.2. Mobile performance is 92 (FCP 1.5 s, LCP 2.8 s, TBT 190 ms, CLS 0); desktop performance is 100 (FCP 0.4 s, LCP 0.6 s, TBT 0 ms, CLS 0.024).
- [ ] **ONGOING — 2026-08-20:** Search Console currently reports no mobile or desktop field Core Web Vitals data. Recheck once enough real-user data is available.
- [x] **DONE — 2026-08-20:** Profile the production mobile LCP: the hero description paragraph is the LCP element, and Lighthouse attributes about 72% of its 2.8 s time to render delay.
- [x] **DONE — 2026-08-20:** Remove the entrance animation and 120 ms stagger from the hero description so the above-the-fold LCP text is immediately renderable.
- [x] **DONE — 2026-08-20:** Deploy and verify the first LCP change. Three comparable mobile runs produced LCP 2.616–2.932 s with a 2.737 s median; median performance was 83, median TBT 460 ms, and CLS 0. The result improved slightly but did not reach the 2.5 s target.
- [x] **DONE — 2026-08-20:** Remove all remaining decorative hero entrance animations locally so the complete above-the-fold hero settles on first paint.
- [x] **DONE — 2026-08-20:** Release the second LCP change and collect three valid comparable mobile runs: performance 79–94 (median 86), LCP 2.236–3.349 s (median 2.582 s), TBT median 75 ms, and CLS 0. The wide LCP range shows network/lab variance; use later field data for the final decision.
- [ ] **READY:** Measure INP with field data or interaction testing; TBT is only a lab proxy.
- [ ] **READY:** Inspect shipped client JavaScript and remove or defer unnecessary code.
- [ ] **READY:** Audit all responsive images for correct intrinsic size, `sizes`, formats, and above/below-fold priority.
- [ ] **READY:** Confirm below-the-fold media and noncritical work are lazy/deferred without delaying important content.
- [ ] **READY:** Audit installed dependencies and remove unused client-impacting packages only after usage verification.
- [ ] **READY:** Test slow mobile network/CPU conditions separately from desktop.
- [ ] **ONGOING:** Prevent layout shifts by reserving media/component space and reviewing CLS after UI changes.
- [ ] **ONGOING:** Monitor caching and compression headers on HTML, scripts, styles, fonts, and images after hosting changes.

## Phase 10 — Authority and earned links

- [ ] **ACCOUNT:** Align GitHub profile identity, biography, canonical website URL, and featured repositories with the site.
- [ ] **ACCOUNT:** Add the relevant ifham.dev project/case-study URL to public repository descriptions or READMEs.
- [ ] **READY:** Identify one reusable internal utility that can become a documented open-source tool without exposing private code.
- [ ] **ONGOING:** Make useful, technically substantive contributions to relevant external projects.
- [ ] **ONGOING:** Seek technical publication, podcast, newsletter, conference, or community opportunities that match demonstrated expertise.
- [ ] **ONGOING:** Share original research, benchmarks, diagrams, and tools as linkable assets.
- [ ] **ONGOING:** Pursue relevant project/resource mentions through genuine relationships and useful contributions.
- [ ] **ONGOING:** Track new/lost referring domains, target pages, relevance, and suspicious patterns monthly.
- [ ] **ONGOING:** Reject paid link schemes, automated link blasts, private blog networks, comment spam, and irrelevant directory submissions.
- [ ] **ACCOUNT:** Review Search Console link data and a consistent third-party backlink source quarterly.

## Phase 11 — SERP presentation and click-through optimization

- [ ] **ACCOUNT:** Identify pages with strong impressions but weak CTR relative to position and query intent.
- [ ] **READY:** Rewrite a title only when query data shows a mismatch or clearer benefit can be stated accurately.
- [ ] **READY:** Rewrite a description to clarify value and evidence without clickbait or unsupported claims.
- [ ] **READY:** Improve opening copy and headings when the page does not immediately satisfy the dominant query intent.
- [ ] **ACCOUNT:** Track the before/after date for each snippet experiment and compare equivalent periods.
- [ ] **ACCOUNT:** Check whether Google rewrites titles/snippets and infer which page signals caused the rewrite.
- [ ] **READY:** Format concise definitions, steps, tables, or examples only where they genuinely improve the answer and may support SERP features.
- [ ] **ONGOING:** Avoid changing multiple high-impact page elements at once when a controlled comparison is possible.

## Phase 12 — Ranking iteration, consolidation, and refresh

- [ ] **ACCOUNT:** Review Search Console query/page results weekly after deployment.
- [ ] **ACCOUNT:** Build a working list of relevant queries in average positions 4–20 with meaningful impressions.
- [ ] **READY:** For each opportunity, compare the query intent, current ranking page, top competing result types, evidence gaps, and internal links.
- [ ] **READY:** Expand pages for relevant subqueries only when the additions fit the same primary intent.
- [ ] **READY:** Improve proof, examples, freshness, and clarity on high-potential pages before creating competing pages.
- [ ] **READY:** Merge or redirect overlapping weak pages when data confirms cannibalization or duplication.
- [ ] **READY:** Refresh old content with substantive changes; do not change dates without meaningful updates.
- [ ] **ACCOUNT:** Request recrawl after major, verified updates to priority pages where appropriate.
- [x] **DONE — 2026-08-20:** Request priority indexing once for all five expertise pages; Search Console shows `Indexing requested` for `/full-stack-developer`, `/nextjs-developer`, `/react-developer`, `/saas-development`, and `/ecommerce-development`.
- [ ] **ONGOING:** Measure performance by query/page pair, qualified traffic, and conversion—not generic SEO scores alone.

## Phase 13 — Monitoring and maintenance cadence

### Weekly

- [ ] **ONGOING:** Check indexing changes, sitemap errors, manual actions, security issues, and unusual crawl failures.
- [ ] **ONGOING:** Review target queries, pages, clicks, impressions, CTR, and position changes.
- [ ] **ONGOING:** Review relevant position 4–20 opportunities and assign at most a focused set of improvements.
- [ ] **ONGOING:** Check production uptime and unexpected 4xx/5xx responses for important pages.

### Monthly

- [ ] **ONGOING:** Review organic conversions and top/bottom landing-page changes.
- [ ] **ONGOING:** Review content decay, outdated technical claims, broken links, and refresh candidates.
- [ ] **ONGOING:** Re-run the production crawl, SEO audit, mobile Lighthouse, and accessibility checks.
- [ ] **ONGOING:** Review new/lost referring domains and authority work completed.
- [ ] **ONGOING:** Review cannibalization and the canonical query-to-page map.
- [ ] **ONGOING:** Update this tracker, evidence, priorities, and change log.

### Quarterly

- [ ] **ONGOING:** Reassess keyword opportunities, top-result expectations, competitor evidence, and business relevance.
- [ ] **ONGOING:** Review whether the five expertise destinations still match demonstrated work and search demand.
- [ ] **ONGOING:** Consolidate or retire content that has no distinct intent, evidence, links, engagement, or improvement path.
- [ ] **ONGOING:** Audit entity/profile consistency and structured-data accuracy.
- [ ] **ONGOING:** Review privacy, consent, analytics accuracy, dependencies, and hosting performance.

## Phase 14 — Reporting and acceptance criteria

### Per-page definition of done

A new or materially updated indexable page is complete only when all applicable checks pass:

- [ ] Primary intent, target query, audience, and evidence are recorded.
- [ ] URL is stable, descriptive, canonical, indexable, and included in the sitemap.
- [ ] Title, description, H1, headings, opening copy, and visible content are unique and useful.
- [ ] Claims are supported by first-hand evidence or cited primary sources.
- [ ] Images are optimized, sized, licensed/owned, and use appropriate alt text.
- [ ] Structured data matches visible content and validates.
- [ ] At least one relevant existing page links to it, and it links to its hub/proof pages.
- [ ] Mobile layout, keyboard use, accessibility, and performance have been checked.
- [ ] The production URL returns 200 and the intended HTML without a client-JavaScript dependency.
- [ ] Search Console inspection/requesting is recorded when appropriate.

### Program success indicators

- [ ] All intended canonical URLs are discoverable, valid, and indexed or have a documented reason/action.
- [ ] Non-branded qualified impressions and clicks grow over comparable periods.
- [ ] Priority query/page pairs move into and remain in competitive positions across target markets.
- [ ] Organic visits generate measurable qualified actions.
- [ ] Content clusters earn impressions across informational and commercial/problem intent without cannibalization.
- [ ] Relevant referring domains and independent mentions increase without manipulative link tactics.
- [ ] Core Web Vitals, accessibility, crawl health, and structured-data reports remain healthy.

## Next tasks in execution order

1. Confirm the next genuine `contact_intent` is counted as a key event; the latest Realtime check has one TypeScript-page user and only `page_view`/`user_engagement`, so no conversion was fabricated.
2. Monitor `/privacy`; the latest inspection still reports `URL is unknown to Google`, no referring sitemap, and no crawl, so no low-priority request was submitted.
3. Recheck Bing Site Explorer after imported-property processing; the latest check still reports `No data available`.
4. Inspect remaining project, article, and research detail URLs when the aggregate Pages report advances beyond its current 2026-08-17 update (2 indexed, 4 not indexed).
5. Continue monitoring `/blog/building-design-systems` and `/projects/total-supply` without rewriting from their current three and two impressions.
6. Begin the next actionable evidence-led refresh: expand `/blog/api-design-principles` around a source-verified project boundary and failure mode.
7. Continue earned-authority work and maintain the weekly/monthly review cadence.

## Evidence index

- Strategy and intent map: [SEO operating plan](./seo-roadmap.md)
- Automated acceptance checks: [SEO audit script](../scripts/seo-audit.mjs)
- Sitemap generation: [sitemap route](../src/app/sitemap.ts)
- Robots generation: [robots route](../src/app/robots.ts)
- Expertise intent/evidence data: [expertise data](../src/data/expertise.data.ts)
- Expertise route implementation: [expertise route](<../src/app/[expertise]/page.tsx>)
- Shared structured-data utilities: [SEO utilities](../src/lib/seo.ts)
- Dated Search Console baseline: [2026-08-20 performance baseline](./seo-baseline-2026-08-20.md)

## Review log

| Date | Review | Result | Follow-up |
| --- | --- | --- | --- |
| 2026-08-20 | Local implementation validation | Build, lint, 32-page SEO audit, and local accessibility check passed | Deploy and establish production/account baselines |
| 2026-08-20 | Post-deployment production crawl | 32/32 pages returned 200 with matching canonicals, metadata, one H1, and valid JSON-LD; 33 internal targets passed | Submit sitemap in search-engine accounts |
| 2026-08-20 | Redirect/status review | Canonical redirects and 404 behavior passed; `http www` has one extra hop | Review Netlify/domain-level redirect options |
| 2026-08-20 | Production Lighthouse 12.8.2 | Mobile 92/100/100/100; desktop 100/100/100/100; mobile LCP 2.8 s | Deploy immediate-render LCP text patch and remeasure |
| 2026-08-20 | Search Console baseline | Property accessible; 21 clicks/167 impressions over three months; 2 indexed, 3 crawled-not-indexed, 1 expected redirect; no manual/security issues | Resubmit the stale 9-URL sitemap view so Google processes the live 32-URL sitemap |
| 2026-08-20 | Search Console sitemap resubmission | Submitted/read successfully on 2026-08-20; discovered page count increased from 9 to 32 | Inspect/request indexing for priority new routes and monitor coverage |
| 2026-08-20 | Priority URL inspection | Homepage indexed; five expertise and three collection pages are discovered-not-indexed; three older examples remain crawled-not-indexed | Request indexing for the highest-priority pages, then monitor recrawl |
| 2026-08-20 | Post-LCP-patch mobile Lighthouse | Three runs: LCP 2.616–2.932 s, median 2.737 s; median performance 83; CLS 0 | Deploy removal of remaining hero animations and remeasure |
| 2026-08-20 | Priority indexing requests | All five expertise URLs added to Google's priority crawl queue once | Monitor URL Inspection and aggregate coverage; do not submit duplicates |
| 2026-08-20 | Bing and analytics discovery | Bing session has no site; GA4 property `G-HGESN3BVG1` exists but the website is untagged and has no consent flow | Confirm Bing GSC-import permission and choose privacy-first analytics behavior |
| 2026-08-20 | Final post-animation mobile Lighthouse | Three valid runs: LCP 2.236–3.349 s, median 2.582 s; performance median 86; TBT median 75 ms; CLS 0 | Monitor field CWV and avoid further lab-only tuning until data stabilizes |
| 2026-08-20 | Bing import verification | `ifham.dev` is present and processing; Sitemaps shows zero known sitemaps and zero discovered URLs | Submit the production sitemap, then recheck after processing |
| 2026-08-20 | Privacy-first analytics implementation | Added opt-in basic consent, `/privacy`, preference controls, consent-gated GA4, CSP allowances, footer access, and a 33-URL sitemap; lint/build/audit and local pre-consent/decline checks pass | Deploy, verify production behavior, then confirm one page view in GA4 Realtime |
| 2026-08-20 | GA4 retention review | Property settings show 2-month event-data retention, 14-month user-data retention, and reset-on-new-user-activity enabled | Keep the privacy disclosure aligned with future account-setting changes |
| 2026-08-20 | Production privacy/analytics verification | Live `/privacy`, 33-URL sitemap, CSP, first-visit banner, persistent decline, preference reopening, one GA loader after opt-in, and GA4 Realtime receipt all verified | Add and validate high-signal conversion events without collecting contact values |
| 2026-08-20 | Bing sitemap submission | `https://ifham.dev/sitemap.xml` accepted; one known sitemap, zero errors/warnings, status `Processing` | Recheck discovered URLs and crawl/indexing reports after processing |
| 2026-08-20 | Search Console privacy inspection | `/privacy` is live but currently unknown to Google, with no crawl or referring sitemap yet | Let the submitted sitemap drive discovery and monitor; do not spend a priority request on a policy page |
| 2026-08-20 | Qualified analytics event implementation | Seven consent-dependent events added with a classifier that strips contact values, query strings, and arbitrary outbound URLs; lint, classifier audit, build, and 33-page SEO audit pass | Deploy and verify event names/parameters before choosing any GA4 key event |
| 2026-08-20 | Qualified-event production verification | GA4 Realtime received six qualified event types; `article_to_expertise` failed because client navigation changed `window.location.pathname` before the bubbling listener classified the link | Deploy the capture-phase listener fix and retest the remaining event |
| 2026-08-20 | GA4 key-event configuration | Created `contact_intent` from the existing code event and marked it as the sole key event with no monetary default and once-per-event counting; GA4 reported success and now shows it starred in the Key events table | Verify a fresh contact action appears in Realtime as a key event after propagation |
| 2026-08-20 | Bing sitemap processing check | Sitemap status is `Success` with 33 discovered URLs, zero errors, and zero warnings | Review Bing indexing and crawl reports |
| 2026-08-20 | Analytics navigation hotfix | Qualified-link tracking now listens in the capture phase so Next.js cannot replace the source path before classification; lint, production build, and 33-page SEO audit pass | Released in `204149e`; verify `article_to_expertise` in production |
| 2026-08-20 | Bing homepage inspection | Homepage is indexed; its 2026-08-16 indexed copy showed three issues, while today's live test is indexable and has cleared the duplicate-canonical notice; Site Explorer has no processed inventory yet | Deploy the 156-character description fix; retain the accessibility-correct decorative empty alt; rerun the live test after Bing processes more data |
| 2026-08-20 | Final qualified-event verification | Production commit `204149e` uses capture-phase link tracking, and GA4 Realtime received `article_to_expertise` from a fresh-browser article-to-expertise navigation | All seven event types are verified; confirm a future contact action is counted as a key event after GA4 propagation |
| 2026-08-20 | Published description verification | Production commit `7c79480` serves the 156-character homepage description; Bing's live test now reports only the intentional decorative-image alt notice | Let Bing recrawl the indexed copy and retain the accessibility-correct empty alt |
| 2026-08-20 | Search performance baseline | Saved exact 3-month and available 16-month query/page/country/device metrics; all 21 clicks land on the homepage, and visible non-brand evidence centers on TypeScript clean-code queries | Review `/blog/typescript-best-practices` as the first evidence-led content opportunity |
| 2026-08-20 | TypeScript content refresh | Expanded the article from a short seed to a seven-minute guide covering strict compiler settings, runtime validation, discriminated unions, explicit errors, DTO boundaries, exhaustiveness, escape hatches, and domain primitives; linked Prompt Copilot, DynaPOS, full-stack expertise, and primary TypeScript docs | Deploy, verify production output, then inspect/request recrawl once |
| 2026-08-20 | Published TypeScript refresh | Production commit `32b8ac7` returns 200 and exposes the refreshed content, metadata, `dateModified`, reading time, and all intended contextual links | Inspect the stored Google index state and validate live structured data |
| 2026-08-20 | TypeScript URL inspection and Rich Results test | Search Console still shows `Crawled - currently not indexed` from 2026-04-05; Google's live test crawled successfully and detected valid Article and Breadcrumb items, plus six non-critical Article warnings | Deploy the shared zoned-date and complete-Person fix, retest, then request one recrawl with explicit confirmation |
| 2026-08-20 | Representative structured-data retest | Production `6ec0376` cleared all six TypeScript Article warnings; Schema.org returned zero errors/warnings for homepage, article, project, and research representatives; Google found valid Breadcrumbs on DynaPOS and valid Article/Breadcrumb data on Enigmatrix | Deploy the one-field Enigmatrix Article image fix, confirm its optional warning clears, then close representative validation |
| 2026-08-20 | Structured-data validation closure | Production `7d7830b` supplies the Enigmatrix Article image; Google's fresh crawl reports valid Article and Breadcrumb items with no warning badge | Request one recrawl for the substantively refreshed TypeScript article after explicit action-time confirmation |
| 2026-08-20 | TypeScript priority recrawl request | Search Console confirmed `Indexing requested` and added the refreshed article to the priority crawl queue once | Monitor the request and aggregate coverage; do not submit duplicates |
| 2026-08-20 | Post-request monitoring pass | GA4 Realtime has no genuine `contact_intent` key event; `/privacy` remains unknown to Google; Bing Site Explorer remains empty; Google's Pages report is still dated 2026-08-17 with 2 indexed and 4 not indexed | Leave these data-dependent checks open and continue with the next actionable account task |
| 2026-08-20 | Search Console/GA4 link review | No link exists; the only eligible pairing is `ifham.dev` Domain → `form` web stream (`G-HGESN3BVG1`), and the wizard discloses bidirectional data flow plus authorized-user/email visibility | Submit only after explicit action-time confirmation, then verify the created link row |
| 2026-08-20 | Search Console/GA4 link creation | GA4 confirmed `Link created successfully`; the link table shows `ifham.dev` Domain, web stream `form`, stream ID `4099190608`, and link date 2026-08-20 | Allow product reports to populate and keep access/privacy disclosures aligned with future account changes |
| 2026-08-20 | Measured Next.js content refresh | Replaced a thin generic tips page with a first-hand 1,447-word LCP case study; preserved the exact diagnostic, staged patches, three-run ranges/medians, deployment constraints, and field-data caveats; lint/build/33-page audit pass | Deploy, verify production Article/Breadcrumb output and links, then inspect the stored Google copy |
| 2026-08-20 | Published Next.js LCP case study | Production `de4afde` returns 200 with the new seven-minute article, metadata, `dateModified`, 1,447-word Article data, and intended internal links; Google's live test reports valid Article and Breadcrumb items | Submit one indexing request after explicit confirmation because the stored URL is discovered but has never been crawled |
| 2026-08-20 | Next.js case-study priority recrawl request | Search Console confirmed `Indexing requested` and added the substantively refreshed article to its priority crawl queue once | Monitor the request and aggregate coverage; do not submit duplicates |
| 2026-08-20 | React testing content and DynaPOS evidence audit | Replaced a thin generic article with a source-grounded, boundary-first eight-minute guide; corrected unsupported DynaPOS role, production, and automation claims; added reciprocal cluster links with same-tab internal navigation; lint/build/visual checks and the 33-page audit pass | Deploy the six tracked content/data/type/component/tracker files, verify both live pages and structured data, then inspect the article's stored Google state |
| 2026-08-20 | Published React testing and DynaPOS evidence release | Production `280eb37` serves both updated pages and reciprocal links; Google's fresh live tests report valid Article/Breadcrumb data for the React guide and a valid Breadcrumb item for DynaPOS; stored Search Console states are unknown-to-Google and discovered-not-indexed respectively | Submit one priority request for each URL only after explicit confirmation, then monitor without duplicates |
| 2026-08-21 | React testing and DynaPOS priority requests | Search Console tested each live URL, confirmed `Indexing requested` twice, and added each URL to the priority crawl queue exactly once | Monitor URL Inspection and aggregate coverage; do not submit duplicates |
| 2026-08-21 | Requested Phase 1/2/4/5 closure | Search Console confirms the homepage's matching selected canonical after a fresh crawl; Bing Site Explorer remains empty; GA4's filter has no IP rule, so the owner browser was excluded through persistent decline; all `sameAs` profiles resolve correctly | Keep Google/Bing data-dependent reports open and deploy the local QA release |
| 2026-08-21 | Heading, image, preview, and production QA | Fixed the two rendered heading skips; removed unused stock-media references; added route-specific expertise/project/research social images and permanent heading/image/OG build gates; current production passed 33 pages and 54 same-origin resources | Deploy, verify new image URLs and redirect behavior, then send the first safeguarded IndexNow notification |
| 2026-08-21 | Public brand/entity result baseline | The sampled exact-name and exact-domain public searches returned the owned homepage first; the domain sample also exposed the TypeScript article | Recheck quarterly and align public profile biographies, canonical website links, and featured work during Phase 10 |
| 2026-08-21 | Deployed Phase 1/2/4/5 production gate | The canonical crawl passed 33 pages and 54 same-origin resources; Netlify retained its HTTP-www HTTPS-upgrade hop; IndexNow accepted all 33 URLs with HTTP 202 | Deploy the social-image MIME follow-up, rerun the stricter crawl, and complete representative preview-debugger checks |
| 2026-08-21 | Social-image response audit | All expected route-specific images return 200 with PNG bytes, but Netlify labels every extensionless image `text/plain`; added explicit MIME/cache headers for all route depths and made production validation fail on non-image content types | Deploy and verify all 33 unique social-image responses report an `image/*` content type |

## Change log

- **2026-08-20:** Created the master tracker from the complete SEO roadmap and implementation audit.
- **2026-08-20:** Recorded local completion of canonical, sitemap, robots, metadata, structured-data, expertise-architecture, internal-link, accessibility, image, and automated-audit work.
- **2026-08-20:** Kept deployment, Search Console, analytics, Bing, content, authority, and recurring ranking tasks open until their acceptance evidence exists.
- **2026-08-20:** Closed the production release/crawl gates after verifying the live 32-page inventory and recorded the remaining `http www` redirect hop.
- **2026-08-20:** Recorded mobile and desktop Lighthouse results and removed the production LCP element's entrance delay for the next deployment.
- **2026-08-20:** Recorded the live Search Console performance, indexing, sitemap, link, manual-action, and security baselines without changing the account.
- **2026-08-20:** Resubmitted the full production sitemap to Search Console and verified `Success` with all 32 pages discovered.
- **2026-08-20:** Inspected the homepage, eight architecture pages, and three older excluded pages; recorded their current Google index states.
- **2026-08-20:** Verified the first LCP patch in production, recorded a three-run median, and removed the remaining hero entrance animations for the next deployment.
- **2026-08-20:** Submitted all five expertise URLs to Google's priority crawl queue and verified each reports `Indexing requested`.
- **2026-08-20:** Located the existing GA4 property and confirmed the site is currently untagged; recorded consent/privacy as a required decision before data collection.
- **2026-08-20:** Verified Bing Webmaster access and recorded that GSC import is ready but requires account-permission confirmation.
- **2026-08-20:** Verified the full hero-animation removal in production and closed its three-run release check; TBT improved materially and field monitoring is now the next performance step.
- **2026-08-20:** Verified the owner-completed Bing GSC import; the property is processing, but the sitemap list remains empty and needs a separate submission.
- **2026-08-20:** Implemented and locally validated privacy-first GA4 consent, the privacy page, preference controls, scoped CSP allowances, and the expanded 33-page sitemap; deployment and production GA verification remain open.
- **2026-08-20:** Matched the privacy disclosure to the current GA4 data-retention settings instead of relying on platform defaults.
- **2026-08-20:** Verified the owner-deployed privacy/analytics release end to end and confirmed consented collection in GA4 Realtime.
- **2026-08-20:** Submitted the production sitemap to Bing and recorded its accepted, processing state with zero errors or warnings.
- **2026-08-20:** Inspected the new privacy URL in Search Console and chose sitemap-led discovery instead of a low-value manual indexing request.
- **2026-08-20:** Added privacy-safe qualified-link event classification for contact, profile, repository, project, article, résumé, and article-to-expertise actions; production validation remains gated on deployment.
- **2026-08-20:** Verified six qualified-link event types in GA4 Realtime, configured `contact_intent` as the sole key event, and recorded Bing sitemap success with all 33 URLs discovered.
- **2026-08-20:** Fixed and released the production-discovered `article_to_expertise` navigation race in `204149e`; a fresh production test reached GA4 Realtime, closing verification of all seven qualified events.
- **2026-08-20:** Confirmed Bing has indexed the homepage and reduced its default meta description from 186 to 156 characters; the live empty-alt notice is an intentional decorative-image pattern and is not treated as an accessibility defect.
- **2026-08-20:** Verified production commit `7c79480`; Bing's live homepage test cleared the description and duplicate-canonical issues.
- **2026-08-20:** Saved the dated 3-month/16-month Search Console baseline and selected the TypeScript best-practices article for evidence-led review based on the first visible non-brand query data.
- **2026-08-20:** Completed the first data-led content refresh by turning `/blog/typescript-best-practices` into a substantive, first-hand seven-minute guide; lint, build, rendered-page review, and the 33-page SEO audit pass.
- **2026-08-20:** Verified the refreshed guide in production at `32b8ac7`, recorded its stale April `Crawled - currently not indexed` state, and implemented a shared local fix for the six optional Article warnings discovered by Google's live Rich Results Test; lint, build, TypeScript, and the 33-page SEO audit pass.
- **2026-08-20:** Verified structured-data release `6ec0376`; the TypeScript Rich Results result is now warning-free and all four representative Schema.org tests report zero errors/warnings. Added the production social image to Enigmatrix JSON-LD after Google's representative test found the final optional `image` warning.
- **2026-08-20:** Verified release `7d7830b` and closed representative structured-data validation after Google's Enigmatrix retest returned warning-free Article and Breadcrumb items.
- **2026-08-20:** Submitted one approved Search Console indexing request for the refreshed TypeScript guide and recorded Google's priority-crawl-queue confirmation.
- **2026-08-20:** Rechecked the next data-dependent tasks without fabricating analytics activity or duplicate crawl requests, then prepared the exact Search Console/GA4 pairing and documented its data-sharing consequences before submission.
- **2026-08-20:** Created and verified the approved Search Console/GA4 product link for `ifham.dev` and stream `4099190608`, closing the account-integration task.
- **2026-08-20:** Completed the next evidence-led content refresh by turning `/blog/nextjs-performance-tips` into a measured seven-minute production LCP case study grounded in the site's actual Lighthouse runs and hero patches.
- **2026-08-20:** Verified Next.js case-study release `de4afde`, closed its production and structured-data checks, and recorded Google's uncrawled `Discovered – currently not indexed` state for one approved priority request.
- **2026-08-20:** Submitted one approved Search Console indexing request for the refreshed Next.js LCP case study and recorded Google's priority-crawl-queue confirmation.
- **2026-08-20:** Completed the source-grounded React testing refresh, corrected contradictory DynaPOS evidence claims, added reciprocal testing-cluster links, and passed lint, build, rendered-page review, visual QA, and the 33-page SEO audit; production verification remains gated on deployment.
- **2026-08-20:** Verified production release `280eb37`, closed both live-page and structured-data gates, and recorded the React article's unknown-to-Google state plus DynaPOS's discovered-not-indexed state for two action-time-confirmed priority requests.
- **2026-08-21:** Submitted the two approved Search Console indexing requests for `/blog/testing-react-apps` and `/projects/dynapos`, verified Google's priority-queue confirmation for each, and removed both actions from the execution queue.
- **2026-08-21:** Closed every currently actionable Phase 1/2/4/5 item: verified the homepage canonical and identity profiles, excluded the owner browser from analytics, repaired heading hierarchy, removed unused stock media, added missing social-preview routes, implemented stronger local/production audits, and prepared a safe IndexNow workflow. Only deployment and genuinely data-dependent account reports remain open.
- **2026-08-21:** Added the public brand/entity search snapshot to the dated baseline and closed the final directly measurable Phase 1 account item; query/page market tracking remains correctly gated on an approved Phase 3 query map and sufficient Search Console data.
- **2026-08-21:** Verified the deployed release, documented Netlify's unavoidable HTTP-www upgrade chain, and completed the first 33-URL IndexNow submission with HTTP 202 acceptance.
- **2026-08-21:** Found a live MIME defect across all extensionless generated Open Graph images, added exact Netlify PNG header rules plus a permanent production content-type gate, and kept the social-preview release task open for one follow-up deployment.
