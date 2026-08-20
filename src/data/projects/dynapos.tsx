import type { Project } from "@/types";

export const dynapos: Project = {
    id: "dynapos",
    title: "DynaPOS - Multi-Tenant SaaS POS Platform",
    href: "",
    dates: "Apr 2026 - Jul 2026",
    active: false,
    featured: true,
    visual: "topology",
    signals: ["QA automation", "Multi-tenant SaaS", "SHA-pinned delivery"],
    projectType: "Team Project",
    role: "QA Automation & Deployment Engineer / Major Contributor",
    context:
      "Major contributor in a two-author repository. Git history supports ownership of the large Cucumber/Playwright/Serenity test and documentation import, automation fixes, standalone Docker packaging, production configuration, and the GitHub Actions/GHCR/VPS deployment path. The core application, Prisma domain model, FIFO/WAC implementation, and PayHere work originated primarily in the other contributor's commits.",
    oneLiner:
      "A multi-tenant point-of-sale codebase for nine retail and service business types, with scoped roles, FIFO/WAC inventory, local billing, a large BDD specification catalogue, and a SHA-pinned self-hosted delivery path.",
    description:
      "Source-audited Next.js/React POS codebase with 42 Prisma models, 22 migrations, 86 API route files, 192 Cucumber feature files, and 38 of 2,117 declared scenarios tagged implemented.",
    overview:
      "DynaPOS is a broad multi-tenant POS codebase for nine configurable business types. The source models companies, businesses, branches, five-role permissions, FIFO/WAC stock layers, decimal units, tiered pricing, transfers, returns, PayHere subscriptions, and cash-to-bank operations. My source-supported contribution centers on QA automation, test documentation, container packaging, and deployment—not ownership of the original domain architecture. The current repository contains 2,117 declared Cucumber scenarios, of which 38 are tagged implemented; no fresh green result was available during the audit.",
    problem:
      "The engineering target was to reuse one tenant and accounting core across very different businesses without flattening their workflows. The quality challenge was equally large: 192 feature files documented 2,117 scenarios, but specifications, implemented automation, and verified execution had to remain separate evidence states.",
    flow: {
      diagram: `flowchart LR
  U["Cashier / Merchant"] --> MW["Auth.js page gates"]
  MW --> RH["Next.js App Router (RSC + Server Actions)"]
  RH --> TG["lib/tenant.ts (request-cached context)"]
  TG --> ZV["Zod validation"]
  ZV --> RB["RBAC: requirePermission()"]
  RB --> TX["prisma.$transaction"]
  TX --> SL["FIFO/WAC: stock-layers.ts"]
  TX --> PR["Pricing resolver"]
  TX --> PG[("PostgreSQL 16")]
  PG --> SLAY["StockLayer + SaleItemConsumption"]
  PG --> CASH["CashDrawer + BankLedgerEntry"]
  PH["PayHere Hosted Checkout"] --> WH["/api/billing/webhook"]
  WH --> SIG["MD5 signature verify"]
  SIG --> IDM["Idempotency: lastPaymentId"]
  IDM --> PG
  CI["GitHub Actions"] --> DB["Ephemeral PostgreSQL 16"]
  DB --> APP["Build and start application"]
  APP --> BDD["38 @implemented Cucumber scenarios"]
  BDD --> REP["Serenity report artifact"]
  DEP["SHA-tagged GHCR image"] --> VPS["Docker Compose VPS rollout"]`,
      caption:
        "The application combines authenticated Next.js request handling with tenant/RBAC checks and transactional inventory. The delivery path provisions PostgreSQL for the implemented BDD slice and promotes SHA-tagged container images to a VPS.",
    },
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Prisma",
      "PostgreSQL",
      "Auth.js (NextAuth v5)",
      "TanStack Query",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
      "PayHere",
      "Cloudinary",
      "Playwright",
      "Cucumber.js",
      "GitHub Actions",
      "Docker",
      "GHCR",
      "Serenity/JS",
    ],
    bestPractices: [
      "Traceability is explicit: 192 Cucumber files preserve the wider specification catalogue while @implemented and @todo tags distinguish executable work from pending coverage",
      "The implemented browser/API slice uses Cucumber.js, Serenity/JS, Playwright, actor-scoped notes, seeded fixtures, and an environment-driven base URL",
      "CI provisions PostgreSQL 16, migrates and seeds the database, builds and starts the app, runs only @implemented scenarios, and uploads the Serenity report",
      "Deployment builds a standalone Next.js container, pushes commit-SHA tags to GHCR, and promotes the exact image over SSH instead of relying only on a floating latest tag",
      "Application source centralizes tenant context and role checks, uses transactions for stock/cash mutations, and snapshots inventory cost lineage for later audit",
    ],
    challenges: [
      {
        challenge:
          "A large generated QA catalogue made it easy to describe scenario volume as automated coverage even though most scenarios were still pending skeletons.",
        resolution:
          "Kept the catalogue traceable but separated execution status with @implemented and @todo tags. The source audit now reports 2,117 declared, 38 implemented, and 2,079 pending scenarios instead of presenting one inflated automation total.",
      },
      {
        challenge:
          "A self-hosted rollout needed reproducible promotion across CI, a container registry, and a remote Docker host.",
        resolution:
          "The delivery workflow tags the standalone image with the commit SHA, pushes it to GHCR, and deploys that exact tag over SSH. Current production availability and a successful run of the complete pipeline remain unverified and are not claimed.",
      },
    ],
    evidence: [
      { value: "2,117", label: "Declared scenarios", detail: "Across 192 Cucumber feature files" },
      { value: "38", label: "Implemented scenarios", detail: "The other 2,079 remain tagged pending" },
      { value: "86", label: "API route files", detail: "Source-audited Next.js application surface" },
      { value: "22", label: "Prisma migrations", detail: "Versioned schema history in the audited snapshot" },
    ],
    outcomes: [
      "The audited application source contains 42 Prisma models, 18 enums, 22 versioned migrations, 86 API route files, and 60 pages across nine configurable business types",
      "The QA catalogue contains 2,117 declared scenarios across 192 Cucumber feature files; 38 scenarios are tagged implemented and 2,079 are explicitly pending",
      "Ifham's largest contribution added or revised 244 files and more than 22,000 lines, predominantly the BDD framework, test documentation, setup, and CI workflow",
      "GitHub Actions is configured to provision ephemeral PostgreSQL, run the 38 implemented scenarios, and upload a Serenity report; a fresh green execution was not available in the audited checkout",
      "The deployment configuration builds a standalone image, promotes a commit-SHA tag through GHCR, and targets a Docker Compose VPS; current production operation is not claimed",
    ],
    conceptsLearned: [
      "Multi-tenant SaaS architecture with row-level tenant isolation",
      "RBAC with server- and UI-side enforcement",
      "FIFO and Weighted Average Cost (WAC) inventory accounting",
      "Stock-layer journals & per-sale cost snapshotting",
      "Decimal precision in financial software (UoM conversions)",
      "Tiered pricing & quantity-break resolution",
      "Webhook idempotency & MD5/HMAC signature verification",
      "Cash-drawer reconciliation & bank-ledger deposit batching",
      "Prisma schema evolution, versioned migrations & data backfills",
      "Next.js App Router, RSC & Server Actions",
      "BDD with Cucumber.js + Playwright + Serenity/JS",
      "Test evidence states: declared, implemented, pending, and verified",
      "CI with ephemeral PostgreSQL and report artifacts",
      "SHA-pinned container promotion through GHCR",
      "PostgreSQL partial unique indexes",
      "Auth.js v5 credentials flow with Edge/Node config split",
    ],
    links: [
      {
        type: "Testing Guide",
        href: "/blog/testing-react-apps",
        icon: null,
      },
    ],
    // Git remote is known, but public visibility and a live deployment are not verified.
    // image omitted intentionally — add public/images/projects/dynapos.png to enable the hero
  };
