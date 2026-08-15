# Project Documentation Audit Index

This directory contains the detailed technical case studies for projects found directly under
`C:\projects`. The audit was completed against the checked-out source trees, nested Git repositories,
configuration, database schemas, routes, tests, deployment files, internal documentation, and PDF
reports available locally on 15 August 2026.

## Coverage summary

All 19 top-level project directories have a mapped Markdown document.

| # | Project directory | Documentation | Evidence type | Audit note |
|---:|---|---|---|---|
| 1 | `app-360` | [APP360 industrial training](app-360.md) | Seven PDFs; no source repository | Report-derived, clearly labelled |
| 2 | `attendify` | [Attendify](attendify.md) | Expo and NestJS repositories | Git attributes code to Akar, not Ifham |
| 3 | `CloudMart` | [CloudMart](cloudmart.md) | Full-stack monorepo and team Git history | Deep source/commit audit |
| 4 | `DynaPOS` | [DynaPOS](dynapos.md) | Next.js/Prisma app, QA catalogue, CI/CD | Ifham's QA/deployment role separated from core app ownership |
| 5 | `ifham.dev` | [ifham.dev](ifham-dev.md) | Current portfolio source and content | Solo ownership supported by Git |
| 6 | `ITFac_Batch21_Group50` | [QA Automation](qa-automation.md) | Java/Serenity/Cucumber team repository | Maps the folder to its actual OnTerminal project |
| 7 | `Master-Blogmium` | [Master Blogmium](master-blogmium.md) | MERN repository | Auth MVP; blog CRUD not overstated |
| 8 | `PharmaConnect` | [PharmaConnect](pharmaconnect.md) | Four repositories | Security and provenance corrected |
| 9 | `POV_GLOBE` | [POV Globe](pov-globe.md) | Eleven sketches, PCB/CAD artifacts, eleven PDFs | Firmware controls and hardware evidence reconciled |
| 10 | `prompt-copilot` | [Prompt Copilot](prompt-copilot.md) | Web, Chrome, and VS Code sources | Marketplace publication not proven |
| 11 | `reg-release` | [RAG Release](rag-release.md) | Three repos, proposal, and SRS | Planned architecture separated from implementation |
| 12 | `samwoostore` | [Samwoostore](samwoostore.md) | Full-stack repo and delivery files | Multi-author project, not solo |
| 13 | `SchoolManagementSystem` | [School Management](school-management.md) | Laravel repository | Source-verified implementation and gaps |
| 14 | `TODO-APP` | [TODO-APP](todo-app.md) | React repository | Separate from the portfolio's Firebase “Master TODO” |
| 15 | `total-supply-web` | [Total Supply](total-supply.md) | Next.js/Prisma repository and internal docs | 21 models and 83 API route files verified |
| 16 | `unifixz` | [Unifixz](unifixz.md) | Team repository and CI/CD files | Role limited to verified DevOps contribution |
| 17 | `welfare-managment-system` | [Welfare / ENIGMATRIX](welfare-system.md) | React repo, 11 backend services, five PDFs | Full platform and security audit |
| 18 | `x-pos` | [X-POS](x-pos.md) | Expo and Laravel repositories | Client/backend ownership separated |
| 19 | `X-Tracker` | [X-Tracker](x-tracker.md) | Expo/SQLite repository and engineering docs | Offline-first implementation audited |

## Audit method

Each source-backed page was reconciled against as many of the following artifacts as were present:

1. repository structure and tracked-file inventory;
2. package manifests and lockfiles;
3. application routes, controllers, services, state stores, and components;
4. ORM schemas, entities, migrations, constraints, and indexes;
5. authentication and authorization guards/middleware;
6. tests, scripts, CI workflows, Dockerfiles, hosting, and deployment configuration;
7. README files, specifications, reports, and user guides;
8. Git commit count and author history for role/provenance claims;
9. PDF text extraction, metadata inspection, and representative rendered-page checks;
10. explicit separation of implemented, planned, inferred, and unverified claims.

Counts describe the checked-out workspace, not an external repository's current default branch.
File counts are not treated as feature counts, endpoint counts, or quality scores.

## Documentation standard

The project pages aim to include:

- a concise one-line description;
- role, context, ownership evidence, and project type;
- problem and product scope;
- architecture and representative Mermaid flows;
- implemented components and domain/data models;
- technology stack;
- engineering practices and important design decisions;
- challenges and resolutions;
- source-verifiable outcomes;
- limitations, security/test gaps, and recommended next steps;
- key concepts, evidence map, and links.

Private local paths identify the evidence used for the audit. Before publishing these pages publicly,
replace local-only links with canonical repository/demo URLs and remove any context that should stay
internal.

## Important provenance corrections

Several previous portfolio narratives inferred authorship from project location. Git evidence required
the following corrections:

- Attendify's observed commits belong to Akar/Akar Ahamadh.
- All four PharmaConnect repositories are authored by Akar aliases.
- Samwoostore is a multi-contributor project; Ifham is a major contributor, not the sole author.
- X-POS has an Ifham-owned client and a primarily Rainas-authored backend.
- Welfare has an Ifham-authored frontend repository and a large team-owned backend.
- Unifixz is documented only for the verified deployment/DevOps contribution.
- DynaPOS core application commits belong primarily to Arkam; Ifham's verified scope is the large
  QA/BDD documentation and automation contribution plus container/deployment engineering.
- POV Globe is a team prototype despite its single-account Git history; teammate-named firmware
  variants prevent a defensible solo-ownership claim.

These notes protect the portfolio from claiming work that the supplied histories do not establish.

## Implementation-status corrections

- RAG Release's SRS describes a planned AWS/microservice publishing platform; its checked-out book
  service remains partial and its domain route mounts are commented out.
- PharmaConnect has broad application code but lacks consistent server authentication/role guards
  and should not be represented as production-ready healthcare software.
- X-POS includes a Laravel backend; “backend pending” is no longer accurate, although live integration
  is unverified.
- Prompt Copilot has store-ready extension sources, but no public marketplace publication evidence.
- TODO-APP is a localStorage Kanban project and is not the separate Firebase “Master TODO” concept.
- DynaPOS contains 2,117 BDD scenarios, but only 38 are tagged implemented; the remainder are pending
  traceable specifications. Its source targets a GHCR/SSH/VPS deployment, not Vercel.
- POV Globe's message path is implemented, while the final brightness route is disconnected and the
  RPM calculation is not invoked. Its PCB artifacts prove design work, not fabrication of a claimed
  two-layer board.

## Additional portfolio documents

The following Markdown files existed in this directory but do not map to a top-level directory in the
current `C:\projects` snapshot:

- [CIM](cim.md)
- [Doc-Q](doc-q.md)
- [Internify](internify.md)

They were retained. They are outside this local-source audit and should not be described as verified
by the 19 repositories listed above.
