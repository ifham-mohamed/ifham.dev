/**
 * Portfolio-facing research data.
 *
 * The two source masters remain the evidence record. This file is the concise
 * presentation layer used by the homepage and /research; the full Module 1
 * narrative lives in content/research/enigmatrix-module-1.mdx.
 */

export type ResearchStatus =
  | "Implemented & evaluated"
  | "Experimentally evaluated"
  | "Research evidence"
  | "Open field gate";

export interface ResearchMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ResearchModule {
  id: "M1" | "M2" | "M3" | "M4";
  title: string;
  barrier: string;
  question: string;
  contribution: string;
  owner: string;
  status: ResearchStatus;
  href?: string;
  featured?: boolean;
}

export const enigmatrixResearch = {
  id: "enigmatrix",
  title: "Enigmatrix",
  subtitle: "Regulatory intelligence for Sri Lankan SMEs",
  type: "Final-year group research",
  institution: "University of Moratuwa",
  period: "2026",
  status: "Evidence-reconciled",
  supervision: ["Dr A.L.A.R.R Thanuja", "Ms P.G.S Upeksha"],
  question:
    "What information barriers drive regulatory non-compliance among Sri Lankan SMEs, how can those barriers be measured, and how can a shared regulatory-intelligence platform reduce them?",
  overview:
    "Enigmatrix studies regulatory non-compliance as a connected information problem: changes are discovered late, procedures are difficult to understand, risk remains invisible, and unsupported claims circulate without traceable evidence. Four research modules share a versioned evidence layer that moves an official rule from publication to understandable, targeted SME action.",
  contribution:
    "I own Module 1—the upstream regulatory evidence pipeline—from gazette discovery and multilingual PDF extraction through annotation, classification, grounded summaries, targeted alerts, and publication-to-awareness measurement.",
  metrics: [
    {
      value: "04",
      label: "connected modules",
      detail: "One evidence chain",
    },
    {
      value: "0.947",
      label: "M1 macro-F1",
      detail: "V6 fixed-split test",
    },
    {
      value: "0.720",
      label: "M3 ROC-AUC",
      detail: "Information-aware model",
    },
    {
      value: "90%",
      label: "M4 RAG accuracy",
      detail: "Common 200-post test",
    },
  ] satisfies readonly ResearchMetric[],
  modules: [
    {
      id: "M1",
      title: "Regulatory change awareness",
      barrier: "Awareness gap",
      question:
        "Can regulatory changes be discovered, extracted, classified and delivered early enough to measure and reduce SME awareness lag?",
      contribution:
        "Gazette corpus, page-aware extraction, classification, grounded trilingual summaries, alerts and lag measurement.",
      owner: "Mohamed M.R.I · 215075J",
      status: "Implemented & evaluated",
      href: "/research/enigmatrix-module-1",
      featured: true,
    },
    {
      id: "M2",
      title: "Compliance knowledge accuracy",
      barrier: "Knowledge gap",
      question:
        "Can verified regulatory evidence become accurate, complete and grounded procedural guidance?",
      contribution:
        "Knowledge instrument, verified procedure corpus and retrieval-grounded guidance research.",
      owner: "Ahamadh M.S.A · 215007F",
      status: "Experimentally evaluated",
    },
    {
      id: "M3",
      title: "Compliance risk visibility",
      barrier: "Risk invisibility",
      question:
        "Which business and information-access variables explain future compliance failure?",
      contribution:
        "SME vulnerability dataset, interpretable prediction and explanatory information factors.",
      owner: "Ahamed T.I · 215008J",
      status: "Research evidence",
    },
    {
      id: "M4",
      title: "Regulatory claim verification",
      barrier: "Misinformation",
      question:
        "How prevalent is regulatory misinformation, and which evidence-grounded verification approach works best?",
      contribution:
        "Annotated claim corpus, spread analysis and evidence-grounded claim-checking research.",
      owner: "Cader Z.R · 215019T",
      status: "Experimentally evaluated",
    },
  ] satisfies readonly ResearchModule[],
  platformStack: [
    "Next.js",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Celery",
    "Scrapy",
    "PyMuPDF",
    "Tesseract OCR",
    "scikit-learn",
    "Sentence Transformers",
    "FAISS",
    "NLLB",
  ],
  methods: [
    "Evidence and dataset lineage",
    "Leakage-aware evaluation",
    "Inter-annotator agreement",
    "Slice and error analysis",
    "Human-in-the-loop review",
    "Provenance-preserving delivery",
  ],
} as const;

export const moduleOneResearch = {
  id: "enigmatrix-module-1",
  module: "Module 01",
  title: "Closing the regulatory change awareness gap",
  shortTitle: "Regulatory change awareness",
  summary:
    "An evidence-governed pipeline that discovers Sri Lankan gazettes, recovers multilingual text, classifies regulatory changes, composes grounded alerts, and measures the path from publication to SME awareness.",
  period: "May–August 2026",
  status: "Evidence-reconciled · active research",
  role: "Module lead · Researcher & engineer",
  institution: "University of Moratuwa",
  question:
    "Can mixed-language regulatory changes be extracted and routed reliably—and can targeted, understandable alerts shorten the delay between legal publication and SME awareness?",
  metrics: [
    {
      value: "0.9472",
      label: "Macro-F1",
      detail: "V6 fixed-split test",
    },
    {
      value: "95.8%",
      label: "Accuracy",
      detail: "160 / 167 correct",
    },
    {
      value: "0.8715",
      label: "Category κ",
      detail: "Dual-annotation snapshot",
    },
    {
      value: "286",
      label: "Locked holdout",
      detail: "Fresh, single-use rows",
    },
  ] satisfies readonly ResearchMetric[],
} as const;

export type ResearchDiagramKind = keyof typeof researchDiagrams;

export const researchDiagrams = {
  "system-chain": {
    label: "Enigmatrix cross-module research chain",
    caption:
      "Module 1 creates the versioned regulatory evidence consumed by guidance, risk and claim-verification workflows; all four modules converge on actionable SME information.",
    chart: `flowchart TD
      PUB["Official rule"] --> M1["M1 · Discover, extract, classify"]
      M1 --> EVID["Versioned regulatory evidence"]
      EVID --> M2["M2 · Explain how to comply"]
      EVID --> M3["M3 · Update risk context"]
      EVID --> M4["M4 · Verify circulated claims"]
      M2 --> SME["Actionable SME guidance"]
      M3 --> SME
      M4 --> SME
      M1 --> SME`,
  },
  "module-pipeline": {
    label: "Module 1 research and operational pipeline",
    caption:
      "Every stage preserves source identity, version, state and evidence so evaluation and SME-facing output can be traced back to an official publication.",
    chart: `flowchart TD
      S["Authority sites & gazette archive"] --> A["A · Discover, deduplicate, download"]
      A --> RAW["Immutable PDF + provenance"]
      RAW --> B["B · Inspect pages & route extraction"]
      B --> EXT["Text + engine + quality trace"]
      EXT --> BP["B+ · Clean, segment, metadata, chunks"]
      BP --> C["C · Domain, sector & relevance"]
      C --> R{"Auto, review or human rung"}
      R --> D["D · Observe secondary sources"]
      R --> E["E · Compose grounded summaries"]
      E --> E2["E2 · Localise with literal protection"]
      E2 --> F["F · Match SME & issue alert"]
      D --> G["G · Measure diffusion & awareness lag"]
      F --> G`,
  },
  "extraction-routing": {
    label: "Page-aware multilingual PDF extraction routing",
    caption:
      "The pipeline evaluates page modality and text quality before choosing embedded text, font-aware recovery or OCR; one extractor is never trusted for every gazette.",
    chart: `flowchart LR
      PDF["Gazette PDF"] --> INSPECT["Page inspection"]
      INSPECT --> D{"Digital text?"}
      D -->|"usable"| TEXT["PyMuPDF / pdfplumber candidates"]
      D -->|"broken font"| FONT["Font-aware Wijesekara recovery"]
      D -->|"scan / hybrid"| OCR["Rasterise + Tesseract / optional engines"]
      TEXT --> SCORE["Quality & script scoring"]
      FONT --> SCORE
      OCR --> SCORE
      SCORE --> ROUTE["EN / SI / TA / mixed routing"]
      ROUTE --> TRACE["Text + page / engine / quality trace"]`,
  },
  "rahmt-branch": {
    label: "RA-HMT experimental hybrid architecture",
    caption:
      "The advanced branch fuses sparse, transformer, retrieval and rule signals across domain, sector and relevance heads. It remains unpromoted because its paired gain was not statistically reliable and the fresh holdout gate is still closed.",
    chart: `flowchart LR
      X["Notice text"] --> A["Sparse linear branch"]
      X --> B["Multilingual transformer branch"]
      X --> C["BM25 + dense evidence retrieval"]
      X --> D["Lexicon-derived prior"]
      A --> F["Gated fusion"]
      B --> F
      C --> F
      D --> F
      F --> DOM["8-domain head"]
      F --> SEC["3-sector head"]
      F --> REL["Relevance head"]
      DOM --> GATE["Joint quality, calibration & evidence gate"]
      SEC --> GATE
      REL --> GATE`,
  },
  "grounded-delivery": {
    label: "Evidence-bound summary and multilingual delivery flow",
    caption:
      "The default path composes from typed, evidence-anchored slots. Insufficient evidence creates a recoverable hold instead of a guessed legal statement.",
    chart: `flowchart TD
      C["Classified regulation"] --> G{"Evidence sufficient?"}
      G -->|"No"| HOLD["Persist held state + reasons"]
      G -->|"Yes"| SLOT["Extract anchor-bound slots"]
      SLOT --> COMP["Controlled English composition"]
      COMP --> VERIFY["Verify dates, figures & named entities"]
      VERIFY --> LOC["Compose EN / SI / TA with protected literals"]
      LOC --> MATCH["Match sector, profile, urgency & language"]
      MATCH --> ALERT["Idempotent dashboard / email alert"]
      HOLD --> REVIEW["Review, correct, reclassify or retry"]
      REVIEW --> G`,
  },
  "runtime-topology": {
    label: "Module 1 runtime and persistence boundaries",
    caption:
      "Redis coordinates work and live progress; PostgreSQL and versioned artifacts remain authoritative. ChromaDB is a downstream integration boundary, not an active Module 1 write path.",
    chart: `flowchart LR
      FE["Next.js SME & admin UI"] --> API["FastAPI Module 1 APIs"]
      API --> PG["PostgreSQL · durable state & provenance"]
      API --> R["Redis · broker, results & progress"]
      R --> W["Celery workers & scheduler"]
      W --> ML["Extraction, preprocessing & V6 inference"]
      ML --> PG
      ML --> ART["Versioned PDFs, datasets & models"]
      R --> WS["WebSocket live feed"]
      WS --> FE
      PG -. "curated future handoff" .-> CH["Shared ChromaDB · M2/M4 retrieval"]`,
  },
  lifecycle: {
    label: "Observable regulatory processing lifecycle",
    caption:
      "Long-running stages are explicit and retryable. Held work remains visible and recoverable, while versions prevent stale outputs from silently replacing newer evidence.",
    chart: `stateDiagram-v2
      [*] --> discovered
      discovered --> downloaded
      downloaded --> extracting
      extracting --> extracted
      extracting --> extraction_failed
      extraction_failed --> extracting: retry
      extracted --> preprocessing
      preprocessing --> preprocessed
      preprocessed --> classifying
      classifying --> classified
      classified --> held: unsafe / incomplete
      classified --> summarizing
      held --> summarizing: review / release
      summarizing --> summarized
      summarized --> translating
      translating --> ready
      ready --> alerted
      alerted --> measured`,
  },
} as const;

export default enigmatrixResearch;
