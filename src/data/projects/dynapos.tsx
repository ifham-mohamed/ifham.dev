import type { Project } from "@/types";

export const dynapos: Project = {
    id: "dynapos",
    title: "DynaPOS - Multi-Tenant SaaS POS Platform",
    href: "",
    dates: "2025", // TODO(verify): set exact dates
    active: true,
    featured: true,
    role: "Lead Developer (Small Team)",
    context:
      "Lead developer in a small team — owned end-to-end architecture and the majority of implementation: the Prisma schema and multi-tenant model, RBAC, accounting primitives (FIFO stock layers, WAC dispatch, decimal UoM), PayHere webhook integration, and the Playwright/Cucumber E2E harness. Scope spans v1.0 (auth, onboarding, dynamic per-business-type product schema, POS, inventory) through v9.0 (cash drawer, bank ledger, deposit batching): 18 versioned migrations and 9 industry templates from one codebase.", // TODO(verify): team size / who owned what; client vs internal product
    oneLiner:
      "A multi-tenant SaaS point-of-sale platform for small/medium retail, pharmacy, restaurant, salon and service businesses, with built-in FIFO/WAC inventory costing, tiered pricing, multi-branch stock transfers, cash-drawer/bank reconciliation, and PayHere subscription billing.",
    description:
      "Production multi-tenant SaaS POS (Next.js 15 + Prisma/PostgreSQL) with accounting-correct FIFO/WAC inventory, tiered pricing, multi-branch transfers, cash-drawer/bank reconciliation, PayHere subscription billing, and a ~210-scenario BDD E2E suite in CI.",
    overview:
      "DynaPOS runs one company's multiple businesses across multiple branches with strictly tenant-isolated data. It models accounting-correct inventory (FIFO stock layers with per-sale cost snapshots, WAC dispatch, decimal units of measure), tiered/quantity-break pricing, inter-branch stock transfers that preserve cost lineage, end-of-day cash-drawer-to-bank reconciliation, and PayHere subscription billing — all from a single codebase serving 9 industry templates, with a Playwright + Cucumber BDD suite running in CI on ephemeral Postgres.",
    problem:
      "Small/mid-size businesses in Sri Lanka had to choose between generic global POS products that don't model LKR / 18% VAT / PayHere, per-vertical point solutions that lock a merchant into one business type, or spreadsheets that lose audit trails on stock and cash. None handled the combination DynaPOS targets: one company running multiple businesses across branches with strict tenant isolation, accounting-correct FIFO/WAC inventory across transfers, tiered pricing, end-of-day cash-to-bank reconciliation, and local payment rails.", // TODO(verify): a baseline (e.g. manual daily-close time)
    flow: {
      diagram: `flowchart LR
  U["Cashier / Merchant"] --> V["Vercel Edge"]
  V --> MW["middleware.ts (Auth.js v5)"]
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
  CLD["Cloudinary"] -.->|"logos"| RH`,
      caption:
        "Auth.js-gated Next.js App Router resolves a request-cached tenant context, Zod-validates, checks RBAC, then runs FIFO/WAC + pricing inside prisma.$transaction; PayHere webhooks are MD5-verified and idempotent on lastPaymentId.",
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
      "Vercel",
      "Docker",
    ],
    bestPractices: [
      "Defence-in-depth tenant isolation: tenant context resolved once per request via React cache(); every Prisma where scopes by companyId/businessId; a partial unique index enforces one open cash drawer per cashier at the DB layer",
      "Accounting integrity by construction: all stock/cash mutations wrap in prisma.$transaction; SaleItemConsumption snapshots per-layer unitCost at sale time so historical P&L is immutable even after a FIFO<->WAC switch",
      "Decimal precision discipline: money as DECIMAL(12,2), fractional quantities as DECIMAL(18,4) for UoM conversions, with explicit rounding at every write boundary",
      "Schema-validated boundaries: every API entry point Zod-parses before any side effect; webhook payloads use the same pattern",
      "BDD-style E2E in CI: ~210 Cucumber feature files driven by Playwright cover sales, returns, transfers, billing, RBAC and 5 business types, with an idempotent seed for deterministic fixtures",
      "Targeted composite indexes for hot paths: StockLayer(productId, branchId, receivedAt) for the FIFO walk; Sale(branchId, createdAt) for daily reports",
    ],
    challenges: [
      {
        challenge:
          "Inter-branch stock transfers had to preserve original layer costs without breaking FIFO accounting — naive transfers would either lose cost lineage or double-count COGS.",
        resolution:
          "Modelled StockTransferItem.costBreakdown as JSON snapshotting the (layerId, qty, unitCost) tuples consumed from source layers; the receiving branch spawns mirror StockLayer rows at the original unitCost, so a unit's cost basis survives any number of inter-branch hops.",
      },
      {
        challenge:
          "PayHere webhooks can be re-delivered (retries, manual replays), and duplicate processing would double-charge subscriptions or corrupt billing state.",
        resolution:
          "Verified the MD5 notification signature first, Zod-parsed the payload, then keyed idempotency on lastPaymentId per subscription so a duplicate payment_id short-circuits to a no-op; the design distinguishes initial-charge vs renewal correctly.",
      },
    ],
    outcomes: [
      "Shipped to production on Vercel, serving real merchants across multiple business types (multi-tenant)",
      "18 versioned, forward-only Prisma migrations from v1.0 Foundation to v9.0 Cash & Banks, including a v7.6 backfill that spawned opening-balance StockLayer rows for every (product, branch) so FIFO/WAC could light up over historical inventory",
      "9 industry templates (mobile shop, pharmacy, bookshop, grocery, salon, restaurant, hardware, general retail, services) from a single codebase via dynamic product field definitions",
      "~210 Cucumber/Playwright E2E scenarios running in CI on an ephemeral Postgres, with a Serenity/JS living-documentation report uploaded per run",
      // TODO(verify): merchant/active-user/transactions-per-month counts; any business outcome (e.g. daily-close time reduced)
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
      "CI with ephemeral Postgres services & idempotent seed fixtures",
      "PostgreSQL partial unique indexes",
      "Auth.js v5 credentials flow with Edge/Node config split",
    ],
    links: [],
    // Repo private; live URL not yet public. // TODO(verify): add Vercel production URL when shareable
    // image omitted intentionally — add public/images/projects/dynapos.png to enable the hero
  };
