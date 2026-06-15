import { Icons } from "@/components/icons";
import type { Project } from "@/types";

export const welfareSystem: Project = {
    id: "welfare-system",
    title: "Student Welfare Management System",
    href: "https://ems.vpa.ac.lk",
    dates: "Oct 2023 - Jul 2024",
    active: false,
    featured: true,
    role: "Full-Stack Developer (Team)",
    context:
      "Level 2 group software project (module IS 2901) mentored under the Faculty of IT (University of Moratuwa) and Loons Lab, delivered for a real client — the University of the Visual & Performing Arts. The frontend of the broader ENIGMATRIX university-management platform (~7 contributors, 40+ modules). My contributions: the Mahapola scholarship and disciplinary data processes, plus the frontend's containerization and deployment (multi-stage Docker + nginx).", // TODO(verify): exact responsibility split
    oneLiner:
      "The React/Material-UI frontend for ENIGMATRIX — a role-based university-management platform for the University of the Visual & Performing Arts — where I built the Mahapola/disciplinary data flows and packaged the app as a multi-stage Docker + nginx image for one-command deployment.",
    description:
      "React/Material-UI frontend for the ENIGMATRIX university-management platform (UVPA), packaged as a multi-stage Docker image served by nginx for reproducible deployment; my contributions were the Mahapola/disciplinary data flows and the containerization/deploy pipeline.",
    overview:
      "ENIGMATRIX digitises a university's admissions, examinations, finance, HR, scholarships (Mahapola), welfare, medical and student-union processes behind role-based access. On this group build I was a full-stack developer: I built the Mahapola scholarship and disciplinary data processes, and owned the frontend's deployment — a multi-stage Docker build that compiles the React SPA and serves it from nginx with SPA history fallback, for reproducible one-command deploys.",
    problem:
      "The university's admissions, aptitude, examinations, finance, HR, scholarships (Mahapola), medical, welfare and student-union processes ran manually across disconnected tools. The frontend also had no consistent way to build and ship — large Create React App builds, dependency drift, and SPA deep links 404-ing when served by an ordinary web server. The deployment work closed that gap with a reproducible, container-based build-and-serve pipeline.", // TODO(verify): a number for the gap (manual processes / staff / students replaced)
    flow: {
      diagram: `flowchart LR
  Dev["Developer / git push"] --> SRC["React 16 SPA (Create React App)"]
  SRC --> BUILD["Docker build stage: node:13-alpine"]
  BUILD --> NPMCI["npm ci (package-lock.json)"]
  NPMCI --> ASSETS["react-scripts build to /app/build"]
  ASSETS --> PROD["Docker prod stage: nginx:stable-alpine"]
  CONF["nginx.conf (try_files SPA fallback)"] --> PROD
  PROD --> IMG["Container image (EXPOSE 80)"]
  IMG --> NGINX["nginx serves static SPA on :80"]
  NGINX --> USER["Browser (university staff and students)"]
  USER --> API["axios to path-routed microservices"]
  API --> KC["Keycloak (OAuth2 / OIDC)"]
  API --> CAM["Camunda (BPMN workflows)"]
  API --> AZ["Azure VM host"]`,
      caption:
        "A multi-stage Docker build compiles the React SPA and serves it from nginx (with SPA history fallback); the app calls path-routed microservices behind Keycloak (OIDC) and Camunda (BPMN) on an Azure VM.",
    },
    technologies: [
      "React",
      "Material UI",
      "Redux",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "REST API",
      "Docker",
      "Nginx",
      "Keycloak",
      "Camunda",
      "Azure",
    ],
    bestPractices: [
      "Multi-stage Docker build: the Node build toolchain stays in the build stage; the final image ships only static assets on nginx:stable-alpine (small runtime, low attack surface)",
      "Reproducible installs: npm ci against a committed package-lock.json so every build resolves identical versions",
      "Pinned base images (node:13.12.0-alpine, nginx:stable-alpine) for deterministic builds",
      "Production build hardening: GENERATE_SOURCEMAP=false (no source disclosure, smaller output) and a raised Node heap to avoid OOM on the large CRA build",
      "SPA-correct serving: nginx try_files ... /index.html history fallback plus hashed, cache-friendly asset filenames",
      "Role-based access in the app it serves: JWT-based, fine-grained route guards (authRoles mapping pages to roles) backed by Keycloak OIDC",
    ],
    challenges: [
      {
        challenge:
          "The large Create React App build exhausted Node's heap and emitted source maps that leaked internals.",
        resolution:
          "Raised the heap with --max_old_space_size=4096 and disabled source maps via GENERATE_SOURCEMAP=false in the production build script.",
      },
      {
        challenge:
          "Client-side routes (React Router deep links) returned 404 when the static build was served by a plain web server on refresh.",
        resolution:
          "Added an nginx try_files $uri $uri/ /index.html fallback so unmatched paths return the SPA shell and routing resolves on the client.",
      },
    ],
    outcomes: [
      "Shipped a single deployable container image that builds the SPA and serves it on port 80 with one docker build/run — no host Node setup",
      "Minimal runtime image (nginx:stable-alpine; build toolchain excluded via multi-stage)",
      "Serves a frontend spanning 40+ modules (admissions, examinations, finance, HR, Mahapola, welfare, student unions, medical, audit, ...) across ~1,000 source files",
      "My feature contribution: the Mahapola scholarship and disciplinary submission data processes",
      // TODO(verify): student/user counts, image size/build time, whether it went live for the client
    ],
    conceptsLearned: [
      "Multi-stage Docker builds & image-size optimization",
      "nginx static / SPA serving with history fallback",
      "Reproducible builds (npm ci + lockfile)",
      "Pinned / immutable base images",
      "Production build hardening (source-map stripping)",
      "OAuth2 / OIDC (Keycloak)",
      "JWT authentication & Role-Based Access Control (RBAC)",
      "BPMN workflow integration (Camunda)",
      "Microservices / path-based API routing",
      "Create React App / Webpack production builds",
      "Cloud VM deployment (Azure)",
      "Redux + Material UI (MATX admin template)",
    ],
    links: [
      {
        type: "Website",
        href: "https://ems.vpa.ac.lk",
        icon: <Icons.globe className="size-3" />,
      },
      {
        type: "Source",
        href: "https://github.com/Enigmatrix-LoonsLab/welfare_fe", // TODO(verify): repo is private
        icon: <Icons.github className="size-3" />,
      },
    ],
    image: "/images/projects/welfare-system.png",
  };
