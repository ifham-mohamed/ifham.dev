import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const xPos: Project = {
    id: "x-pos",
    title: "X-POS - Cross-Platform Point-of-Sale App",
    href: "https://github.com/ifham-mohamed/x-pos",
    dates: "Feb 2026 - Feb 2026",
    active: false,
    featured: true,
    visual: "devices",
    signals: ["Cross-platform POS", "Refresh-token rotation", "RBAC"],
    role: "Front-End Engineer",
    context:
      "Sole front-end author. Built the entire client: file-based navigation, an 8-slice Redux state layer, a typed API/service layer with auth interceptors, RBAC, and a swappable mock backend for backend-independent development. The backend is wired-for but not in this repo (EXPO_PUBLIC_API_URL is a placeholder; the app runs against an in-process mock adapter).", // TODO(verify): solo/personal, client, employer, or course?
    oneLiner:
      "A cross-platform (iOS / Android / web) point-of-sale app for electronics-retail staff to ring up sales, manage stock, and process returns, with role-based access spanning cashier through super-admin.",
    description:
      "Cross-platform (iOS/Android/web) POS front-end for electronics retail — sales, inventory, and returns with role-based access, built on Expo and expo-router over an 8-slice Redux Toolkit store with resilient JWT auth.",
    overview:
      "X-POS is the front-end of a point-of-sale system for electronics-retail staff. It runs on iOS, Android, and the web from one Expo/React Native codebase, with file-based routing, an 8-slice Redux Toolkit store, a typed service layer with JWT auth interceptors, and a swappable mock backend that lets the UI be built and demoed before the API exists.",
    problem:
      "Electronics-retail checkout needs cashiers to ring up multi-item sales with line-level discounts, deduct stock atomically, and handle returns, while owners restrict who can discount, refund, or manage staff. The team also needed to build and demo the full app before the backend existed.", // TODO(verify): quantify the prior gap (manual/spreadsheet process, or a POS lacking role controls)
    flow: {
      diagram: `flowchart LR
  A["UI Screens (expo-router)"] --> B["AuthGuard + useAuth().can()"]
  B --> C["Redux Toolkit Store (8 slices)"]
  C --> D["redux-persist (AsyncStorage: auth + ui only)"]
  C --> E["Async Thunks"]
  E --> F["Service Modules (endpoints/*)"]
  F --> G["Axios Instance"]
  G --> H["Request Interceptor: attach JWT"]
  G --> I["Response Interceptor: 401 refresh queue, retry or logout"]
  G --> J{"EXPO_PUBLIC_USE_MOCK_API?"}
  J -->|"true"| K["Mock Adapter (electronics data)"]
  J -->|"false"| L["Backend REST API (pending)"]
  E --> M["Checkout: createSale then processSaleStockOut"]`,
      caption:
        "Screens gate on RBAC and dispatch thunks through a typed service layer; one axios instance attaches the JWT and runs single-flight refresh; a mock adapter stands in for the pending backend.",
    },
    technologies: [
      "TypeScript",
      "React Native",
      "Expo",
      "expo-router",
      "Redux Toolkit",
      "redux-persist",
      "Axios",
      "React Native Paper",
      "Reanimated",
      "JWT",
    ],
    bestPractices: [
      "Layered separation of concerns: atomic-design components, per-domain service modules, and Redux slices — screens never call axios directly",
      "RBAC from a single source of truth: a 5-role × 14-permission matrix with role normalization, reused by a can() gate across UI and route guards",
      "Resilient auth: a response interceptor refreshes the JWT with a single-flight flag and a failed-request queue, replaying parked 401s after one refresh",
      "Circular-dependency-safe wiring: injectStore() plus runtime dynamic import() of thunks inside the interceptor to break the api → store → slices → services → api cycle",
      "Disciplined persistence: redux-persist whitelist limited to auth tokens + theme, so stale server data and PII are not persisted",
      "API/domain decoupling with strict TypeScript and explicit DTO → domain mappers with defensive type coercion",
    ],
    challenges: [
      {
        challenge:
          "Circular import deadlock — the axios layer needs the store for the token, but the store imports slices that import the services that import axios.",
        resolution:
          "Lazy injectStore(store) called once at bootstrap, plus runtime dynamic imports of the refreshToken/logoutUser thunks inside the interceptor instead of at module load.",
      },
      {
        challenge:
          "Parallel requests all 401-ing at once would each trigger a separate token refresh (a refresh stampede).",
        resolution:
          "A single-flight refresh guarded by an isRefreshing flag; other failed requests park in a queue, resolve with the new token, and retry automatically.",
      },
    ],
    evidence: [
      { value: "8", label: "Redux slices" },
      { value: "5", label: "RBAC roles", detail: "Cashier through super-admin" },
    ],
    outcomes: [
      "Cross-platform front-end covering Dashboard, Sales/Checkout, Inventory, Returns, Profile, and Users Management",
      "8 Redux slices; full auth flows (login, signup, forgot/reset via deep link, refresh, logout); RBAC for 5 roles",
      "Line-level discounts with savings/change calculation; graceful stock-sync failure handling",
      "Complete mock backend enabling backend-independent development",
      // TODO(verify): add real metrics (users/transactions, bundle size, pilot results) or state "front-end complete; pending backend integration"
    ],
    conceptsLearned: [
      "JWT authentication with refresh-token rotation",
      "Axios request/response interceptors",
      "Single-flight / request-queue (refresh-stampede prevention)",
      "Role-Based Access Control (RBAC) & permission matrices",
      "Redux Toolkit (createSlice / createAsyncThunk)",
      "State persistence & rehydration (redux-persist)",
      "File-based routing (expo-router) & route guards",
      "Atomic design component architecture",
      "Cross-platform React Native / Expo (New Architecture)",
      "Material Design 3 theming",
      "Dependency injection to break circular imports",
      "DTO-to-domain mapping & defensive type coercion",
    ],
    links: [
      {
        type: "Source",
        href: "https://github.com/ifham-mohamed/x-pos",
        icon: <Icons.github className="size-3" />,
      },
    ],
    // image omitted intentionally — add public/images/projects/x-pos.png to enable the hero
  };
