import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const unifixz: Project = {
    id: "unifixz",
    title: "Unifixz - CI/CD & Zero-Downtime Deployment",
    href: "https://unifixz.lk",
    dates: "2025 - 2026",
    active: false,
    featured: true,
    role: "DevOps / Deployment Engineer",
    context:
      "Owned the deployment side only — the application (a Next.js 15 multimedia-studio commerce platform) was built by teammates. I designed and operate the CI/CD pipeline, Docker packaging, environment-aware configuration, secret management, and the zero-downtime self-hosted release process. Live at unifixz.lk (dev at dev.unifixz.lk).",
    oneLiner:
      "Designed and operated a SHA-pinned GitHub Actions → GHCR → self-hosted-VPS CI/CD pipeline that ships zero-downtime blue-green Docker deploys of Unifixz, a Next.js multimedia-studio commerce platform.",
    description:
      "DevOps ownership of Unifixz: a 4-workflow GitHub Actions → GHCR → self-hosted-VPS pipeline with multi-stage Docker builds, zero-downtime blue-green container swaps with health-gated auto-rollback, a prod approval gate, and CI-run Prisma migrations.",
    overview:
      "I own the deployment layer of Unifixz (a Next.js 15 studio commerce platform built by the team). The pipeline builds once, ships everywhere: a single SHA-pinned image is promoted from dev to prod, with environment-specific values injected at container start. Releases are blue-green container swaps gated on an in-container health check, with automatic rollback, a manual approval gate on production, and Prisma migrations run in a one-shot container ahead of the swap.",
    problem:
      "Unifixz needed reliable, environment-aware releases on a self-hosted Linux VPS (cost / data-residency; PaaS rejected). Four concrete problems followed: a single Docker image had to serve both dev and prod even though Next.js inlines NEXT_PUBLIC_* at build time (the wrong domain leaked into prod emails and PayHere callbacks); 13 Prisma migrations had to apply in front of live traffic without racing the app container; SMTP from the VPS IP had a deliverability gap; and PayHere is a live payment integration, so every prod release had to be approval-gated and instantly rollback-able.",
    flow: {
      diagram: `flowchart LR
  Push["Push to develop / main"] --> CI["nextjs-ci: lint, typecheck, prisma generate, next build"]
  CI -->|"on success"| Image["docker-build-push: multi-stage build, push to GHCR (SHA tag)"]
  Image --> Branch{"Branch?"}
  Branch -->|"develop"| DevDeploy["deploy-dev (auto)"]
  Branch -->|"main"| Gate["GitHub environment: production (manual approval)"]
  Gate --> ProdDeploy["deploy-prod"]
  DevDeploy --> Wait["Poll GHCR for SHA-pinned image"]
  ProdDeploy --> Wait
  Wait --> Env["Assemble .env via single-quoted heredoc, scp to VPS, chmod 600"]
  Env --> Migrate["docker compose run prisma migrate deploy"]
  Migrate --> Swap["Blue-green: rename old, up new, poll /api/health up to 2 min"]
  Swap --> Healthy{"Healthy?"}
  Healthy -->|"Yes"| Cleanup["Kill old, prune images >72h, stamp last-known-good SHA"]
  Healthy -->|"No"| Rollback["Stop new, rename old back, exit 1"]
  Cleanup --> SlackOK["Slack success"]
  Rollback --> SlackBad["Slack failure"]`,
      caption:
        "Four chained GitHub Actions workflows build one SHA-pinned image, promote it through a prod approval gate, and release it via a health-gated blue-green swap with automatic rollback.",
    },
    technologies: [
      "GitHub Actions",
      "Docker",
      "Docker Compose",
      "GHCR",
      "Nginx",
      "Self-hosted VPS",
      "Prisma Migrate",
      "Resend",
      "Slack",
      "Next.js (app, by team)",
    ],
    bestPractices: [
      "SHA-pinned image promotion: every deploy targets develop-<sha> / prod-<sha>, never a floating latest — releases are reproducible and bisectable",
      "Build-time vs runtime env separation: NEXT_PUBLIC_* is inlined once at build; per-environment URLs (NEXTAUTH_URL) are injected at container start, so one image serves both environments correctly",
      "Secrets never written to disk in plaintext outside the VPS: .env is assembled in-runner via a single-quoted heredoc, scp'd, and chmod 600 — never logged or committed",
      "Manual approval gate on production (environment: production), critical because PayHere is live",
      "Atomic blue-green swap with automatic rollback: the old container is renamed (not killed) until the new one passes the in-container /api/health poll; rollback is a single rename + start",
      "Pinned Prisma CLI for migrations (npx prisma@5.22.0 migrate deploy) so a transitive upgrade can't change migration semantics on a live database",
    ],
    challenges: [
      {
        challenge:
          "NEXT_PUBLIC_APP_URL is statically inlined by Next.js at build time, and the same image was promoted dev → prod — so production password-reset emails, receipts, SEO tags, and PayHere return/cancel/notify URLs all pointed at dev.unifixz.lk.",
        resolution:
          "Refactored the URL-reading sites (email, payhere, seo) to read the runtime NEXTAUTH_URL (injected per-environment from GitHub Secrets) ahead of the build-time NEXT_PUBLIC_* value — one image, two environments, correct URLs everywhere.",
      },
      {
        challenge:
          "Outbound SMTP from the VPS IP was rate-limited / flagged, so password-reset and order-confirmation emails were silently undelivered.",
        resolution:
          "Migrated the email path from nodemailer/SMTP to the Resend API: removed SMTP_* from both deploy workflows, threaded RESEND_API_KEY / RESEND_FROM through the development and production GitHub Environments and into the .env heredoc, and kept the .env.example files in lockstep.",
      },
    ],
    outcomes: [
      "4-workflow CI/CD pipeline (CI → Docker build/push → deploy-dev / deploy-prod) across 2 GitHub Environments with a manual approval gate on production",
      "13 Prisma migrations shipped through the pipeline against live Postgres with no observed downtime (blue-green swap + one-shot migration container)",
      "A single Docker image powers both environments (no duplicate build job); env-specific values injected at container start",
      "Container resource limits codified (prod 1.5 GB / 1.5 CPU, dev 1 GB / 1 CPU), loopback-bound behind Nginx; images older than 72h pruned after each deploy; Slack alerts on success and failure",
      // TODO(verify): production uptime, total deploys, MTTR, and average pipeline duration (derive from GitHub Actions run history)
    ],
    conceptsLearned: [
      "CI/CD pipelines (GitHub Actions)",
      "Docker multi-stage builds (deps → builder → runner)",
      "Blue-green / zero-downtime container swap with health-gated rollback",
      "Container registry & immutable SHA-pinned images (GHCR)",
      "Database migrations in CI (prisma migrate deploy)",
      "Secrets management & environment isolation (GitHub Environments)",
      "Build-time vs runtime env-var injection in Next.js",
      "Next.js output: standalone for minimal runtime images",
      "SSH-based VPS deploys (scp + single-quoted heredoc secret assembly)",
      "Docker HEALTHCHECK + /api/health readiness",
      "Nginx reverse proxy + shared Docker bridge networking",
      "Pooled vs direct Postgres connections for migrations",
    ],
    links: [
      {
        type: "Live",
        href: "https://unifixz.lk",
        icon: <Icons.globe className="size-3" />,
      },
      // Repo is private (github.com/Darts-Ecommerce/unifixz) — shareable with recruiters on request.
    ],
    // image omitted intentionally — add public/images/projects/unifixz.png to enable the hero
  };
