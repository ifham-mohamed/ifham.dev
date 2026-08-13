import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const samwoostore: Project = {
    id: "samwoostore",
    title: "Samwoostore - E-Commerce Platform",
    href: "https://samwoohub.lk",
    dates: "Oct 2025 - Jan 2026", // TODO(verify): exact end; migrations run into Jan 2026
    active: true,
    visual: "schema",
    signals: ["App Router RSC", "Prisma index migrations", "RBAC"],
    featured: true,
    role: "Solo Full-Stack Developer — Client (Samwoo)",
    context:
      "Solo full-stack developer for the client Samwoo (org Darts-Ecommerce) — owned product scoping, schema, frontend, API, auth, storage, observability, Docker packaging, GitHub Actions CI/CD, and the VPS deployment (plan → design → develop → containerise → deploy → operate). Models six customer segments (end user, wholesaler, reseller, installer, projects, company). Live at samwoohub.lk.",
    oneLiner:
      "A production-grade Next.js 15 e-commerce platform for Samwoo with a role-based admin dashboard, Google Cloud Storage-backed media, and a Dockerised CI/CD pipeline that ships every push to a self-managed Nginx VPS.",
    description:
      "Solo full-stack Next.js 15 storefront + back-office for client Samwoo: six customer segments, non-piece units (meter/box/drum), GCS media with 1-year immutable caching, Winston audit logging, and a Dockerised GHCR -> VPS pipeline with health-polled deploys.",
    overview:
      "Samwoostore (internally Samwoohub) replaces ad-hoc order taking with one owned storefront + operations console for Samwoo, an industrial-supplies seller. It models six customer segments and non-piece units of sale, serves media from Google Cloud Storage with long-lived caching, audits every API action via Winston, and ships every push through a Dockerised GitHub Actions pipeline (GHCR image → SSH to a self-managed Nginx VPS, health-verified) — built and operated end to end by one developer.",
    problem:
      "Samwoo needed a single owned storefront + ops console to replace ad-hoc order taking: a catalogue large enough to need search, filtering, pagination and stock states; multiple customer segments (end users, wholesalers, resellers, installers, project buyers, companies) that a generic Shopify-style template doesn't model; non-piece units of sale (pieces, meter, box, drum) for industrial SKUs; and a repeatable deploy story so the owner could push changes without manual SSH steps.", // TODO(verify): add a pre-project baseline (orders previously via phone/WhatsApp, hours/week on manual stock)
    flow: {
      diagram: `flowchart LR
  A["Customer Browser"] --> B["Nginx (TLS 443)"]
  B --> C["Next.js App Router (standalone, :3001)"]
  C --> D["Route Handlers /api/*"]
  D --> E["Zod Validation"]
  E --> F["NextAuth Session + RBAC Middleware"]
  F --> G["Prisma Client"]
  G --> H[("PostgreSQL")]
  D --> I["GCS Bucket (samwoostore)"]
  D --> J["Resend Email API"]
  D --> K["Winston Logs (app/audit/perf/error)"]
  L["git push (main/develop)"] --> M["GHA: docker-build-push"]
  M --> N["GHCR Image"]
  N --> O["GHA: deploy-after-build (SSH)"]
  O --> P["VPS docker compose pull + up"]
  P --> C
  O --> Q["Health Poll /api/health"]
  Q --> R["Slack Notify"]`,
      caption:
        "Storefront behind Nginx/TLS over a Zod-validated, RBAC-guarded Next.js API on Prisma/Postgres, with GCS media and Winston audit logs; every push builds a GHCR image and deploys to the VPS with a health poll + Slack notify.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Prisma",
      "PostgreSQL",
      "NextAuth.js",
      "Google Cloud Storage",
      "Resend",
      "Winston",
      "Docker",
      "GitHub Actions",
      "GHCR",
      "Nginx",
    ],
    bestPractices: [
      "Feature-modular architecture: src/features/<domain>/{api,components,hooks,services,validators,types} keeps domains self-contained",
      "Role-based access control at the edge: middleware checks the NextAuth JWT role before the route renders, not after",
      "Schema-validated boundaries: Zod on every API input and React Hook Form on every UI form, with shared type inference",
      "Indexed for the queries actually used: a dedicated migration adds indexes on Product status/slug/category/subcategory to avoid sequential scans",
      "Immutable, cacheable media: GCS objects served with Cache-Control max-age=31536000 and next/image AVIF/WebP across responsive widths",
      "Deploy with verification, not hope: the deploy workflow polls /api/health 15x before reporting success and Slack-notifies on both paths",
    ],
    challenges: [
      {
        challenge:
          "Modelling industrial SKUs that ship in non-piece units (meter, box, drum) without forking storefront templates that assume integer quantities.",
        resolution:
          "Added a ProductUnit enum (PIECES | METER | BOX | DRUM) via a dedicated migration and threaded it through product display, cart line items, and the jsPDF receipt — so the unit travels with the price instead of being inferred from the product name.",
      },
      {
        challenge:
          "First-pass schema used string IDs, making joins, indexing and admin-side filtering slower than acceptable as the catalogue grew.",
        resolution:
          "Migrated primary keys to Int, then added performance indexes on the catalogue's hot paths (status, slug, category, subcategory) and composite uniques (userId, productId) on Cart/Wishlist for idempotent add-to-cart.",
      },
      {
        challenge:
          "Self-hosted VPS deploys intermittently failed because GHCR image pulls timed out before the container was healthy, with no visibility into which step failed.",
        resolution:
          "Hardened the deploy workflow with a 5x retry on docker compose pull, a 15-attempt x 5s health-poll against /api/health, and a Slack notification on both success and failure — so a bad deploy fails loudly instead of leaving stale containers running.",
      },
    ],
    evidence: [
      { value: "5", label: "Production migrations", detail: "Including a performance-index pass" },
      { value: "3 x 6", label: "Roles x segments", detail: "RBAC enforced in middleware" },
      { value: "4", label: "Winston log streams", detail: "App, audit, performance, error" },
      { value: "1 year", label: "Immutable image cache", detail: "next/image + GCS, AVIF/WebP" },
    ],
    outcomes: [
      "Shipped a single-codebase storefront + admin + API + observability + CI/CD pipeline solo",
      "Image pipeline: next/image + GCS with 1-year immutable caching (max-age=31536000) and responsive widths up to 3840px, AVIF/WebP automatic",
      "Deployment automation: push to main/develop -> image built/tagged (branch + SHA + latest) -> GHCR -> SSH-deployed to VPS -> health-verified (15x poll) -> Slack-notified, with zero manual SSH steps",
      "Schema maturity: 5 production migrations including a performance-index pass and a hot-path ID type conversion; RBAC of 3 roles x 6 customer segments enforced in middleware",
      "Hardened auth (bcrypt, 30-day JWT, single-use 32-byte 1-hour reset tokens) and 4 Winston log streams (app/audit/performance/error) with rotation",
      // TODO(verify): production URL + go-live date, Lighthouse scores, median deploy duration, catalogue size, orders/GMV, manual-handling time saved
    ],
    conceptsLearned: [
      "Next.js 15 App Router (Server/Client Component split)",
      "Standalone Next.js output for minimal Docker images",
      "Prisma schema design + performance-index migrations on PostgreSQL",
      "NextAuth.js JWT sessions with RBAC",
      "Redux Toolkit + RTK Query cache invalidation",
      "Zod schema validation at API boundaries",
      "Google Cloud Storage with long-lived CDN-style caching",
      "Multi-stage Docker builds for production Node images",
      "GitHub Actions CI/CD with GHCR",
      "SSH rollout with health-poll verification",
      "Nginx reverse proxy + Let's Encrypt TLS",
      "Structured logging & audit trails with Winston (rotation)",
      "bcrypt hashing + one-time cryptographic reset tokens",
      "Feature-modular frontend architecture (vertical slicing)",
    ],
    links: [
      {
        type: "Website",
        href: "https://samwoohub.lk",
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: "Source",
        href: "https://github.com/Darts-Ecommerce/samwoostore", // TODO(verify): confirm repo visibility (public vs private)
        icon: <Icons.github className="size-3" />,
      },
    ],
    // image: "/images/projects/samwoostore.png",  <- restore once the file exists in public/images/projects/
    image: "",
  };
