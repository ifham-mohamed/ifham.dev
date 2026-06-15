import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const attendify: Project = {
    id: "attendify",
    title: "Attendify - Classroom Attendance App",
    href: "https://github.com/ifham-mohamed/attendify-be", // TODO(verify): confirm the public repo URL
    dates: "2025 - Present", // TODO(verify): set exact dates
    active: true,
    featured: true,
    role: "Full-Stack Developer (Solo)",
    context:
      "Solo, end-to-end build (NestJS backend + Expo/React Native mobile, design through EAS release) for a specific schoolteacher whose paper register was slow to fill and slower to re-tally into the gender-split per-division reports the school expects monthly. Scope: data model, REST API, auth, mobile UI, state management, and internal APK distribution.",
    oneLiner:
      "A mobile-first classroom attendance app that lets a teacher mark Present/Absent in one tap per student and auto-produces the boys/girls-split daily, weekly, monthly and yearly summaries their school requires.",
    description:
      "Mobile-first classroom attendance app (Expo RN + NestJS) with multi-tenant data isolation, idempotent attendance writes, and server-computed gender-split daily/weekly/monthly/yearly summaries.",
    overview:
      "Attendify replaces a teacher's paper register. The Expo/React Native app captures attendance in one tap per student on a date-navigated list, and a NestJS + PostgreSQL backend computes the gender-split daily, weekly, monthly and yearly summaries the school needs — on demand, instead of a manual month-end re-count.",
    problem:
      "The teacher marked a paper register daily, then at month-end manually re-counted Present days, split by gender, per class/division for school reports. That re-tally is error-prone, not reusable, and impossible to audit. The app needed one-tap-per-student capture and school-format summaries on demand.", // TODO(verify): add the teacher's baseline metric (e.g. ~15 min/day on paper, ~2 hr/month tally)
    flow: {
      diagram: `flowchart LR
  A["Expo RN App (NativeWind + Expo Router)"] -->|"dispatch / select"| B["Redux Toolkit + RTK Query"]
  B -->|"Bearer JWT (prepareHeaders)"| C["NestJS REST API"]
  C -->|"JwtAuthGuard + ownerId scope"| D["Modules: Auth / User / SchoolClass / Student / Attendance"]
  D -->|"TypeORM"| E[("PostgreSQL")]
  C --> F["Swagger /docs (OpenAPI)"]
  B -->|"redux-persist whitelist:auth"| G["AsyncStorage"]
  H["EAS Build (preview APK)"] -.->|"internal distribution"| A`,
      caption:
        "Expo client (RTK Query) talks to a JWT-guarded NestJS API scoped by ownerId over TypeORM/PostgreSQL; auth state is persisted on-device and the app ships as an internal EAS APK.",
    },
    technologies: [
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "JWT",
      "Swagger/OpenAPI",
      "Expo",
      "React Native",
      "Redux Toolkit",
      "RTK Query",
      "NativeWind",
      "TypeScript",
    ],
    bestPractices: [
      "Multi-tenant ownership isolation: every class/student/attendance query is scoped by ownerId from the JWT, so one teacher can never read or mutate another's data",
      "Idempotent writes: a composite unique index (studentId, date) plus an upsert path means the same mark sent twice never creates duplicates",
      "Password hygiene: bcrypt-hashed passwords and a sanitize() projection that strips the hash before any user object leaves the API; password reset requires the old password",
      "Hook-per-screen separation of concerns: each screen has a sibling use<Screen>.tsx owning data/effects, leaving the screen file as pure JSX",
      "Cache-correctness over manual refetch: RTK Query tags drive invalidation, so marking a student auto-refreshes dependent summary screens",
      "End-to-end type safety: TypeScript strict, @/* path aliases, and Expo Router typed routes from route name to API call to Redux state",
    ],
    challenges: [
      {
        challenge:
          "School reports demand boys/girls splits at four granularities (daily, weekly, monthly, yearly), and the academic 'week' is week-within-the-month (1-5), not ISO week — naive per-endpoint SQL would be four near-duplicate queries disagreeing on edge cases.",
        resolution:
          "Centralised the maths in the attendance service: fetch the marks for the date range once, then group in-memory by a custom week-of-month function and by gender. One source of truth feeds all summary endpoints with render-ready totals.",
      },
      {
        challenge:
          "On Android cold start, the login screen flashed before redux-persist rehydrated the saved JWT.",
        resolution:
          "Wrapped the app in PersistGate (whitelist: auth) and gated the entry route on the rehydrated accessToken before choosing login vs class-select; auth routes also suppress the bottom-tab layout.",
      },
    ],
    outcomes: [
      "Shipped both halves end-to-end: NestJS API on PostgreSQL with Swagger at /docs; mobile app distributed as an internal APK via the EAS preview profile (com.akarms.attendify)",
      "Replaces the paper register: one-tap Present/Absent per student with server-computed daily/weekly/monthly/yearly gender-split summaries rendered without an extra round-trip",
      "~35 TypeScript files across 5 backend modules; ~25 mobile screen/component files plus a dedicated attendance utils module — all under TS strict",
      // TODO(verify): add usage metrics (students/classes tracked, time saved vs paper, month-end tally eliminated)
    ],
    conceptsLearned: [
      "JWT bearer authentication (NestJS Passport guards)",
      "Role-Based Access Control (TEACHER / STUDENT / ADMIN)",
      "Multi-tenant data isolation via ownership scoping",
      "Composite unique indexes for idempotent writes / upserts",
      "TypeORM relations & cascading deletes",
      "RTK Query with tag-based cache invalidation",
      "redux-persist + PersistGate rehydration",
      "Expo Router file-based & typed routes",
      "NativeWind / Tailwind in React Native",
      "DTO validation (class-validator) + Swagger/OpenAPI",
      "EAS Build profiles & internal APK distribution",
      "React Native New Architecture + React Compiler",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifham-mohamed/attendify-be", // TODO(verify): confirm URL; add mobile repo if public
        icon: <Icons.github className="size-3" />,
      },
    ],
    // image omitted intentionally — add public/images/projects/attendify.png to enable the hero
  };
