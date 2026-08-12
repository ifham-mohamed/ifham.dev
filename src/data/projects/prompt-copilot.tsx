import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const promptCopilot: Project = {
    id: "prompt-copilot",
    title: "Prompt Copilot - Cross-Surface AI Prompt Manager",
    href: "https://github.com/ifham-mohamed/prompt-copilot",
    dates: "Dec 2025 - Jan 2026",
    active: true,
    featured: true,
    role: "Solo Developer — end-to-end",
    context:
      "Solo, end-to-end portfolio project: SRS authoring → relational schema → REST API contract → multi-modal auth → three independently bundled clients (web, Chrome, VS Code) → Chrome Web Store and VS Code Marketplace listings.",
    oneLiner:
      "A cross-surface prompt-management ecosystem — a Next.js 15 dashboard, a Chrome MV3 extension, and a VS Code extension on one Prisma/PostgreSQL API — that lets developers organise, version, and one-click-insert reusable AI prompts into ChatGPT, Claude, Gemini, Perplexity, and the IDE.",
    description:
      "Cross-surface AI prompt manager — a Next.js 15 dashboard, a Chrome MV3 extension, and a VS Code extension on one Zod-validated Prisma/PostgreSQL API — with one-click insertion into ChatGPT, Claude, Gemini and Perplexity, offline-first sync, and version history.",
    overview:
      "Prompt Copilot keeps a developer's reusable AI prompts in one versioned, searchable library and inserts them wherever they work. A Next.js 15 dashboard handles CRUD, hierarchical categories and search; a Chrome MV3 extension injects prompts into ChatGPT, Claude, Gemini and Perplexity with offline-first caching; and a VS Code extension inserts them (with {{variable}} substitution) at the cursor. All three share one Zod-validated Prisma/PostgreSQL API, authenticated by NextAuth sessions for the web and per-user API keys for the extensions.",
    problem:
      "Working across ChatGPT, Claude, Gemini and VS Code, the best prompts a developer writes end up scattered across Notion, screenshots and chat scrollback. Every reuse means alt-tabbing out of flow, re-finding the prompt, re-typing template variables, and losing the version history of what worked. No existing tool indexed prompts across all four AI sites and the IDE under one searchable, versioned library with template-variable substitution.",
    flow: {
      diagram: `flowchart LR
  U["Developer"] --> D["Next.js 15 Dashboard"]
  U --> B["Chrome MV3 Extension"]
  U --> V["VS Code Extension"]
  D -->|"NextAuth JWT cookie"| A["Next.js API Routes (Zod-validated)"]
  B -->|"x-api-key header"| A
  V -->|"x-api-key header"| A
  A --> AU["NextAuth.js v5 (GitHub / Google OAuth, bcryptjs)"]
  A --> P["Prisma 6 ORM"]
  P --> DB[("PostgreSQL on Supabase")]
  A --> VER["Version table (auto-snapshot on mutation)"]
  B --> SW["MV3 Service Worker (chrome.alarms, 15-min sync)"]
  SW --> CACHE["chrome.storage.local cache + offline queue"]
  B --> CS["Content Scripts"]
  CS --> AI["ChatGPT / Claude / Gemini / Perplexity inputs"]
  V --> WV["Sidebar Webview"]
  WV -->|"postMessage: insert / copy"| EH["Extension Host"]
  EH -->|"showInputBox per variable"| ED["VS Code Active Editor"]`,
      caption:
        "One Zod-validated Prisma API serves three clients — web (NextAuth cookie), Chrome and VS Code (x-api-key) — with offline-first sync in the browser and {{variable}} substitution in the editor.",
    },
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "NextAuth.js",
      "Zod",
      "Chrome Extension (MV3)",
      "VS Code Extension",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Zustand",
      "fuse.js",
    ],
    bestPractices: [
      "End-to-end type safety: TypeScript strict across all three clients, Zod runtime schemas at every API boundary, and Prisma-generated types from one schema",
      "Multi-modal authentication: NextAuth.js v5 JWT sessions for the dashboard plus a separate x-api-key channel for the extensions, so they never host an OAuth redirect flow",
      "Soft deletes + automatic version history: deletedAt columns give recovery and a Version snapshot row is written on every prompt mutation",
      "Offline-first browser extension: chrome.storage.local cache, an offline write queue, and chrome.alarms background sync every 15 minutes",
      "Separation of concerns across surfaces: web, Chrome and VS Code are three independent bundles (Next.js / esbuild / webpack) sharing only the REST contract",
      "Per-tenant data scoping by construction: every Prisma query is scoped to a userId resolved from session or API key before RBAC is layered on",
    ],
    challenges: [
      {
        challenge:
          "Reliably inserting text into the diverse inputs used by ChatGPT, Claude, Gemini and Perplexity — each uses a different element (textarea vs contenteditable vs Lexical/ProseMirror), and a naive value/innerText write doesn't trigger React's synthetic events, so the controlled input never re-renders and Send stays disabled.",
        resolution:
          "Built a per-platform selector table with explicit fallbacks (data-id, role, contenteditable), then fired native input and change events on the target after writing so React/Lexical pick up the value and enable submit.",
      },
      {
        challenge:
          "Three clients with three storage models had to share one auth model without forcing the extensions to host an OAuth redirect flow.",
        resolution:
          "Added a per-user apiKey to the User model and a second auth path that resolves a user from an x-api-key header before falling back to the session; users mint a key in settings and paste it into each extension once.",
      },
    ],
    outcomes: [
      "Three integrated client surfaces shipped on one backend: a Next.js 15 dashboard (OAuth + credentials, prompt CRUD, hierarchical categories, fuzzy + SQL search, soft delete + version history, per-user API keys), a Chrome MV3 extension (one-click insert into ChatGPT/Claude/Gemini/Perplexity, offline cache, 15-min sync), and a VS Code extension ({{variable}} substitution, editor/clipboard insert)",
      "Prisma schema with User, Prompt, Category (self-referencing hierarchy) and Version; soft deletes, per-user API keys, and usageCount updated from every surface",
      "Seeded 11 default categories with subcategories available on first sign-in",
      "Published to the Chrome Web Store and VS Code Marketplace", // TODO(verify): add the two listing URLs + any install/rating counts
      // NOTE: do not claim tests/CI/Husky — scaffolding exists in package.json but no test files, workflows, or hooks are on disk yet
    ],
    conceptsLearned: [
      "Chrome Manifest V3 (service worker + content scripts)",
      "VS Code Webview API (postMessage to extension host)",
      "Next.js 15 App Router with React 19 Server Components",
      "Prisma ORM on PostgreSQL (Supabase), self-referencing hierarchies",
      "OAuth 2.0 / OIDC via NextAuth.js v5 (GitHub + Google)",
      "JWT sessions + API-key (x-api-key) authentication",
      "Zod schema validation at every API boundary",
      "Soft deletes & append-only version-snapshot tables",
      "Content-script injection into React/Lexical/ProseMirror inputs",
      "Offline-first sync (chrome.alarms, chrome.storage.local, write queue)",
      "Template-variable ({{variable}}) substitution",
      "Fuse.js fuzzy search + PostgreSQL filtering/pagination",
      "TanStack Query (stale-while-revalidate) + Zustand",
      "Three independent build pipelines (Next.js, esbuild, webpack)",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifham-mohamed/prompt-copilot",
        icon: <Icons.github className="size-3" />,
      },
      // TODO(verify): add Chrome Web Store + VS Code Marketplace listing URLs (type: "Live" / "Demo")
    ],
    // image: "/images/projects/prompt-copilot.png",  <- restore once the file exists in public/images/projects/
    image: "",
  };
