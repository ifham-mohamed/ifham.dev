# ifham.dev SEO operating plan

Updated: 2026-08-20

> Execution status: [SEO master task tracker](./seo-task-tracker.md). This roadmap explains the strategy; the tracker owns task status, evidence, and review history.

## Objective

Build durable global visibility for a defined set of queries that match Ifham Mohamed's demonstrated engineering work. A permanent global number-one position cannot be guaranteed: results vary by query, location, device, intent, competition, and algorithm changes. The working goal is to win specific query/page pairs, expand topical authority, and measure qualified visits and contact actions.

## Baseline found in this sprint

- The public search snapshot surfaced the homepage and the TypeScript article, but not the broader project corpus.
- The production export contained 29 HTML pages before this sprint.
- Every nested page emitted both its self-referencing canonical and a second canonical to the homepage.
- The hand-maintained sitemap listed 11 URLs and omitted all 15 project case studies.
- HTTP, HTTPS, hostname, trailing-slash, and missing-page behavior was sound: HTTP and `www` redirect to canonical HTTPS, trailing slashes normalize, and unknown URLs return 404.
- Search Console verification metadata is present. Search Console reports and account state still need to be checked by the property owner.
- PageSpeed Insights API measurement was rate-limited during the audit; use Search Console field data and a repeatable Lighthouse run for the performance baseline.

## Search architecture and intent map

Each destination owns one primary intent. Do not make the homepage compete with these pages by rewriting it as a keyword list.

| URL | Primary intent | Supporting intent |
| --- | --- | --- |
| `/` | Ifham Mohamed, software engineer | full-stack engineering portfolio |
| `/full-stack-developer` | full-stack developer for production web apps | React, APIs, databases, deployment |
| `/nextjs-developer` | Next.js developer | App Router, performance, PostgreSQL, authentication |
| `/react-developer` | React developer | typed state, testing, design systems, React Native |
| `/saas-development` | SaaS development | multi-tenant architecture, RBAC, migrations |
| `/ecommerce-development` | e-commerce development | catalogues, inventory, orders, media, operations |
| `/projects` | software engineering projects and case studies | proof of work |
| `/blog` | software engineering blog | technical knowledge hub |
| `/research` | applied software engineering research | regulatory intelligence, multilingual NLP |

Project and article pages support these destinations. Expertise pages link to relevant evidence; evidence pages link back to the expertise intent. Add a new page only when it has a distinct intent and enough first-hand evidence to be useful on its own.

## Technical work completed

- Removed the root-layout canonical that conflicted with every nested page.
- Added exactly one absolute, self-referencing canonical to every indexable page.
- Replaced static robots and sitemap files with Next.js 16 static metadata routes.
- Generated the sitemap from the real expertise, project, article, and research collections.
- Included exact `lastmod` dates only where source content records a publication or update date.
- Removed unsupported hand-maintained crawl-delay behavior.
- Added five evidence-backed expertise pages and linked them from the homepage.
- Linked relevant projects and articles back to expertise destinations.
- Added route-specific project and article social preview images.
- Consolidated default metadata so the root layout and SEO config cannot drift.
- Added `WebSite`, `ProfilePage`, `Person`, `Blog`, `BlogPosting`, `CollectionPage`, `CreativeWork`, `ScholarlyArticle`, and `BreadcrumbList` JSON-LD where each type matches visible content.
- Added a build-time SEO audit for titles, descriptions, H1s, canonicals, JSON-LD syntax, sitemap coverage, robots linkage, and broken internal links.

Run the same production gate locally with:

```bash
pnpm build
```

## Measurement setup requiring account access

### Google Search Console

1. Open the verified domain property for `ifham.dev`.
2. Submit `https://ifham.dev/sitemap.xml`.
3. Inspect `/`, all five expertise pages, `/projects`, the strongest three case studies, `/blog`, and the strongest three articles.
4. Confirm the user-declared canonical and Google-selected canonical agree.
5. Export the last 16 months of page/query data before changing titles again.
6. Record indexing reasons for excluded URLs, especially “Crawled - currently not indexed” and “Duplicate, Google chose different canonical.”
7. Request indexing for the homepage and expertise pages after the new deployment; do not repeatedly request unchanged URLs.

### Analytics

Choose one analytics system and confirm it records organic landing pages without collecting unnecessary personal data. At minimum track:

- contact-section visits;
- email, LinkedIn, phone, and résumé actions;
- project case-study opens;
- expertise-to-project and article-to-expertise navigation;
- organic conversions by landing page.

### Bing Webmaster Tools

Verify the site, submit the same sitemap, and import the Search Console property if appropriate. Bing data is a useful independent crawl and query signal even when Google is the primary target.

## Content program

Publish fewer, stronger resources. Every article should include first-hand evidence such as a repository, architecture diagram, test result, query plan, migration, failure mode, or before/after measurement.

### Priority 1: deepen existing winners

1. Expand `typescript-best-practices` with strict-mode configuration, `unknown` at boundaries, discriminated unions, `satisfies`, and examples drawn from current projects.
2. Rework `nextjs-performance-tips` around measured examples from Total Supply or Samwoostore; record device, tool version, before, after, and the exact change.
3. Expand `testing-react-apps` with a test-pyramid decision table and a real critical-path example.
4. Expand `api-design-principles` with idempotency, pagination, validation errors, authentication boundaries, and versioning tied to a case study.

### Priority 2: publish linked clusters

| Cluster | First resource | Evidence source |
| --- | --- | --- |
| Next.js | App Router architecture for a multi-role product | Total Supply or DynaPOS |
| TypeScript | Modelling API success and failure without `any` | Prompt Copilot or Attendify |
| PostgreSQL | Tenant-safe schemas and query scoping | DynaPOS |
| PostgreSQL | Safe forward migrations and production backfills | DynaPOS migration history |
| SaaS | Multi-tenant RBAC: UI gates are not authorization | DynaPOS / Total Supply |
| SaaS | Idempotent webhooks and retry-safe writes | DynaPOS / Attendify |
| E-commerce | Inventory movements, precision, and auditability | DynaPOS |
| E-commerce | Image delivery and catalogue performance | Samwoostore |

Each new article must link to one expertise page and at least one relevant case study. The expertise page and case study should link back when the article is published.

### Publication quality gate

- One search intent and one clear H1.
- A specific title and description that accurately summarize the page.
- An original introduction that answers the query before background detail.
- Reproducible examples or clearly labelled constraints.
- A diagram, code sample, benchmark, or project evidence when it materially improves understanding.
- Descriptive internal anchors, not “click here.”
- A real `updatedAt` only after a meaningful content update.
- No invented experience, metrics, client outcomes, or publication dates.

## Authority program

Technical SEO makes pages eligible; independent references make competitive rankings plausible.

1. Make the GitHub profile name, role, avatar, and `ifham.dev` URL consistent.
2. Add the matching `ifham.dev/projects/...` case-study URL to every public repository README and repository homepage field.
3. Link each public case study back to the exact repository, not an organization profile, after verifying visibility.
4. Turn one project lesson into a reusable open-source resource: a package, benchmark, migration example, test fixture, checklist, or reference implementation.
5. Publish the methodology and limitations so others can cite the resource.
6. Contribute useful fixes and documentation to relevant external projects; never trade or buy links.
7. Pitch original technical work to reputable engineering publications, community newsletters, university pages, meetups, podcasts, and conference programs.
8. Track referring domains and the exact destination receiving each link.

## Review cadence

### Weekly

- Check indexing and sitemap processing.
- Export query/page pairs and group average positions into 1-3, 4-10, 11-20, 21-50, and 50+.
- Prioritize position 4-20 pages with meaningful impressions.
- Investigate high impressions with weak CTR before changing content.
- Record changes in a simple changelog so ranking movement has context.

### Monthly

- Review organic conversions, not only clicks.
- Compare search intent with the current top results for the target query.
- Refresh or consolidate weak overlapping content.
- Validate rich results and inspect structured-data warnings.
- Review Core Web Vitals by page group and device.
- Review new referring domains and unlinked brand mentions.

### Quarterly

- Re-score target queries by business relevance, attainability, evidence depth, and authority required.
- Retire pages with no distinct intent or evidence; redirect only when a genuine replacement exists.
- Choose the next original resource or experiment capable of earning citations.

## Success criteria

The next milestone is not a generic “SEO score 100.” It is:

- all 32 current canonical pages discovered through the sitemap and internal links;
- no important URL excluded because of conflicting canonicalization;
- brand/name queries dominated by the correct Ifham Mohamed entity;
- initial impressions for the five expertise destinations;
- movement of relevant query/page pairs into positions 4-20 and then 1-10;
- growing non-brand traffic to technical articles;
- qualified contact actions and independent referring domains increasing over time.
