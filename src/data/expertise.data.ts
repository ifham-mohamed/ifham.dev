export interface ExpertiseCapability {
  title: string;
  description: string;
}

export interface ExpertiseQuestion {
  question: string;
  answer: string;
}

export interface ExpertisePage {
  slug: string;
  label: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  capabilities: readonly ExpertiseCapability[];
  projectIds: readonly string[];
  articleSlugs: readonly string[];
  questions: readonly ExpertiseQuestion[];
}

/**
 * Search-focused pages built from claims already demonstrated by the project
 * and article corpus. These are deliberately specific: each destination owns
 * one intent and links directly to the evidence that supports it.
 */
export const expertisePages: readonly ExpertisePage[] = [
  {
    slug: "full-stack-developer",
    label: "Full-stack development",
    title: "Full-stack developer for production web applications",
    metaTitle: "Full-Stack Developer for Production Web Apps",
    description:
      "Ifham Mohamed builds production web applications across React interfaces, typed APIs, authentication, databases, testing, and deployment.",
    intro:
      "I work across the application boundary: product interfaces, API contracts, authorization, data models, integrations, and the delivery path that gets a system into production. The case studies below show the decisions and outcomes behind that work rather than treating full-stack development as a list of frameworks.",
    capabilities: [
      {
        title: "Product interfaces",
        description:
          "Accessible React interfaces, role-specific workflows, reusable component systems, and server-state patterns that keep complex screens understandable.",
      },
      {
        title: "APIs and business workflows",
        description:
          "Predictable HTTP contracts, schema-validated inputs, authentication boundaries, background work, and integrations designed around the product lifecycle.",
      },
      {
        title: "Data and access integrity",
        description:
          "Relational modelling, migrations, transactions, tenant scoping, RBAC, idempotency, and audit trails where correctness matters more than a happy-path demo.",
      },
      {
        title: "Production delivery",
        description:
          "Testing, container builds, CI/CD, health checks, observability, performance work, and deployment choices considered as part of the application architecture.",
      },
    ],
    projectIds: ["total-supply", "dynapos", "pharmaconnect", "rag-release"],
    articleSlugs: ["api-design-principles", "typescript-best-practices"],
    questions: [
      {
        question: "What kinds of full-stack systems have you built?",
        answer:
          "The portfolio includes multi-tenant POS and SaaS products, supply-chain workflows, telehealth, collaborative publishing, e-commerce, and internal operational systems.",
      },
      {
        question: "Do you work beyond the front end?",
        answer:
          "Yes. The linked case studies cover API design, relational schemas, authentication and authorization, transactions, integrations, testing, infrastructure, and deployment as well as interface work.",
      },
      {
        question: "How can I evaluate the work?",
        answer:
          "Start with the project records below. Each documents the role, problem, architecture, engineering practices, challenges, outcomes, technology choices, and public evidence where available.",
      },
    ],
  },
  {
    slug: "nextjs-developer",
    label: "Next.js engineering",
    title: "Next.js developer for reliable product systems",
    metaTitle: "Next.js Developer for Production Applications",
    description:
      "Next.js engineering by Ifham Mohamed across App Router systems, React Server Components, authentication, PostgreSQL, performance, and deployment.",
    intro:
      "I use Next.js as an application platform, not only a page renderer. That means making deliberate server and client boundaries, protecting data access, keeping bundles and rendering work under control, and designing deployment behavior alongside the product architecture.",
    capabilities: [
      {
        title: "App Router architecture",
        description:
          "Server and Client Components, route handlers, layouts, caching boundaries, metadata, and feature-oriented code organization chosen around real workflows.",
      },
      {
        title: "Authentication and data",
        description:
          "NextAuth/Auth.js, RBAC, tenant-aware Prisma access, PostgreSQL migrations, validated API boundaries, and transactional business operations.",
      },
      {
        title: "Performance",
        description:
          "Image delivery, code splitting, package tree-shaking, route-scoped assets, rendering choices, and Core Web Vitals treated as product constraints.",
      },
      {
        title: "Delivery",
        description:
          "Vercel and container deployments, CI gates, health verification, environment discipline, and production migrations that can move forward safely.",
      },
    ],
    projectIds: ["total-supply", "dynapos", "samwoostore", "prompt-copilot"],
    articleSlugs: [
      "nextjs-performance-tips",
      "typescript-best-practices",
      "api-design-principles",
    ],
    questions: [
      {
        question: "Which Next.js architecture do you use?",
        answer:
          "Recent work uses the App Router with explicit Server and Client Component boundaries. The exact choices vary by product, and the linked case studies record them per system.",
      },
      {
        question: "Can Next.js support complex SaaS and commerce workflows?",
        answer:
          "Yes, when authorization, transactions, background work, cache behavior, and deployment constraints are designed explicitly. DynaPOS, Total Supply, Samwoostore, and Prompt Copilot demonstrate different versions of that architecture.",
      },
      {
        question: "Do you optimize existing Next.js applications?",
        answer:
          "The work includes App Router migration, route-scoped heavy assets, dynamic code splitting, image delivery, database indexing, and deployment changes. Any optimization starts with measured bottlenecks rather than a generic checklist.",
      },
    ],
  },
  {
    slug: "react-developer",
    label: "React engineering",
    title: "React developer for complex product interfaces",
    metaTitle: "React Developer for Complex Product Interfaces",
    description:
      "React engineering by Ifham Mohamed across design systems, typed state, role-based workflows, testing, performance, and web and mobile products.",
    intro:
      "My React work focuses on interfaces that carry real operational state: dashboards, permissions, multi-step workflows, offline behavior, data-heavy forms, and reusable component systems. The goal is a UI that stays predictable as the product grows.",
    capabilities: [
      {
        title: "Component architecture",
        description:
          "Feature-aligned components, shared primitives, clear ownership of state and effects, and design-system decisions that reduce inconsistency without hiding product intent.",
      },
      {
        title: "Typed state and data",
        description:
          "TypeScript, Redux Toolkit, RTK Query, TanStack Query, runtime validation, and explicit DTO-to-domain boundaries for safer change.",
      },
      {
        title: "Workflow and access UX",
        description:
          "Role-segmented navigation, permission gates, forms, uploads, resilient authentication, optimistic or cache-aware updates, and accessible interaction patterns.",
      },
      {
        title: "Confidence in change",
        description:
          "Unit, integration, and end-to-end testing applied to critical paths, with performance and maintainability considered alongside feature delivery.",
      },
    ],
    projectIds: ["pharmaconnect", "internify", "x-pos", "rag-release"],
    articleSlugs: [
      "testing-react-apps",
      "building-design-systems",
      "typescript-best-practices",
    ],
    questions: [
      {
        question: "Do you build both React web and mobile interfaces?",
        answer:
          "Yes. The evidence includes Next.js and Vite web applications as well as React Native and Expo products such as X-POS and Attendify.",
      },
      {
        question: "How do you manage complex client state?",
        answer:
          "State is separated by ownership: local interaction state stays local, server state uses query and cache tools, and cross-product state is introduced only where several surfaces genuinely share it.",
      },
      {
        question: "How do you keep a React codebase maintainable?",
        answer:
          "I use typed boundaries, feature-oriented organization, reusable primitives, predictable data flow, and tests around the paths whose failure would matter to users or operations.",
      },
    ],
  },
  {
    slug: "saas-development",
    label: "SaaS development",
    title: "SaaS development built around tenant and data integrity",
    metaTitle: "SaaS Development and Multi-Tenant Architecture",
    description:
      "SaaS development by Ifham Mohamed covering multi-tenant architecture, RBAC, PostgreSQL, migrations, billing workflows, auditability, and CI testing.",
    intro:
      "A SaaS product is defined by its boundaries: which tenant owns each record, which role may perform each action, how data evolves, and how the system behaves when requests are retried or deployments change the schema. My SaaS work makes those boundaries visible in the architecture.",
    capabilities: [
      {
        title: "Tenant isolation",
        description:
          "Tenant context resolved at trusted boundaries, scoped queries, ownership constraints, and database-level protections that do not rely on UI hiding.",
      },
      {
        title: "Roles and workflows",
        description:
          "RBAC enforced on the server and reflected in the interface, with state machines and audit records for business-critical operations.",
      },
      {
        title: "Data evolution",
        description:
          "Relational models, forward migrations, backfills, decimal precision, transaction boundaries, soft deletion, and retention rules designed for a living product.",
      },
      {
        title: "Operational confidence",
        description:
          "Deterministic fixtures, end-to-end coverage, idempotent webhooks and writes, health checks, and observable delivery pipelines.",
      },
    ],
    projectIds: ["dynapos", "total-supply", "prompt-copilot", "school-management"],
    articleSlugs: [
      "api-design-principles",
      "nextjs-performance-tips",
      "testing-react-apps",
    ],
    questions: [
      {
        question: "What makes a SaaS architecture multi-tenant?",
        answer:
          "Tenant ownership must be enforced throughout authentication, application queries, uniqueness constraints, background work, and reporting. A tenant selector in the interface alone is not isolation.",
      },
      {
        question: "How do you reduce cross-tenant data risk?",
        answer:
          "Resolve tenant identity from a trusted session or key, scope every data operation, add database constraints where possible, test authorization paths, and keep audit evidence for sensitive mutations.",
      },
      {
        question: "Where is this demonstrated?",
        answer:
          "DynaPOS documents row-level tenant scoping and accounting integrity; Total Supply records multi-role operations and data lifecycle controls; the other linked cases show additional tenancy and authorization patterns.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    label: "E-commerce engineering",
    title: "E-commerce development from catalogue to operations",
    metaTitle: "E-Commerce Developer for Production Platforms",
    description:
      "E-commerce development by Ifham Mohamed across catalogues, customer segments, order workflows, inventory, payments, media performance, admin tools, and deployment.",
    intro:
      "E-commerce engineering connects a fast storefront to the less visible systems that make it dependable: catalogue modelling, pricing, inventory, roles, media delivery, order state, audit logs, deployment, and operational tooling. The work below covers both sides of that boundary.",
    capabilities: [
      {
        title: "Catalogue and discovery",
        description:
          "Product and category schemas, stable slugs, indexed queries, customer segmentation, responsive media, and interfaces designed for quick browsing.",
      },
      {
        title: "Orders, stock, and money",
        description:
          "Order lifecycles, inventory movements, transactional updates, tiered pricing, decimal precision, returns, reconciliation, and payment integration.",
      },
      {
        title: "Administration and access",
        description:
          "Role-based operations, validated forms, audit and performance logs, customer management, content workflows, and secure authentication recovery.",
      },
      {
        title: "Performance and delivery",
        description:
          "Modern image formats, long-lived media caching, database indexes, code splitting, container builds, CI/CD, and health-verified releases.",
      },
    ],
    projectIds: ["samwoostore", "dynapos", "total-supply"],
    articleSlugs: [
      "nextjs-performance-tips",
      "api-design-principles",
      "testing-react-apps",
    ],
    questions: [
      {
        question: "Can you build the storefront and the operational backend?",
        answer:
          "Yes. Samwoostore combines storefront, administration, API, media, logging, and deployment; DynaPOS and Total Supply add deeper inventory, role, fulfillment, and accounting workflows.",
      },
      {
        question: "How do you approach e-commerce performance?",
        answer:
          "Start with measured customer paths, then address image delivery, render and bundle cost, caching, database query plans, and third-party scripts without weakening correctness or observability.",
      },
      {
        question: "How is inventory consistency handled?",
        answer:
          "The exact model depends on the product, but reliable systems use explicit stock movements, transaction boundaries, stable units and precision, idempotent operations, and an audit trail rather than updating a single quantity optimistically.",
      },
    ],
  },
] as const;

export function getExpertiseBySlug(slug: string): ExpertisePage | undefined {
  return expertisePages.find((page) => page.slug === slug);
}

export function getExpertiseForProject(projectId: string): ExpertisePage[] {
  return expertisePages.filter((page) => page.projectIds.includes(projectId));
}

export function getExpertiseForArticle(articleSlug: string): ExpertisePage[] {
  return expertisePages.filter((page) => page.articleSlugs.includes(articleSlug));
}

export default expertisePages;
