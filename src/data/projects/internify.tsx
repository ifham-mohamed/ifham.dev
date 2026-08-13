import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const internify: Project = {
    id: "internify",
    title: "Internify - Intern Tracking System",
    href: "https://internify.fit",
    dates: "Jun 2024 - Sep 2024",
    active: false,
    visual: "schema",
    signals: ["React + TypeScript", "SPA routing", "Vite tooling"],
    featured: false,
    role: "Front-End Developer — Group Project",
    context:
      "Group project under the ITS-Development-Team org for the ITS Batch 21 internship recruitment program. I worked on the React/Vite/TypeScript front-end — my specific contribution was the CV upload and management features. The backend (Node.js/Express/PostgreSQL/AWS) was built by the team.", // TODO(verify): what is "ITS" (society / institute / company), and was this a course, club, paid, or volunteer build?
    oneLiner:
      "A React/Vite/TypeScript student recruitment portal for the ITS Batch 21 program, with a multi-round company application flow for students and a CSV-driven admin dashboard for managing the student roster.",
    description:
      "Front-end (React/Vite/TypeScript, Material Tailwind) for the Internify intern-tracking system — a multi-round company application flow for students and a CSV-driven admin roster dashboard; my contribution was the CV upload and management features.",
    overview:
      "Internify centralises the ITS Batch 21 internship recruitment program: students browse the companies offered each round, apply, and manage their profiles and CVs, while admins manage the student roster (manually or via CSV import). I built front-end features — principally CV upload and management — on a group build; the Node/Express/PostgreSQL/AWS backend was the team's.",
    problem:
      "The recruitment program needed a central place for Batch 21 students to view the companies offered each round and submit applications, plus a way for admins to manage the roster — the admin CSV-import path indicates the prior bottleneck was manual, one-by-one entry of student records.", // TODO(verify): the prior workflow (spreadsheets / email / paper?) and batch size / companies / rounds per cycle
    flow: {
      diagram: `flowchart LR
  A["Student / Admin browser"] --> B["Vite + React 18 SPA"]
  B --> C["react-router-dom routes"]
  C --> D["Dashboard pages (rounds, profile, manage-cvs, myapplications)"]
  C --> E["Admin pages (adminManageStudent)"]
  D --> F["Material Tailwind + MUI widgets"]
  E --> F
  F --> G["MaterialTailwindContext (useReducer)"]
  D --> H["Mock data (src/data)"]
  E --> H
  E --> I["PapaParse CSV import"]
  D --> J["react-dropzone + FileReader (base64)"]
  E --> J
  H -. planned .-> K["Backend / DB / Auth (separate, team)"]`,
      caption:
        "The front-end SPA (this repo) reads mock data and handles CV/CSV/image input in-browser; the Node/Express/PostgreSQL/AWS backend is a separate, team-owned service.",
    },
    technologies: [
      "TypeScript",
      "React",
      "Vite",
      "Material Tailwind",
      "MUI",
      "React Router",
      "PapaParse",
      "react-dropzone",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "AWS",
    ],
    bestPractices: [
      "Strict TypeScript across the project (strict mode plus unused-locals/params enforcement)",
      "Zero-warning lint gate (eslint --max-warnings 0) in the build scripts",
      "Feature-aligned folder layout: student (dashboard) vs admin UI separated, with widgets co-located per feature",
      "Mock-data abstraction (one module per entity) so the future swap to a real API is a one-file change per entity",
      "A single reusable drag-and-drop upload widget shared across avatar, cover, and CV uploads",
      "Bulk-import path (CSV via PapaParse) so admins onboard a roster instead of N manual form submissions",
    ],
    challenges: [
      {
        challenge:
          "CV and image uploads needed to work end-to-end in the prototype even though there is no file-storage backend yet.",
        resolution:
          "Used react-dropzone for drag-and-drop UX and FileReader.readAsDataURL to convert files to base64 for in-memory preview/storage, with a 50 MB client-side guard — structured so it can swap to presigned-URL uploads once storage is wired in.",
      },
      {
        challenge:
          "Onboarding a whole batch one form at a time wouldn't scale, but admins still needed to fix single records.",
        resolution:
          "A dual-path Add Student flow — manual entry plus bulk CSV ingest (PapaParse) — both feeding the same admin table.", // TODO(confirm): confirm whether this admin CSV path was your work or a teammate's
      },
    ],
    outcomes: [
      "Front-end shipped: a multi-round company application page (filter by round / role / apply-limit), a student profile editor (avatar + cover upload), and an admin manage-student table (search, edit/delete, add via manual form or CSV)",
      "My contribution: the CV upload and management features (drag-and-drop, base64 preview, 50 MB guard)",
      "Two merged feature PRs (epic/application-round, feature/student-profile) under the team org",
      // TODO(verify): student/company/round counts; confirm the live deployment URL (Internify Live)
    ],
    conceptsLearned: [
      "React 18 with TypeScript (strict mode)",
      "Vite build tooling & HMR workflow",
      "SPA routing with react-router-dom v6 (nested routes, layouts)",
      "Tailwind CSS utility-first styling",
      "Material Tailwind + MUI component composition",
      "React Context + useReducer for global UI state",
      "Drag-and-drop file upload UX (react-dropzone)",
      "Client-side CSV ingestion (PapaParse)",
      "Browser FileReader API & base64 DataURL handling",
      "Feature-based folder architecture & component reuse",
      "ESLint + TypeScript strict-mode quality gating",
      "Git feature-branch + PR workflow under a team org",
    ],
    links: [
      {
        type: "Website",
        href: "https://internify.fit",
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: "Source",
        href: "https://github.com/ITS-Development-Team", // TODO(verify): confirm the exact repo URL under the ITS-Development-Team org
        icon: <Icons.github className="size-3" />,
      },
    ],
    // image: "/images/projects/internify.png",  <- restore once the file exists in public/images/projects/
    image: "",
  };
