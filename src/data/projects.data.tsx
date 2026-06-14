import { Icons } from "@/components/icons";
import type { Project } from "@/types";

/**
 * Projects Data — single source of truth.
 * Schema: see `Project` in src/types/data.types.ts.
 *
 * The CV reads the SHORT slice (oneLiner + a headline outcome + conceptsLearned).
 * This file feeds the FULL case study rendered at /projects/[slug].
 *
 * TODO convention: anything tagged `// TODO(verify)` / `// TODO(confirm)` is a
 * claim that could NOT be confirmed from public sources. Replace it with your
 * real numbers, bugs and details (use docs/project-extraction-prompts.md) before
 * publishing. Items WITHOUT a TODO tag are either confirmed from your public
 * repos/live sites or are standard for the stack.
 */
export const projects: Project[] = [
  {
    id: "total-supply",
    title: "Total Supply - Enterprise Supply Chain Platform",
    href: "https://total-supply.vercel.app",
    dates: "Jan 2026 - Present",
    active: true,
    featured: true,
    role: "Full-Stack Developer — Personal & Freelance",
    context:
      "Solo full-stack build. Owned the architecture, PostgreSQL schema, the REST API, and the role-based dashboards end to end.",
    oneLiner:
      "A multi-role enterprise supply-chain platform that unifies e-commerce ordering and field-service workflows behind a single RBAC-governed API.",
    description:
      "Multi-role supply chain platform unifying e-commerce and service workflows behind an RBAC-governed REST API, with a Prisma/PostgreSQL data layer and signed-URL media on Google Cloud Storage.",
    overview:
      "Total Supply is a multi-role platform where distributors, staff and customers operate against one system of record. Every request passes through role-based access control before it reaches the data layer, so each role only sees and does what it should — across both the e-commerce and the service side of the business.",
    problem:
      "Distribution teams were running orders, inventory and service requests across spreadsheets and disconnected tools. There was no single source of truth and no real access control — every user could see everything, and approvals happened over chat. The platform had to consolidate 80+ operations behind strict, per-role permissions.", // TODO(verify): confirm the "80+ operations/endpoints" figure
    flow: {
      diagram: `flowchart LR
  U["Client roles: admin, staff, customer"] --> APP["Next.js App Router (RSC)"]
  APP --> MW["RBAC middleware guard"]
  MW --> API["REST route handlers"]
  API --> ORM["Prisma ORM"]
  ORM --> DB[("PostgreSQL")]
  API --> GCS["Google Cloud Storage (signed URLs)"]`,
      caption:
        "Every request is authorised by middleware before it reaches the API, ORM and storage layers.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Google Cloud Storage",
      "Tailwind CSS",
      "RBAC",
    ],
    bestPractices: [
      "Enforced RBAC server-side in middleware — roles are never trusted from the client",
      "Modelled a normalised Prisma schema with explicit relations and composite indexes on hot query paths",
      "Served private media through time-limited GCS signed URLs instead of exposing bucket credentials",
      "Validated request payloads at the API boundary before they reach the database",
    ],
    challenges: [
      {
        challenge:
          "Dashboard and listing queries fanned out into N+1 lookups across role, order and product relations, pushing some endpoints past ~250 ms.", // TODO(verify): confirm the 250 ms baseline
        resolution:
          "Restructured Prisma queries with selective include/select and added composite indexes on the hot filter columns, bringing the worst path down to ~87 ms.", // TODO(verify): confirm the 87 ms result
      },
      {
        challenge:
          "Serving uploaded documents directly risked leaking private files across roles.",
        resolution:
          "Switched to per-request, time-limited GCS signed URLs so access expires automatically and credentials are never exposed.",
      },
    ],
    outcomes: [
      "80+ REST endpoints covering e-commerce and service workflows", // TODO(verify)
      "Hot-path query time reduced from ~250 ms to ~87 ms", // TODO(verify)
      "~40% lower image/storage cost via signed-URL delivery and optimisation", // TODO(verify)
      "Role-based dashboards with admin approval for privileged access",
    ],
    conceptsLearned: [
      "Role-Based Access Control (RBAC)",
      "Middleware route guards",
      "Prisma schema design",
      "Composite indexing",
      "N+1 query elimination",
      "GCS signed URLs",
      "REST API design",
      "Next.js App Router",
      "React Server Components",
    ],
    links: [
      {
        type: "Website",
        href: "https://total-supply.vercel.app",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/images/projects/total-supply.png",
  },
  {
    id: "samwoostore",
    title: "Samwoostore - E-Commerce Platform",
    href: "https://samwoohub.lk",
    dates: "Oct 2025 - Dec 2025",
    active: true,
    featured: true,
    role: "Full-Stack Developer — Freelance",
    context:
      "Freelance delivery for Samwootek Engineering, a networking / structured-cabling supplier in Nugegoda, Sri Lanka. Owned the storefront, API, authentication and the deployment pipeline. Live at samwoohub.lk.",
    oneLiner:
      "A production B2B/B2C e-commerce platform for Samwootek Engineering, shipping the storefront, catalog, cart and account flows on a feature-modular Next.js codebase.",
    description:
      "Production B2B/B2C e-commerce platform on a feature-modular Next.js codebase, with dual authentication, a Dockerised CI/CD pipeline for zero-downtime deploys, and caching-driven performance.",
    overview:
      "Samwoostore is the online store for Samwootek Engineering, serving both retail (B2C) and trade (B2B) customers. The codebase is organised by feature, authentication supports both credentials and Google sign-in, and releases ship through a Dockerised pipeline so the live shop never goes down on deploy.",
    problem:
      "The business sold networking and telecom hardware offline only. It needed an online store serving both retail and trade buyers, with secure accounts — and a release process that didn't take the shop offline on every update.",
    flow: {
      diagram: `flowchart LR
  B["Browser: B2B / B2C"] --> FE["Next.js SSR / RSC"]
  FE --> AUTH["Auth: credentials + Google OAuth (JWT)"]
  FE --> API["REST API"]
  API --> DB[("PostgreSQL")]
  GH["GitHub Actions"] --> DK["Docker multi-stage"]
  DK --> NG["Nginx reverse proxy"]
  NG -. zero-downtime .-> FE`,
      caption:
        "Feature-modular Next.js app fronted by Nginx, shipped through a Docker + GitHub Actions pipeline.",
    },
    technologies: [
      "Next.js",
      "React",
      "Redux Toolkit",
      "React Query",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Nginx",
      "Google OAuth",
      "JWT",
    ],
    bestPractices: [
      "Organised the codebase by feature module for clear boundaries and separation of concerns",
      "Implemented dual authentication (credentials + Google OAuth) with JWT sessions and RBAC",
      "Built multi-stage Docker images and a GitHub Actions pipeline for reproducible, automated deploys",
      "Fronted the app with an Nginx reverse proxy for TLS termination and zero-downtime cutovers",
      "Cached server state with React Query and kept UI state in Redux Toolkit to cut redundant requests",
    ],
    challenges: [
      {
        challenge:
          "Re-deploys briefly dropped the storefront — unacceptable for a live shop.",
        resolution:
          "Built a Docker multi-stage + GitHub Actions + Nginx pipeline with health-checked, zero-downtime cutovers.",
      },
      {
        challenge:
          "Repeated catalog and product fetches made navigation feel sluggish.",
        resolution:
          "Layered React Query caching over Redux Toolkit UI state, removing redundant network calls and speeding up loads by ~40%.", // TODO(verify): confirm the 40% figure
      },
    ],
    outcomes: [
      "Live in production at samwoohub.lk on Next.js",
      "80+ REST endpoints across the storefront and account flows", // TODO(verify)
      "Zero-downtime deploys via Docker + GitHub Actions + Nginx",
      "~40% faster page loads through caching", // TODO(verify)
    ],
    conceptsLearned: [
      "Next.js App Router",
      "OAuth 2.0 / OIDC",
      "JWT sessions",
      "Role-Based Access Control (RBAC)",
      "Docker multi-stage builds",
      "GitHub Actions CI/CD",
      "Nginx reverse proxy",
      "Zero-downtime deployment",
      "React Query caching",
      "Redux Toolkit",
      "Feature-based architecture",
    ],
    links: [
      {
        type: "Website",
        href: "https://samwoohub.lk",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/images/projects/samwoostore.png",
  },
  {
    id: "prompt-copilot",
    title: "Prompt Copilot - AI Prompt Management Ecosystem",
    href: "https://github.com/ifham-mohamed/prompt-copilot",
    dates: "Dec 2025 - Jan 2026",
    active: true,
    featured: true,
    role: "Full-Stack Developer — Personal Project",
    context:
      "Personal project built as a TypeScript monorepo: a Next.js + Prisma web app/API plus a Chrome extension and a VS Code extension, all consuming one shared API and auth.",
    oneLiner:
      "An AI-prompt management ecosystem that keeps a single prompt library in sync across the web, a Chrome extension and a VS Code extension.",
    description:
      "TypeScript monorepo for managing AI prompts across surfaces: a Next.js + Prisma web app and REST API, a Chrome (MV3) extension, and a VS Code extension with a sidebar webview, all behind shared authentication.",
    overview:
      "Prompt Copilot keeps your reusable prompts in one library and brings them to wherever you work. A shared REST API (Next.js route handlers + Prisma) backs three clients — the web app, a Chrome extension, and a VS Code extension — so the same prompts and the same login follow you across the browser and the editor.",
    problem:
      "Reusable AI prompts end up scattered across browser tabs, notes and editors. There was no single place to store, organise and retrieve them from the tools where they're actually used.",
    flow: {
      diagram: `flowchart TD
  API["Shared REST API: Next.js + Prisma"] --> DB[("PostgreSQL")]
  API --> AUTH["Shared authentication"]
  WEB["Web app (shadcn/ui)"] --> API
  CHR["Chrome extension (MV3)"] --> API
  VSC["VS Code extension (sidebar webview)"] --> API`,
      caption:
        "One API and auth layer; three clients (web, browser extension, IDE extension) consume it.",
    },
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "shadcn/ui",
      "Chrome Extension (MV3)",
      "VS Code Extension",
      "REST API",
    ],
    bestPractices: [
      "Structured as a monorepo with shared TypeScript types across web, browser and IDE clients",
      "Exposed one REST API so every client stays consistent instead of duplicating logic",
      "Scoped Chrome extension permissions minimally under Manifest V3 with a service worker",
      "Used typed message passing between the VS Code webview and the extension host",
    ],
    challenges: [
      {
        challenge:
          "Three clients (web, Chrome, VS Code) needed the same prompts and the same login without three separate auth stacks.",
        resolution:
          "Centralised auth behind one shared REST API; each client holds a token and the extensions persist it via their own storage APIs.", // TODO(verify): confirm the exact auth/token approach
      },
      {
        challenge:
          "Manifest V3 service workers and the VS Code webview sandbox restrict direct DOM and network access.",
        resolution:
          "Routed work through message passing between content script / webview and the background context, keeping network calls in the privileged layer.", // TODO(verify)
      },
    ],
    outcomes: [
      "Single prompt library synced across web, Chrome and VS Code",
      "REST API exposing 15+ endpoints", // TODO(verify)
      "Prompt organisation across 5+ platforms", // TODO(verify)
      "Public TypeScript monorepo (web + two extensions)",
    ],
    conceptsLearned: [
      "TypeScript monorepo",
      "Chrome Extension Manifest V3",
      "Service workers",
      "Content scripts",
      "Message passing",
      "VS Code Extension API",
      "WebView API",
      "REST API design",
      "Prisma",
      "Next.js route handlers",
      "Shared authentication",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifham-mohamed/prompt-copilot",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/images/projects/prompt-copilot.png",
  },
  {
    id: "rag-release",
    title: "Rag Release - Collaborative Book Publishing Platform",
    href: "https://github.com/Rag-Release",
    dates: "Sep 2024 - Jul 2025",
    active: false,
    featured: true,
    role: "Full-Stack Developer",
    context:
      "Team project under the Rag-Release organisation. Split into a Next.js frontend and Express microservices (auth, book, media). " +
      "NOTE: corrected from the earlier 'AWS Lambda / API Gateway / RDS' description — the public repos show Express services on Docker with PostgreSQL/Sequelize, AWS S3 and Stripe.", // TODO(confirm): if you genuinely deployed on Lambda/API Gateway, restore those and tell me
    oneLiner:
      "A collaborative book-publishing platform with real-time co-editing, threaded review and a full author-to-publisher workflow across microservices.",
    description:
      "Collaborative book-publishing platform that streamlines the author → reviewer → designer → publisher → reader workflow, built as a Next.js frontend over Express microservices with real-time collaborative editing.",
    overview:
      "Rag Release moves a manuscript through its whole lifecycle in one place. A Next.js frontend with a Tiptap editor and Yjs powers conflict-free real-time collaboration, while Express microservices handle authentication, the publishing workflow, and media — with payments through Stripe and assets on AWS S3.",
    problem:
      "Taking a manuscript from author to published book means juggling drafts, reviewers, designers and publishers — usually over email and file attachments. The platform centralises that pipeline with live collaborative editing and role-specific stages.",
    flow: {
      diagram: `flowchart LR
  FE["Next.js FE: Tiptap + Yjs realtime"] --> AUTH["user-auth-service (JWT, bcrypt)"]
  FE --> BOOK["book-service (Express, Sequelize)"]
  FE --> MEDIA["media-service"]
  AUTH --> DBA[("PostgreSQL")]
  BOOK --> DBB[("PostgreSQL")]
  BOOK --> S3["AWS S3: covers, ISBN"]
  BOOK --> PAY["Stripe payments"]`,
      caption:
        "Microservice split — frontend plus auth, book and media services — with realtime editing via Yjs.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Tiptap",
      "Yjs",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Sequelize",
      "AWS S3",
      "Stripe",
      "Docker",
    ],
    bestPractices: [
      "Separated concerns into auth, book and media microservices that scale independently",
      "Used clean/layered architecture (controllers → use-cases → repositories) inside each service",
      "Adopted Yjs CRDTs with Tiptap for conflict-free real-time collaborative editing",
      "Hashed credentials with bcrypt and issued JWTs from a dedicated auth service",
      "Managed schema evolution with Sequelize migrations and stored assets on S3",
    ],
    challenges: [
      {
        challenge:
          "Multiple people editing the same manuscript simultaneously caused lost updates with naive saves.",
        resolution:
          "Adopted Yjs CRDTs with the Tiptap editor for conflict-free real-time collaboration, with presence and cursors.",
      },
      {
        challenge:
          "A monolith couldn't cleanly separate auth, publishing and media concerns or scale them independently.",
        resolution:
          "Split the system into auth, book and media microservices, each with its own layered structure and database.",
      },
    ],
    outcomes: [
      "Role-based workflow for authors, reviewers, designers, publishers and readers",
      "Real-time collaborative editor (Yjs + Tiptap)",
      "Microservice split: frontend + auth + book + media",
      "Payments via Stripe; covers and ISBN certificates stored on AWS S3",
    ],
    conceptsLearned: [
      "Microservices architecture",
      "Clean / layered architecture",
      "CRDTs (Yjs)",
      "Real-time collaborative editing",
      "Tiptap editor",
      "JWT + bcrypt authentication",
      "Sequelize ORM",
      "PostgreSQL",
      "AWS S3 storage",
      "Stripe payments",
      "Docker",
      "REST API design",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/Rag-Release",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/images/projects/rag-release.png",
  },
  {
    id: "welfare-system",
    title: "Student Welfare Management System",
    href: "https://ems.vpa.ac.lk",
    dates: "Oct 2023 - Jul 2024",
    active: false,
    featured: true,
    role: "Team Lead & Full-Stack Developer",
    context:
      "Led a student team under the mentorship of Loons Lab. Deployed on the University of the Visual and Performing Arts domain (ems.vpa.ac.lk).",
    oneLiner:
      "A student welfare management system for a national university, digitising Mahapola scholarship processing and disciplinary tracking for 4,000+ students.", // TODO(verify): confirm the 4,000+ figure
    description:
      "Welfare management system supporting 4,000+ students, with workflows for Mahapola scholarship processing and disciplinary action tracking, delivered as team lead under Loons Lab mentorship.", // TODO(verify)
    overview:
      "The Student Welfare Management System digitises welfare operations for a national university — scholarship eligibility and disbursement, plus disciplinary records — replacing paper and spreadsheets with an auditable, role-based application. It runs live on the university's own domain.",
    problem:
      "Welfare operations — scholarship eligibility, disbursement and disciplinary records for thousands of students — ran on paper and spreadsheets. The process was slow, error-prone and hard to audit.", // TODO(verify): add the concrete pain metric you measured
    flow: {
      diagram: `flowchart LR
  UI["React SPA (Material UI)"] --> API["Express REST API"]
  API --> DB[("PostgreSQL")]
  API --> SCH["Scholarship module"]
  API --> DIS["Disciplinary module"]`,
      caption:
        "React + Material UI client over an Express/PostgreSQL API with scholarship and disciplinary modules.",
    },
    technologies: [
      "Node.js",
      "Express.js",
      "React.js",
      "Material UI",
      "PostgreSQL",
      "Git",
      "GitLab",
    ],
    bestPractices: [
      "Modelled a normalised relational schema so scholarship and disciplinary records stay auditable",
      "Enforced role-based access for different welfare staff responsibilities",
      "Structured the Express API into modular controllers and routers with a middleware pipeline",
      "Ran a GitLab branch/PR workflow with reviews to keep a multi-contributor codebase stable",
    ],
    challenges: [
      {
        challenge:
          "Scholarship rules and disciplinary records spanned many entities and had to remain auditable.",
        resolution:
          "Modelled a normalised relational schema with explicit roles and status tracking so every action was traceable.", // TODO(verify)
      },
      {
        challenge:
          "As team lead, several contributors caused merge churn on a shared codebase.",
        resolution:
          "Established a GitLab branch/PR workflow and review conventions to keep the trunk stable.", // TODO(verify)
      },
    ],
    outcomes: [
      "Supports 4,000+ students", // TODO(verify)
      "Live on the university domain (ems.vpa.ac.lk)",
      "Mahapola scholarship and disciplinary workflows digitised",
      "Led a student team to delivery under Loons Lab mentorship",
    ],
    conceptsLearned: [
      "Relational schema design",
      "Role-Based Access Control (RBAC)",
      "Express middleware pipeline",
      "REST API design",
      "Material UI",
      "Git / GitLab workflow",
      "Technical team leadership",
      "PostgreSQL",
    ],
    links: [
      {
        type: "Website",
        href: "https://ems.vpa.ac.lk",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/images/projects/welfare-system.png",
  },
  {
    id: "internify",
    title: "Internify - Intern Tracking System",
    href: "https://internify.fit",
    dates: "Jun 2024 - Sep 2024",
    active: false,
    featured: false,
    role: "Full-Stack Developer",
    context:
      "Full-stack developer on a centralised internship-tracking tool — a React frontend over a Node/TypeScript API and PostgreSQL.", // TODO(verify): confirm live status of internify.fit
    oneLiner:
      "A centralised internship-application tracker that gives 450+ students and coordinators one place to manage placements.", // TODO(verify): confirm the 450+ figure
    description:
      "Centralised internship application management system serving 450+ students, with role-based views for students and coordinators over a typed Node API.", // TODO(verify)
    overview:
      "Internify centralises internship applications and their status in one place, replacing scattered forms and email threads. Students track their applications while coordinators manage placements through role-specific views.",
    problem:
      "Internship applications were tracked over scattered forms and email, making status visibility and coordination painful for both students and staff.", // TODO(verify)
    flow: {
      diagram: `flowchart LR
  UI["React frontend"] --> API["Node + TypeScript REST API"]
  API --> DB[("PostgreSQL")]
  UI --> ROLES["Student / Coordinator views"]`,
      caption: "Typed Node/TypeScript API with role-based student and coordinator views.",
    },
    technologies: ["Node.js", "TypeScript", "React.js", "PostgreSQL"],
    bestPractices: [
      "Built a typed API surface end to end with TypeScript",
      "Modelled a relational schema for applications, students and placements",
      "Separated student and coordinator capabilities with role-based views",
    ],
    challenges: [
      {
        challenge:
          "Application status was opaque to both students and staff.",
        resolution:
          "Centralised application state with role-based dashboards so each side sees exactly the view it needs.", // TODO(verify)
      },
    ],
    outcomes: [
      "Serves 450+ students", // TODO(verify)
      "Centralised application and status tracking for students and coordinators",
    ],
    conceptsLearned: [
      "TypeScript REST API",
      "Relational schema design",
      "React state management",
      "Role-Based Access Control (RBAC)",
    ],
    links: [
      {
        type: "Website",
        href: "https://internify.fit",
        icon: <Icons.globe className="size-3" />,
      },
    ],
    image: "/images/projects/internify.png",
  },
  {
    id: "pov-globe",
    title: "POV Globe - IoT Persistence-of-Vision LED Display",
    href: "https://github.com/ifham-mohamed/POV_GLOBE",
    dates: "Jul 2023 - Jun 2024",
    active: false,
    featured: false,
    role: "Embedded & Web Developer",
    context:
      "Embedded + web hobby project. C++ firmware on an ESP32 driving WS2812 addressable LEDs, with a browser UI served from the device.", // TODO(verify): repo language is 100% C++; confirm Arduino framework + Hall-effect sensor before listing them
    oneLiner:
      "An IoT persistence-of-vision globe that paints 3D text and light shows on a spinning ring of addressable LEDs, controlled from an ESP32 web server.",
    description:
      "IoT persistence-of-vision display rendering dynamic 3D text and light shows on a rotating WS2812 LED ring, driven by ESP32 firmware with an on-device web control UI.",
    overview:
      "The POV Globe turns a single rotating strip of WS2812 LEDs into a 3D display. ESP32 firmware times the LED refresh to the rotation so persistence of vision renders text and animations in mid-air, and a web server on the device lets you change content and effects from a browser.",
    problem:
      "Static LED signboards are flat and fixed. A persistence-of-vision display can render dynamic 3D text and animations from one rotating strip — but only if the LEDs are timed precisely to the rotation.",
    flow: {
      diagram: `flowchart LR
  ROT["Rotating LED ring"] --> SYNC["Rotation sync + timing"]
  SYNC --> ESP["ESP32 firmware (C++)"]
  ESP --> LED["WS2812 LEDs (RMT driver)"]
  ESP --> WS["On-device web server"]
  WS --> BR["Browser control UI"]`,
      caption:
        "Rotation timing drives the ESP32, which refreshes the LEDs and serves a browser control UI.",
    },
    technologies: [
      "C++",
      "ESP32",
      "WS2812 LED",
      "Arduino", // TODO(verify): commonly the Arduino framework on ESP32 — confirm
      "Hall Effect Sensors", // TODO(verify): README names ESP32 + WS2812 only; confirm sensor type
      "HTML",
      "CSS",
      "JavaScript",
    ],
    bestPractices: [
      "Synchronised LED refresh to each revolution for a stable, non-drifting image",
      "Drove WS2812 LEDs via the ESP32 RMT peripheral to meet strict timing without bit-banging", // TODO(verify): confirm RMT vs library driver
      "Served the control UI directly from the device (IoT), so no separate backend is needed",
      "Kept firmware, datasheets and PCB design organised in the repo (CODES / DATA SHEETS / PCBS)",
    ],
    challenges: [
      {
        challenge:
          "WS2812 timing is unforgiving — driving LEDs while serving Wi-Fi can corrupt frames.",
        resolution:
          "Isolated the LED timing path (RMT-driven) from the web server so network activity doesn't disrupt the display.", // TODO(verify)
      },
      {
        challenge: "Rendered text drifted as rotation speed varied.",
        resolution:
          "Synced each revolution to a rotation index and computed angular position from the measured period.", // TODO(verify): confirm sensing method
      },
    ],
    outcomes: [
      "Renders dynamic 3D text and light shows on a rotating LED sphere",
      "Real-time RPM display",
      "Browser control via an on-device ESP32 web server",
    ],
    conceptsLearned: [
      "Persistence of vision",
      "ESP32",
      "WS2812 / NeoPixel addressable LEDs",
      "RMT peripheral driving",
      "Rotational timing & synchronisation",
      "Embedded C++",
      "On-device web server (IoT)",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifham-mohamed/POV_GLOBE",
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/images/projects/pov-globe.png",
  },
  {
    id: "master-todo",
    title: "Master Todo - React + Firebase Task App",
    href: "https://github.com/ifham-mohamed/Master-Todo",
    dates: "2024",
    active: false,
    featured: false,
    role: "Personal Project",
    context:
      "Personal learning project — a React + Vite single-page app with Firebase persistence and Tailwind styling.", // corrected from "vanilla JavaScript": repo is React/Vite/Firebase/Tailwind
    oneLiner:
      "A todo app built to practise React state patterns with Firebase-backed persistence.",
    description:
      "A React + Vite todo app with Firebase persistence and Tailwind CSS, built to practise component-driven state management against a hosted backend.",
    overview:
      "Master Todo is a small, self-contained app for getting hands-on with React state management and a hosted backend. It uses Firebase for persistence and auth and Tailwind for styling, scaffolded with Vite for a fast dev loop.",
    problem:
      "A focused space to practise React state management and CRUD against a hosted realtime/auth backend, without standing up a server.",
    flow: {
      diagram: `flowchart LR
  UI["React + Vite UI"] --> FB["Firebase: Firestore + Auth"]`,
      caption: "React/Vite client persisting directly to Firebase.",
    },
    technologies: ["React", "Vite", "Firebase", "Tailwind CSS", "JavaScript"],
    bestPractices: [
      "Drove the UI from component state rather than ad-hoc DOM mutation",
      "Used Firebase for persistence/auth instead of hand-rolling a backend",
      "Kept Firebase config in environment variables",
      "Scaffolded with Vite for a fast dev and build loop",
    ],
    challenges: [
      {
        challenge: "Keeping the UI in sync with a remote store.",
        resolution:
          "Used Firebase listeners so the list reflects backend state without manual refresh.", // TODO(verify)
      },
    ],
    outcomes: [
      "Working React + Firebase todo app",
      "Hands-on practice with CRUD against a hosted backend",
    ],
    conceptsLearned: [
      "React",
      "Vite",
      "Firebase (Firestore + Auth)",
      "Tailwind CSS",
      "Component state management",
      "CRUD operations",
      "Environment configuration",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifham-mohamed/Master-Todo",
        icon: <Icons.github className="size-3" />,
      },
    ],
  },
];

/**
 * Get featured projects (for homepage)
 */
export const getFeaturedProjects = (count: number = 4): Project[] => {
  return projects.filter((p) => p.featured).slice(0, count);
};

/**
 * Get all projects
 */
export const getAllProjects = (): Project[] => {
  return projects;
};

/**
 * Get project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

/**
 * Get active projects
 */
export const getActiveProjects = (): Project[] => {
  return projects.filter((p) => p.active);
};

export default projects;
