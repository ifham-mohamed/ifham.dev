# Project Extraction Prompts

The goal: for every project, fill the **same 10-field schema** once. The CV reads the
short slice (one-liner + headline outcome + concepts), the website renders the full
case study. No duplicated effort.

Each project in `src/data/projects.data.tsx` is already populated with a best-effort
draft. Anything I could **not** confirm from your public repos / live sites is tagged
`// TODO(verify)` or `// TODO(confirm)` in that file. This doc helps you close those
gaps with real numbers, real bugs, and real flows.

---

## How to use this

1. Open a chat with an AI assistant (or just answer in a notes file).
2. Paste **Section A** (the master prompt) once, then paste the **per-project block**
   from Section C for the project you're documenting.
3. If the repo is private, paste in the README, the Prisma/Sequelize schema, the main
   route/controller files, and any architecture notes — the more raw material, the
   more accurate the result.
4. Paste the assistant's filled answer back to me (or into the data file). I'll drop it
   straight into the `Project` object and the case study + CV update automatically.

> Tip: the single most valuable things to recover are **(a) one real bug with its fix**
> and **(b) one hard number** (latency, %, users, requests, build time). Those are what
> make a project memorable to a reviewer.

---

## Section A — Master extraction prompt (paste once)

```
You are helping me document a software project for my portfolio and CV. I will give you
raw material (repo README, schema, key source files, my own notes). Extract the facts
into EXACTLY the schema below. Rules:
- Be specific and truthful. If something isn't in the material, write "UNKNOWN — <the
  question I should answer>" instead of inventing it.
- Prefer named, industry-standard concepts (e.g. "N+1 query", "presigned URLs",
  "blue-green deployment", "OAuth 2.0 / OIDC", "CRDT"), not vague filler.
- Keep the one-liner to ONE sentence. Keep outcomes quantified where possible.

Return this exact structure:

1. oneLiner: one sentence — what it does and for whom.
2. role & context: my responsibility + team/client/course + scope.
3. problem: the real-world gap, ideally with a number (what was slow/manual/missing).
4. approach / flow: the architecture or pipeline as a list of components and how data
   moves between them. ALSO output it as a Mermaid `flowchart LR` (quote every node
   label, e.g. A["Next.js App Router"]).
5. techStack: languages, frameworks, services, models.
6. bestPractices: 4-6 things I did deliberately well (testing, RBAC, indexing,
   reproducible builds, separation of concerns, etc.).
7. challenges: 1-2 real blockers, each as { challenge, resolution }.
8. outcomes: metrics, results, what shipped (numbers where possible).
9. conceptsLearned: 6-12 named, searchable concepts a recruiter/ATS would scan.
10. links: repo, demo, report.
```

---

## Section B — What to paste back to me (data shape)

I'll convert your answers into this object (already the shape in
`src/data/projects.data.tsx`):

```ts
{
  oneLiner: "…",
  context: "…",
  problem: "…",
  flow: {
    diagram: `flowchart LR
      A["…"] --> B["…"]`,
    caption: "…",
    steps: ["…", "…"], // optional
  },
  technologies: ["…"],
  bestPractices: ["…"],
  challenges: [{ challenge: "…", resolution: "…" }],
  outcomes: ["…"],
  conceptsLearned: ["…"],
}
```

---

## Section C — Per-project prompts (gaps to close)

Each block lists what's already drafted and the **specific gaps** to fill. Paste the
master prompt (A) first, then the block.

### 1. Total Supply — Enterprise Supply Chain Platform `(private repo)`
Drafted: RBAC, Prisma/Postgres, GCS signed URLs, Next.js App Router.
Confirm / provide:
- The real numbers: how many REST endpoints? Is the 250ms→87ms query improvement real,
  and on which query/endpoint? Is the 40% storage-cost reduction measured or estimated?
- How many roles, and what are they? What does the admin-approval flow actually gate?
- One real bug you hit (e.g. a Prisma relation/migration issue, an RBAC bypass, a
  signed-URL expiry edge case) and how you fixed it.
- Is it live/used by a real client, or a personal build? Any users?

### 2. Samwoostore — E-Commerce Platform `(private repo, live: samwoohub.lk)`
Drafted: Next.js, dual auth (credentials + Google OAuth, JWT), Docker + GitHub Actions
+ Nginx zero-downtime, React Query + Redux Toolkit.
Confirm / provide:
- Endpoint count (the "80+" — real?). Is the 40% faster-loads figure measured (e.g.
  Lighthouse before/after)?
- Did you actually use Redux Toolkit AND React Query, or one of them? (No public proof —
  state what's true.)
- B2B vs B2C differences (pricing tiers? bulk orders? account approval?).
- One real deployment/auth bug and the fix.
- Product domain confirmed as networking/structured-cabling/telecom for Samwootek
  Engineering — correct?

### 3. Prompt Copilot — AI Prompt Management Ecosystem `(public: github.com/ifham-mohamed/prompt-copilot)`
Confirmed: TS monorepo with `extension/`, `vscode-extension/`, Next.js `src/`, `prisma/`,
shadcn/ui.
Confirm / provide:
- Real endpoint count (the "15+") and the "5+ platforms" claim — which platforms exactly?
- Auth mechanism shared across web + Chrome + VS Code — what is it (token in extension
  storage? OAuth? API key)?
- One real MV3 / WebView limitation you hit and how you worked around it.
- Is there a published web app / store listing, or repo-only? Add a Demo link if so.

### 4. Rag Release — Collaborative Book Publishing Platform `(public org: github.com/Rag-Release)`
Confirmed from repos: Next.js FE (Tiptap + Yjs), `user-auth-service` (JWT/bcrypt, Postgres),
`book-service` (Express, Sequelize, Postgres, AWS S3, Stripe), `media-service`.
**Important correction:** your CV/site previously said "AWS Lambda / API Gateway / RDS".
The repos show **Express services on Docker + S3 + Postgres/Sequelize**, no Lambda/API
Gateway. I've corrected this — *if you genuinely deployed on Lambda, tell me and I'll
restore it.*
Confirm / provide:
- Your specific contribution (which services/features did YOU build vs the team?).
- Was `media-service` finished? What does it do?
- One real bug (Yjs sync conflict? Sequelize migration? Stripe webhook?) and the fix.
- Any metrics (users, books published, reviewers) and a live/demo URL if one exists.

### 5. Student Welfare Management System — `(private repo, live: ems.vpa.ac.lk)`
Drafted: Node/Express/React/Material UI/Postgres, team lead under Loons Lab.
Confirm / provide:
- The "4,000+ students" — real figure? Is it actively used by the university now?
- Team size you led, and your specific leadership actions.
- What the Mahapola scholarship workflow does step by step (eligibility → approval →
  disbursement?), and the disciplinary workflow.
- One real bug/blocker and the fix.

### 6. Internify — Intern Tracking System `(private repo, live status unconfirmed: internify.fit)`
Drafted: Node/TS/React/Postgres, 450+ students.
Confirm / provide:
- Is internify.fit still live? (I couldn't fetch content — confirm or give a working URL.)
- The "450+ students" — real? Who used it (which institution)?
- Roles and the core workflow (apply → review → place?).
- One real challenge and the fix; any metrics.

### 7. POV Globe — IoT Persistence-of-Vision Display `(public: github.com/ifham-mohamed/POV_GLOBE)`
Confirmed: C++ (100% of repo), README names ESP32 + WS2812, on-device web server, RPM
display. **Not confirmed in the repo:** "Arduino" framework and "Hall-effect sensors"
(I tagged these `// TODO(verify)`).
Confirm / provide:
- Did you use the Arduino framework on the ESP32, and a Hall-effect sensor for rotation
  sync? If a different sensor (IR/optical/encoder), tell me.
- How are the LEDs driven — RMT peripheral, a library (FastLED/NeoPixel), or bit-bang?
- One real timing/sync bug and the fix.
- Any demo video link to embed.

### 8. Master Todo — React + Firebase Task App `(public: github.com/ifham-mohamed/Master-Todo)`
**Correction:** previously described as "vanilla JavaScript". The repo is **React + Vite
+ Firebase + Tailwind** — I've corrected this everywhere.
Confirm / provide:
- Firebase services used (Firestore? Auth? Hosting?).
- Anything notable you practised (optimistic updates, real-time listeners, auth flows).
- A live/demo URL if deployed.

---

## After you fill these

Send the answers back and I will:
1. Replace the `// TODO(...)` drafts in `src/data/projects.data.tsx` with your verified
   content (one-liner, problem, flow diagram, best practices, challenges, outcomes,
   concepts).
2. Re-generate the matching CV lines (one-liner + concepts + metric) and recompile the
   PDF — staying on one page.
3. Tighten any Mermaid diagram to match the real architecture you describe.
