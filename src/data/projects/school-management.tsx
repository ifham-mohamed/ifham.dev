import type { Project } from "@/types";

export const schoolManagement: Project = {
  id: "school-management",
  title: "School Management System - Multi-Tenant Laravel Platform",
  href: "",
  dates: "Jun 2026 - Jun 2026",
  active: false,
  featured: true,
  visual: "schema",
  signals: ["Multi-tenant", "Model-layer isolation", "RBAC"],
  projectType: "Team Project",
  role: "Developer / Team Member (Small Team)", // TODO(verify): solo / team / course, and your exact responsibility
  context:
    "A Laravel 13 multi-tenant school-administration platform (Blade + Alpine + Tailwind 4). Two admin tiers: a Super Admin (platform operator) onboards schools and assigns admins, and a per-school School Admin manages teachers, grades, academic years, and student enrollments — with strict school-level data isolation as a non-negotiable constraint.", // TODO(verify): team/course/client + timeline
  oneLiner:
    "A multi-tenant school-administration platform that lets a platform operator onboard schools and assign admins, while each School Admin manages their own teachers, grades, academic years, and student enrollments under role-based access control.",
  description:
    "Multi-tenant Laravel 13 school-admin platform with two admin tiers and strict per-school isolation: Sanctum auth + role middleware, Eloquent tenant scopes, 19 Form Request validators, and a service layer over a 16-migration schema.",
  overview:
    "Small/mid schools juggle student records, teacher rosters, grade structures and yearly enrollments across spreadsheets with no shared platform that enforces school-level isolation when one operator runs multiple schools. This platform provides two administrative tiers (Super Admin for the operator, School Admin per school) so onboarding a new school is a guarded workflow rather than a manual DB edit, and a School Admin can never read or mutate another school's data — enforced at the model layer via Eloquent query scopes.",
  problem:
    "Small-to-mid schools typically juggle student records, teacher rosters, grade structures, and yearly enrollments across spreadsheets and ad-hoc tools, with no shared platform that enforces school-level data isolation when one operator runs multiple schools. The platform adds two administrative tiers so onboarding is a guarded workflow and one school admin cannot touch another school's data.", // TODO(verify): a 'before' number (manual onboarding hours, schools tracked via spreadsheets, cross-school error rate)
  flow: {
    diagram: `flowchart LR
  U["Browser (Blade + Alpine + Tailwind 4)"] --> R["Laravel 13 Router (web / api / super-admin / school-admin)"]
  R --> M["RoleMiddleware (auth + role + account_status)"]
  M --> C["Controllers (Auth, SuperAdmin/*, SchoolAdmin/*)"]
  C --> FR["FormRequest validation (19 classes)"]
  C --> S["Services (AuthService, WipComponentService)"]
  C --> E["Eloquent models (11) + scopes (forSchool, active, search)"]
  E --> DB[("SQLite dev / MySQL or Postgres prod")]
  C --> AR["ApiResponse helper (consistent JSON)"]
  AR --> U
  A["Sanctum 4 (SPA cookie + API token)"] --> M`,
    caption:
      "Role middleware gates four audience-split route files; controllers re-derive school_id from the authenticated user and query through forSchool() scopes so cross-tenant access is impossible by construction.",
  },
  technologies: [
    "PHP",
    "Laravel",
    "Blade",
    "Alpine.js",
    "Tailwind CSS",
    "Laravel Sanctum",
    "Eloquent",
    "MySQL / SQLite",
    "Vite",
    "PHPUnit",
  ],
  bestPractices: [
    "Strict multi-tenant isolation by construction: every tenant-scoped query goes through scopeForSchool($schoolId), so a forgotten WHERE in a controller can't leak cross-tenant rows",
    "RBAC with defense in depth: RoleMiddleware guards the route, the controller re-derives school_id from the authenticated user (never from request input), and the UI hides per-role actions",
    "Centralized API response shape: one ApiResponse helper (success/error/unauthorized/forbidden/notFound/validationError) keeps every endpoint consistent in payload and HTTP status",
    "Form Request validation per endpoint: 19 dedicated FormRequest classes with rules() + messages() keep controllers thin and validation declarative",
    "Reversible, ordered migrations with proper down(); soft deletes on Student/Teacher for audit trail; UUIDs auto-set in model boot() for User and School",
    "Reproducible local setup: composer setup (install -> env -> key -> migrate -> npm build) and composer dev (server + queue + logs + Vite) so a contributor goes clone-to-running in one command",
  ],
  challenges: [
    {
      challenge:
        "Preventing cross-tenant data leaks when one User model serves both Super Admin and School Admin against shared global tables (teachers, students) linked to schools via pivot tables.",
      resolution:
        "Enforced isolation at the model layer with Eloquent query scopes (scopeForSchool, scopeActive) and resolved school_id from the authenticated user inside the controller rather than trusting any client-supplied id, so even a tampered form field can't reach another school's rows.",
    },
    {
      challenge:
        "Managing the academic-year lifecycle (pending -> active -> completed) safely so enrollments attach to the correct year and state transitions don't corrupt history.",
      resolution:
        "Modelled academic years and academic-grade-sections as first-class entities with explicit status, scoping enrollments to the active year per school.", // TODO(confirm): replace with the real 2nd blocker you fought (e.g. mid-year transfers, Sanctum SPA+token coexistence, Sheaf UI + Tailwind 4)
    },
  ],
    evidence: [
      { value: "11", label: "Eloquent models" },
      { value: "16", label: "Migrations" },
      { value: "19", label: "Form Request validators" },
      { value: "12", label: "Controllers", detail: "Across 4 audience-split route files" },
    ],
  outcomes: [
    "Shipped: Auth + RBAC, Super Admin user management, school onboarding with admin assignment, teacher/student/grade/grade-section management, academic-year lifecycle, and student enrollment with transfer/completed/dropped states",
    "11 Eloquent models, 16 migrations, 12 controllers, 19 Form Request validators, 4 audience-split route files, and 15+ reusable Blade UI components",
    "Strict multi-tenant isolation enforced at the model layer (Eloquent scopes), not just the UI",
    // NOTE (honest gaps, not for display): tests are placeholder only (no domain/RBAC/enrollment tests); no CI/CD or Dockerfile; no rate limiting / audit logging / 2FA / background jobs yet.
    // TODO(verify): deployment URL / real users / metrics (schools/students seeded, test coverage)
  ],
  conceptsLearned: [
    "Multi-tenant SaaS architecture",
    "Role-Based Access Control (RBAC) with middleware",
    "Eloquent query scopes for tenant isolation",
    "Laravel Sanctum (SPA cookie + API token auth)",
    "Form Request validation",
    "RESTful API design with consistent response envelopes",
    "TALL-stack frontend (Tailwind + Alpine + Laravel + Blade components)",
    "Migrations with reversible down() and soft deletes",
    "UUID primary identifiers",
    "Service-layer pattern in Laravel",
    "Vite + Tailwind 4 build pipeline",
    "Reproducible dev environment (concurrently)",
  ],
  links: [
    // TODO(verify): add repo URL + demo URL when available (currently local-only, branch dev)
  ],
  // image omitted intentionally — add public/images/projects/school-management.png to enable the hero
};
