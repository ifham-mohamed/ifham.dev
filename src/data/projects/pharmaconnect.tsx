import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const pharmaconnect: Project = {
    id: "pharmaconnect",
    title: "PharmaConnect - Telehealth & Prescription Platform",
    href: "https://github.com/ifham-mohamed/PharmaConnect-WebApp", // TODO(verify): confirm the public repo URL
    dates: "2025", // TODO(verify): set exact dates
    active: false,
    visual: "topology",
    signals: ["GPT-4o Vision extraction", "Additive AI merges", "Zoom OAuth"],
    featured: true,
    role: "Solo Developer — end-to-end (portfolio)",
    context:
      "Solo, end-to-end portfolio build across two repositories (a NestJS API + a Next.js App-Router client) and four roles (admin, doctor, patient, pharmacist). Sole owner of system design, data model, REST API, AI integration, frontend, auth, and DevOps — built to demonstrate a non-trivial healthcare workflow with third-party integrations (Zoom Server-to-Server OAuth, OpenAI GPT-4o-mini Vision, Google OAuth).",
    oneLiner:
      "A role-based telehealth and prescription-management platform where doctors run Zoom consultations, generate digital prescriptions whose contents are auto-extracted from photos by GPT-4 Vision, and maintain per-condition patient timelines that drive automated follow-up reminders.",
    description:
      "Role-based telehealth platform (NestJS + Next.js 15) with Zoom consultations, GPT-4o-mini Vision prescription extraction that additively merges into a per-condition patient timeline, and cron-driven follow-up reminders.",
    overview:
      "PharmaConnect targets the slice between 'WhatsApp + paper' and a full EMR: a digital prescription is generated alongside the consultation, GPT-4o-mini Vision extracts its contents from an uploaded photo, and every action (visit, lab, med change, follow-up) is pinned to a per-condition timeline. Doctors run Zoom calls; cron jobs fire follow-up reminders; four roles (admin, doctor, patient, pharmacist) operate through role-segmented dashboards.",
    problem:
      "Paper prescriptions are lost, illegible, and have no audit trail: a misplaced slip means the dose history is gone, a misread drug name can't be disproven, and nothing ties a condition (e.g. Type 2 Diabetes) to the prescriptions, follow-ups, labs, and appointments issued for it. Small clinics can't justify a heavyweight EMR for this.", // TODO(verify): add a baseline metric (e.g. % of paper scripts misread, or time-on-paper)
    flow: {
      diagram: `flowchart LR
  A["Next.js 15 (App Router)"] -->|"RTK Query + Bearer JWT"| B["NestJS REST API"]
  A -->|"Zoom Web SDK"| Z["Zoom Cloud"]
  B -->|"JwtAuthGuard"| M["Modules: Auth, Appointment, Schedule, Prescription, Meeting, ConditionBook, FollowUp, Notification"]
  M -->|"TypeORM"| D[("MySQL")]
  M -->|"GPT-4o-mini Vision"| O["OpenAI API"]
  M -->|"S2S OAuth"| Z
  M -->|"Multer upload"| I["External Image Service"]
  B -->|"Google OAuth 2.0"| G["Google Identity"]
  S["@nestjs/schedule cron"] -->|"every 10 min: fire reminders"| M
  S -->|"every 30 min: deactivate expired schedules"| M
  B --> SW["Swagger /api (OpenAPI)"]`,
      caption:
        "Next.js client (RTK Query) over a JWT-guarded NestJS API; prescriptions flow through GPT-4o-mini Vision, consultations through Zoom S2S OAuth, and reminders through @nestjs/schedule cron jobs.",
    },
    technologies: [
      "NestJS",
      "TypeORM",
      "MySQL",
      "Next.js",
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "OpenAI (GPT-4o-mini Vision)",
      "Zoom SDK",
      "Google OAuth",
      "MUI",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    bestPractices: [
      "Double-booking impossible by design: compound unique indexes on Appointment(doctor, scheduledAt, appointmentNo) and DoctorSchedule(doctor, date, time-range) make race-condition double-bookings a database error, not application logic",
      "Auditable reminder dispatch: every notification fire writes a FiredNotification row (success/failure + error), and reminders past 24h auto-expire instead of lingering",
      "AI merge, not overwrite: a new prescription is merged into the patient summary (preserving prior medication history) instead of replacing it",
      "Zoom S2S token cache with a 5-minute pre-expiry refresh window, eliminating per-call OAuth round-trips",
      "Tag-based cache correctness on the client: ~12 RTK Query tags drive automatic refetches, so creating a prescription invalidates the dependent lists without manual refetch plumbing",
      "Role-segmented routing with a hydrated guard: useRequireAuth waits for InitAuthGate hydration before redirecting, so a refresh on a protected route doesn't flash login",
    ],
    challenges: [
      {
        challenge:
          "GPT-4 Vision will happily invent medications if the source image is blurry, and a naive 'replace the patient summary' workflow risks deleting a real prior-medication history on every upload.",
        resolution:
          "A two-call pipeline: (1) a Vision call extracts only what's visible in the image as structured fields; (2) a second text call merges that into the existing summary under a strict prompt contract that preserves historical medications and flags conflicts rather than overwriting — the model's role is additive, never destructive.",
      },
      {
        challenge:
          "Zoom's Web SDK init can fail on slow networks or behind corporate proxies, and a non-joinable consultation kills trust in a healthcare app on the first call.",
        resolution:
          "Wrapped SDK init in try/catch and fell back to a static Google Meet link so the consultation still happens; the failure is surfaced to telemetry, and the backend Meeting table also stores join/start URLs so the doctor can share the link out-of-band.",
      },
    ],
    evidence: [
      { value: "11", label: "Feature modules" },
      { value: "~12", label: "Domain entities" },
      { value: "~20", label: "Client routes" },
    ],
    outcomes: [
      "Two repositories shipped to a working dev demo: a NestJS API (11 feature modules, ~12 entities, MySQL, Swagger/OpenAPI at /api) and a Next.js 15 client (three role-segmented dashboards, ~20 routes)",
      "End-to-end demoable flow: doctor creates a schedule → time slots auto-generate → patient books → doctor starts a Zoom call → uploads a prescription photo → GPT-4o-mini Vision extracts and merges it → a cron job fires the follow-up reminder",
      "Condition-book timeline: per-condition typed entries (visit / note / lab / vitals / med_change / imaging / attachment) cross-linked to appointments and prescriptions, with typed follow-ups and push/sms/email reminder channels — the most distinctive feature vs a generic appointment app",
      // TODO(verify): current state is a local-only dev demo (no live URLs / real users). Add user/appointment/prescription counts once piloted, or label "demo build, deployment pending".
    ],
    conceptsLearned: [
      "OpenAI GPT-4o-mini Vision for image-to-structured-data extraction",
      "Prompt design for additive AI merges (preserve history, never overwrite)",
      "Zoom Server-to-Server OAuth with cached access tokens",
      "Embedded video SDK with graceful fallback (Zoom → Google Meet)",
      "JWT + Google OAuth 2.0 via Passport strategies in NestJS",
      "Role-Based Access Control across four roles",
      "Compound unique indexes for race-condition-free booking",
      "TypeORM relations, cascading deletes, enum-typed status columns",
      "Cron-driven background jobs (@nestjs/schedule)",
      "Auditable notification dispatch (FiredNotification pattern)",
      "RTK Query tag-based cache invalidation (~12 entity tags)",
      "Hydration-aware route protection (no flash-of-login on refresh)",
      "Next.js 15 App Router with role-segmented route trees",
      "Swagger/OpenAPI auto-generation from NestJS decorators",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifham-mohamed/PharmaConnect-WebApp", // TODO(verify): confirm repo URL; backend repo separate
        icon: <Icons.github className="size-3" />,
      },
      // TODO(verify): no live demo yet (local-only). Add a Vercel/Render deploy + a Loom of the AI-extraction flow.
    ],
    // image omitted intentionally — add public/images/projects/pharmaconnect.png to enable the hero
  };
