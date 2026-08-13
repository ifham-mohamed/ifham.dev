import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const ragRelease: Project = {
    id: "rag-release",
    title: "Rag Release - Collaborative Book Publishing Platform",
    href: "https://github.com/Rag-Release",
    dates: "Sep 2024 - Sep 2025",
    active: false,
    visual: "topology",
    signals: ["Microservices", "Clean Architecture", "Refresh-token rotation"],
    featured: true,
    role: "Sole Developer — Final-Year Capstone",
    context:
      "Individual Level 3 (final-year) capstone (student 215075J), supervised. A polyrepo of three services under the Rag-Release GitHub org — a Next.js frontend, a user-auth-service, and a book-service. I authored the IEEE 830-1998 SRS, the system architecture, all three services, and end-to-end deployment/release management. Corrected from an earlier 'team project' note — this was an individual capstone.", // TODO(verify): awarding institution + final grade
    oneLiner:
      "A real-time collaborative book-writing and self-publishing platform for Sri Lankan authors that carries a manuscript from co-written draft through cover design, editorial review, ISBN handling, and Stripe-powered sales — a Next.js frontend backed by two Dockerized Node.js microservices.",
    description:
      "Final-year capstone: a 3-service microservices publishing platform (Next.js + user-auth-service + book-service) with real-time collaborative editing (Yjs CRDT over WebRTC), JWT access+refresh auth, 5-role RBAC, AWS S3 presigned storage, and Stripe payments.",
    overview:
      "Rag Release unifies Sri Lanka's fragmented self-publishing workflow — co-writing, cover design, editorial review, ISBN/certificate handling, publishing, and sales — into one platform connecting authors, designers, reviewers, publishers and readers. A Next.js frontend with a TipTap editor binds a Yjs CRDT shared peer-to-peer over WebRTC for conflict-free co-writing; two Express microservices (auth + book) share a JWT trust boundary, with Stripe payments and S3 presigned-URL asset delivery. I owned the SRS, architecture, all three services, and the release management.",
    problem:
      "Sri Lanka's publishing industry leaves aspiring authors with limited access to professional publishers, weak distribution, financial barriers (e.g. VAT), and little guidance (ISBN acquisition, publishing-method choice). Authors stitch together disconnected tools for writing, cover design, ISBN handling, review, publishing and sales — with no single platform connecting the parties and no way to co-write in real time. Rag Release unifies that end to end.", // TODO(verify): a baseline metric for the gap
    flow: {
      diagram: `flowchart LR
  User["Author / Designer / Reviewer / Reader"] --> FE["Next.js 15 App Router (Vercel)"]
  FE -->|"JWT REST (Axios)"| AUTH["user-auth-service (Express 5)"]
  FE -->|"JWT REST (Axios)"| BOOK["book-service (Express 4)"]
  FE <-->|"Yjs CRDT over WebRTC"| SIG["WebSocket Signaling Server"]
  BOOK -.->|"trusts JWT issued by"| AUTH
  AUTH --> AUTHDB[("Auth DB (PostgreSQL)")]
  BOOK --> BOOKDB[("Book DB (PostgreSQL)")]
  BOOK -->|"presigned URLs"| S3["AWS S3 (covers, certificates)"]
  BOOK -->|"payments + webhooks"| STRIPE["Stripe API"]
  subgraph DEPLOY["Deployment / Release"]
    DOCKER["Docker images (node-alpine)"]
    GITFLOW["GitFlow: main / dev / feature PRs"]
    MIG["Sequelize migrations + seeders"]
  end
  DOCKER -.-> AUTH
  DOCKER -.-> BOOK
  MIG -.-> AUTHDB`,
      caption:
        "Next.js frontend (Vercel) over two Express microservices sharing a JWT trust boundary; real-time co-writing via Yjs CRDT over WebRTC; S3 presigned storage, Stripe payments, and a Dockerised GitFlow release flow with Sequelize migrations.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "TipTap",
      "Yjs",
      "y-webrtc",
      "Node.js",
      "Express.js",
      "Sequelize",
      "PostgreSQL",
      "JWT",
      "Stripe",
      "AWS S3",
      "Docker",
      "Vercel",
    ],
    bestPractices: [
      "Clean Architecture (ports & adapters): entities -> use-cases -> interface adapters -> frameworks, so business logic stays independent of Express/Sequelize/JWT and unit-testable",
      "Defense-in-depth API security: Helmet, env-aware CORS allowlist, IP rate limiting, Joi validation, body-size limits, and bcrypt hashing on every service",
      "Stateless JWT auth with short-lived access (15 min) + refresh-token rotation; one auth service is the trust boundary for the whole platform",
      "Role-Based Access Control: five roles (author, reviewer, designer, publisher, reader) enforced by route middleware, mapping to the real publishing workflow",
      "Reproducible DB releases: versioned, timestamped Sequelize migrations + seeders (up/undo) instead of hand-applied schema changes",
      "Operability built in: structured Winston logging with daily rotation and /health endpoints (uptime/memory/PID) for probes; GitFlow PR review gates",
    ],
    challenges: [
      {
        challenge:
          "The book-service was first built on GraphQL (Apollo + TypeGraphQL), which diverged from the REST + JWT-middleware model of the auth service and made cross-service RBAC and validation inconsistent.",
        resolution:
          "Pivoted the service to Express + Sequelize REST under the same Clean Architecture as the auth service (git history shows the GraphQL implementation removed and re-implemented), unifying the middleware stack (Helmet/CORS/rate-limit/Joi/JWT) and simplifying role enforcement and deployment.",
      },
      {
        challenge:
          "Supporting multiple authors editing the same manuscript concurrently without a central lock or merge conflicts.",
        resolution:
          "Adopted a Yjs CRDT bound to TipTap, synced peer-to-peer over WebRTC with a WebSocket signaling server for presence and live cursors. Known gap: the signaling endpoint still points at a local server, so a hosted signaling URL is required for production.",
      },
    ],
    outcomes: [
      "A 3-tier, 3-repository microservices platform: one Next.js frontend + two Node.js services sharing a JWT trust boundary",
      "~30+ REST endpoints across the auth domain (sign-up/in, refresh, logout, profile, account upgrade, payments) and book domain (book CRUD, content, cover/ISBN upload, publish, assign-reviewer, reviews, purchase, download)",
      "5-role RBAC publishing workflow; real-time collaborative editor (Yjs CRDT, live cursors); Stripe e-commerce with webhooks; S3 presigned-URL assets",
      "Release deliverables: Dockerized services, Vercel CD for the frontend, 5 versioned auth-service migrations, and a GitFlow PR workflow (auth-service alone shows 24+ merged PRs)",
      // NOTE: SRS-planned (not shipped): serverless/Lambda/API Gateway, Kubernetes, GitHub Actions CI, CloudWatch/Grafana/Prometheus. Perf targets (<200ms ops, 1000+ concurrent) are design goals, not benchmarked.
      // TODO(verify): final grade; real usage numbers; whether the three repos are public
    ],
    conceptsLearned: [
      "Microservices architecture (polyrepo)",
      "Clean Architecture (ports & adapters / hexagonal)",
      "RESTful API design",
      "JWT auth with access + refresh-token rotation",
      "Role-Based Access Control (RBAC)",
      "CRDT real-time collaboration (Yjs)",
      "WebRTC peer-to-peer + WebSocket signaling",
      "Docker containerization",
      "GitFlow branching & PR review gates",
      "Database migrations & seeding (Sequelize)",
      "AWS S3 presigned URLs",
      "Stripe payment integration & webhooks",
      "Defense-in-depth API security (Helmet, CORS, rate limiting, Joi, bcrypt)",
      "Observability — structured logging & health checks (Winston)",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rag-Release",
        icon: <Icons.github className="size-3" />,
      },
      // Repos: Rag-Release-FE, book-service, user-auth-service. // TODO(verify): confirm public
    ],
    // image: "/images/projects/rag-release.png",  <- restore once the file exists in public/images/projects/
    image: "",
  };
