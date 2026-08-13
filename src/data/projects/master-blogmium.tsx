import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const masterBlogmium: Project = {
    id: "master-blogmium",
    title: "Master Blogmium - Blogging Platform (Auth MVP)",
    href: "https://github.com/ifham-mohamed/Master-Blogmium", // TODO(verify): confirm the public repo URL
    dates: "2024", // TODO(verify): set exact dates
    active: false,
    visual: "schema",
    signals: ["JWT auth", "httpOnly sessions", "OAuth 2.0"],
    featured: false,
    role: "Solo Developer",
    context:
      "Solo, self-directed learning project. Full-stack MERN: an Express/MongoDB REST API and a React/Redux SPA with Firebase Authentication and Firebase Cloud Storage. Currently an auth MVP for a planned blogging platform — blog-post CRUD is not implemented yet (the User model is the only collection).",
    oneLiner:
      "A MERN-stack blogging-platform foundation with end-to-end JWT authentication, Google OAuth, and a resumable Firebase Storage profile-picture upload, built for individual bloggers who want to publish and manage their own content.",
    description:
      "MERN auth MVP for a planned blogging platform: JWT httpOnly-cookie sessions, Google OAuth, Redux Toolkit + redux-persist, and a resumable Firebase Storage profile-picture upload (shipped, then refactored out in HEAD).",
    overview:
      "Master Blogmium is the authentication and media foundation for a blogging platform — built to own an end-to-end auth + upload pipeline from sign-up to authenticated profile-picture upload. It ships email/password + Google OAuth with JWT httpOnly-cookie sessions, Redux-persisted UI state, and a PrivateRoute-gated dashboard. Blog-post CRUD is the next milestone (not yet built); the Firebase resumable-upload feature was implemented and later stripped during a refactor.",
    problem:
      "I had built isolated React UIs and isolated Node scripts, but had never owned an end-to-end auth + media pipeline from sign-up to authenticated profile-picture upload. The gap was the glue work: cookie-based JWT sessions across a separate API origin, an OAuth provider callback, resumable file upload with real-time client-side progress, and Redux state that survives a hard refresh without re-hitting the API. (Learning gap, not a production pain point.)",
    flow: {
      diagram: `flowchart LR
  A["React SPA (Vite + React Router v6)"] -->|"POST /api/auth/*"| B["Express REST API"]
  B -->|"bcryptjs hash + jwt.sign"| C[("MongoDB Atlas (Mongoose)")]
  B -->|"httpOnly cookie: access_token"| A
  A -->|"signInWithPopup"| D["Firebase Auth (Google OAuth)"]
  D -->|"name, email, photoURL"| A
  A -->|"uploadBytesResumable + progress"| E["Firebase Cloud Storage"]
  E -->|"getDownloadURL"| A
  A -->|"dispatch"| F["Redux Toolkit Store"]
  F -->|"redux-persist"| G["Browser localStorage"]
  A -->|"PrivateRoute guard"| H["Dashboard / Profile"]`,
      caption:
        "JWT lives in an httpOnly cookie; the user profile lives in redux-persist — token and profile stored separately and appropriately. (Firebase upload path was later refactored out of HEAD.)",
    },
    technologies: [
      "React",
      "Vite",
      "Redux Toolkit",
      "redux-persist",
      "Tailwind CSS",
      "Flowbite React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcryptjs",
      "Firebase Auth",
      "Firebase Storage",
    ],
    bestPractices: [
      "Passwords salted + hashed with bcryptjs (cost 10); the password field is stripped off before any response — plaintext never leaves memory",
      "JWT delivered as a server-set httpOnly cookie (not in the response body) to mitigate XSS token exfiltration",
      "Separation of concerns: API split routes → controllers → models with a shared errorHandler; client split pages / components / redux / slices",
      "Client-direct resumable upload to object storage instead of streaming through the API — keeps Express memory flat and unlocks real-time byte-level progress",
      "Hydrated global state via redux-persist so the authenticated UI survives a hard refresh; token (cookie) and profile (store) are stored separately and appropriately",
      "Vite dev proxy (/api → backend) for same-origin dev requests, avoiding CORS workarounds",
    ],
    challenges: [
      {
        challenge:
          "Building a polished file-picker UX with a real progress indicator — the default <input type='file'> is unstylable, and I wanted a circular ring tied to actual upload bytes, not a fake spinner.",
        resolution:
          "Hid the native input and used a useRef click-forward from a styled avatar preview; generated an instant preview with URL.createObjectURL, then wired Firebase's uploadBytesResumable snapshot (bytesTransferred/totalBytes) into state driving react-circular-progressbar. (Implemented across commits 7912282..521c96b, later stripped in HEAD during a refactor — DashProfile is currently a stub.)",
      },
      {
        challenge:
          "Keeping the user signed in across a hard refresh while keeping the JWT out of reach of JavaScript.",
        resolution:
          "Split storage by purpose: the token lives in an httpOnly access_token cookie the browser sends automatically (JS can never read it); the user profile lives in the Redux store, rehydrated from localStorage by redux-persist on boot.",
      },
    ],
    outcomes: [
      "Shipped email/password sign-up, sign-in, and Google OAuth flows with JWT-cookie sessions backed by MongoDB Atlas",
      "Implemented (and later refactored out) a Firebase Cloud Storage resumable upload with a useRef file picker, URL.createObjectURL preview, and a react-circular-progressbar UI driven by real upload progress",
      "Redux Toolkit + redux-persist so authenticated state survives reloads; a PrivateRoute pattern gating /dashboard; light/dark theme with persisted preference",
      // NOTE: honest status — auth MVP; blog-post CRUD not implemented yet. Kept off the 1-page CV until the core blogging feature ships.
      "Scope: an authentication MVP — blog-post CRUD is the next milestone and is not yet built, and there is no production deployment",
    ],
    conceptsLearned: [
      "JWT-based stateless authentication",
      "httpOnly cookies for session tokens (XSS mitigation)",
      "Password hashing with bcrypt (salt + cost factor)",
      "OAuth 2.0 / OIDC via Firebase Authentication",
      "Resumable / chunked file uploads with progress callbacks",
      "Client-direct upload to object storage (offloading the API tier)",
      "Redux Toolkit + redux-persist (state rehydration)",
      "React Router v6 protected routes (Outlet / Navigate)",
      "Mongoose ODM & MongoDB document modeling",
      "REST API layering (routes → controllers → models)",
      "Express centralised error middleware (next(err))",
      "Vite dev proxy for cross-origin API in local dev",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifham-mohamed/Master-Blogmium", // TODO(verify): confirm URL
        icon: <Icons.github className="size-3" />,
      },
    ],
    // image omitted intentionally — add public/images/projects/master-blogmium.png to enable the hero
  };
