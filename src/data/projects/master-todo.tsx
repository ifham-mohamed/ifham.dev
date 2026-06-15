import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const masterTodo: Project = {
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
  };
