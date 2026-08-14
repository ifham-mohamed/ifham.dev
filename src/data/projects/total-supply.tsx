import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const totalSupply: Project = {
    id: "total-supply",
    title: "Total Supply - Multi-Role Supply-Chain Platform",
    href: "https://total-supply.vercel.app",
    dates: "Nov 2025 - Jan 2026",
    active: false,
    visual: "topology",
    signals: ["RBAC with JWT claims", "OAuth 2.0 / OIDC", "Serverless Postgres"],
    featured: true,
    projectType: "Freelance",
    role: "Full Project Developer (Individual)",
    context:
      "Sole full-stack engineer on a freelance engagement for a Sri Lanka-based supply-chain business. Owned everything end to end: requirements (171 features / 100+ user stories / 8-week roadmap), the 14-model Prisma data layer, all 83 API route handlers, six role-specific dashboards, NextAuth with an admin-approval gate, a Nodemailer pipeline (25+ templates), the GCS upload path, a GDPR data-retention cron, the landing performance pass, and Vercel deployment.",
    oneLiner:
      "A multi-role supply-chain platform that lets customers order food and request cleaning or IT-support services, while six coordinated staff roles fulfil and track every job end-to-end through dedicated dashboards.",
    description:
      "Multi-role supply-chain platform (Next.js 16 + Prisma 7 + Neon) where customers order food and request cleaning/IT services and six staff roles fulfil them through dedicated dashboards — with edge-middleware RBAC, audit logging, GDPR data-retention, and direct-to-GCS uploads.",
    overview:
      "Total Supply unifies a Sri Lankan client's food orders and field services (cleaning, IT support) into one system. Customers order or request a service; six coordinated roles — admin, salesman, driver, cleaner, IT staff — fulfil and track each job through role-specific dashboards. Built on Next.js 16 with React Server Components, a Prisma 7 / Neon serverless-Postgres data layer, edge-middleware RBAC, an immutable audit log, a GDPR data-retention cron, and direct-to-GCS signed-URL uploads.",
    problem:
      "The client had no unified system: food orders were taken informally, cleaning and IT-support jobs were tracked off-platform, new-customer approvals and staff assignments were manual, and there was no audit trail or GDPR posture. The public landing page also shipped with a 3.2 s mobile Lighthouse Total Blocking Time, blocking first interaction on mid-tier devices.",
    flow: {
      diagram: `flowchart LR
  U["Customer / Staff / Admin"] --> NX["Next.js 16 App Router (RSC)"]
  NX --> MW["Edge Middleware (RBAC)"]
  MW --> API["API Route Handlers (Zod + guards)"]
  API --> AUTH["NextAuth.js v4 (JWT + Credentials + Google OIDC)"]
  API --> PR["Prisma 7 ORM"]
  PR --> NEON[("Neon Serverless Postgres (HTTP adapter)")]
  API --> MAIL["Nodemailer SMTP"]
  MAIL --> EMAIL["Transactional email + unsubscribe token"]
  API --> SIGN["GCS V4 signed upload URL"]
  SIGN --> GCS["Google Cloud Storage bucket"]
  NX --> CDN["next/image (AVIF/WebP)"]
  CDN --> GCS
  CRON["Vercel Cron (daily 02:00)"] --> RET["Data Retention Service"]
  RET --> PR
  RET --> AUD["AuditLog (anonymise 30d / purge 730d)"]`,
      caption:
        "One Next.js 16 codebase: edge-middleware RBAC in front of Zod-validated handlers, Prisma on Neon, Nodemailer + GCS side-effects, and a daily Vercel cron for GDPR retention.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "Neon (PostgreSQL)",
      "NextAuth.js",
      "Zod",
      "Chakra UI",
      "Tailwind CSS",
      "Google Cloud Storage",
      "Nodemailer",
      "Redux Toolkit",
      "Vercel",
    ],
    bestPractices: [
      "Defence-in-depth RBAC at three layers: role + status in the NextAuth JWT, enforced at the edge by middleware (strict path-prefix routing), then re-checked inside each route handler",
      "Audit logging on every privileged action (CREATE/UPDATE/DELETE/STATUS_CHANGE/LOGIN/LOGOUT) with actor, IP, user agent and JSON details, plus OrderStatusHistory at the order level",
      "Compliance-by-design: GDPR export, soft-delete grace window, 30-day anonymisation, 730-day hard purge, and unsubscribe tokens on marketing-eligible email",
      "Database-conscious queries: explicit Prisma select (no SELECT *), $transaction for multi-row mutations, capped pagination on every list endpoint, and indexes on every foreign key / filter column",
      "Direct-to-storage uploads via 15-minute V4 signed URLs, so binary traffic never touches the serverless functions",
      "Performance budget enforced in next.config.ts: optimizePackageImports tree-shaking, next/dynamic for below-the-fold sections and drawers, and route-scoped heavy CSS",
    ],
    challenges: [
      {
        challenge:
          "The landing page shipped with a 3.2 s mobile Lighthouse Total Blocking Time — a 200 KB Swagger stylesheet imported in the root layout (loaded on every route), eagerly-bundled Chakra/Radix/icon libraries, and synchronously-mounted cart and mobile-nav drawers.",
        resolution:
          "Scoped the Swagger CSS to /api-docs, expanded optimizePackageImports for finer tree-shaking, converted the cart and mobile-nav drawers to next/dynamic (ssr:false), and code-split below-the-fold landing sections — the production build passes with 100/100 static pages.", // TODO(verify): paste the measured 'after' TBT (the plan targeted <500 ms)
      },
      {
        challenge:
          "Coordinating six roles (CUSTOMER, ADMIN, SALESMAN, DRIVER, CLEANER, IT_STAFF) through one Next.js codebase without leaking admin endpoints or staff queues, plus a chicken-and-egg first-admin bootstrap.",
        resolution:
          "Encoded role + status as NextAuth JWT claims; edge middleware enforces strict path-prefix RBAC and redirects mismatches; every protected handler re-checks via requireAdmin / requireRole; the first registrant auto-promotes to ADMIN+ACTIVE while later signups enter PENDING_APPROVAL until an admin approves.",
      },
    ],
    evidence: [
      { value: "83", label: "API route handlers" },
      { value: "14", label: "Prisma models" },
      { value: "25+", label: "Email templates", detail: "Transactional, across 6 role dashboards" },
      { value: "100", label: "Static pages", detail: "Production build green on Vercel" },
    ],
    outcomes: [
      "Shipped on Vercel as a demo-ready deployment (production build green, 100/100 static pages, daily GDPR cron live)",
      "End-to-end multi-role pipeline: order lifecycle PENDING → ACCEPTED → PREPARING → OUT_FOR_DELIVERY → DELIVERED with photo proof, plus a parallel CLEANING / IT_SUPPORT service pipeline with before/progress/after photos and 1-5 star ratings",
      "Landing Lighthouse Total Blocking Time cut from 3.2 s (mobile) via route-scoped Swagger CSS, expanded tree-shaking, and next/dynamic code-splitting", // TODO(verify): paste the measured 'after' TBT (target <500 ms)
      "14 Prisma models, 83 API route handlers, 25+ transactional email templates, and 6 role-specific dashboards in one Next.js 16 codebase",
      "Compliance posture from day one: immutable audit log, GDPR export, soft-delete grace window, 30-day anonymisation, 730-day hard purge, per-user unsubscribe tokens",
    ],
    conceptsLearned: [
      "Role-Based Access Control (RBAC) with JWT claims",
      "OAuth 2.0 / OpenID Connect (Google via NextAuth)",
      "React Server Components & the Next.js App Router",
      "Serverless PostgreSQL with an HTTP driver (Neon adapter for Prisma)",
      "Presigned URLs (V4 signing) for direct-to-bucket uploads",
      "N+1 avoidance via Prisma select + $transaction",
      "Tree-shaking & optimizePackageImports",
      "Code-splitting via next/dynamic; Total Blocking Time / LCP optimisation",
      "GDPR data lifecycle (export, soft delete, anonymisation, hard purge)",
      "Immutable audit logging",
      "Transactional email with unsubscribe tokens & retry-with-backoff",
      "Vercel Cron Jobs for scheduled compliance work",
    ],
    links: [
      {
        type: "Website",
        href: "https://total-supply.vercel.app",
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: "Source",
        href: "https://github.com/Total-Supply/total-supply-web", // TODO(verify): confirm the public repo URL
        icon: <Icons.github className="size-3" />,
      },
    ],
    // image: "/images/projects/total-supply.png",  <- restore once the file exists in public/images/projects/
    image: "",
  };
