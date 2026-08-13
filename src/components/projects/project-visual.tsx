import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectVisual as Motif } from "@/types";

/**
 * ProjectVisual — the identifying mark on a project card.
 *
 * Replaces a placeholder that filled half the card with the project's first
 * letter at 2rem. That communicated nothing and made fifteen cards look like
 * fifteen empty boxes.
 *
 * Selection order:
 *   1. a real screenshot or video, shown in a restrained browser frame
 *   2. a project-specific technical motif, chosen per project in the data
 *   3. a compact monogram, only when neither exists
 *
 * The motifs are abstract on purpose. They are line diagrams of the shape of
 * the system — tenants around a core, stages in a pipeline, tables and their
 * relations — not mock application UI. A card-sized render of a real
 * architecture diagram would be illegible at this scale, and a fake dashboard
 * would misrepresent the work.
 *
 * Every motif is drawn at strokeWidth 0.6 in `currentColor` at low opacity, so
 * it reads as texture behind the label rather than as illustration.
 */

/** 2.4:1 keeps the visual near 40% of card height, not the 50%+ it was. */
const FRAME =
  "relative aspect-[2.4/1] w-full overflow-hidden border-b border-hairline bg-muted/25";

const STROKE = {
  stroke: "currentColor",
  strokeWidth: 0.6,
  fill: "none",
} as const;

/** Many tenants or roles resolving to one shared core. */
function Topology() {
  const nodes = [18, 38, 58, 78];
  return (
    <svg viewBox="0 0 200 84" className="size-full text-muted-foreground">
      <g {...STROKE} opacity="0.4">
        {nodes.map((y) => (
          <path key={y} d={`M34 ${y} C 78 ${y}, 84 42, 116 42`} />
        ))}
        <path d="M140 42 H176" />
      </g>
      <g fill="currentColor" opacity="0.18">
        {nodes.map((y) => (
          <rect key={y} x="14" y={y - 4} width="20" height="8" rx="1.5" />
        ))}
      </g>
      <rect x="116" y="30" width="24" height="24" rx="3" {...STROKE} opacity="0.5" />
      <rect x="176" y="36" width="12" height="12" rx="1.5" fill="currentColor" opacity="0.22" />
    </svg>
  );
}

/** Staged build → registry → host, ending in a guarded swap. */
function Pipeline() {
  const stages = [14, 60, 106];
  return (
    <svg viewBox="0 0 200 84" className="size-full text-muted-foreground">
      <g {...STROKE} opacity="0.4">
        <path d="M14 42 H152" />
        <path d="M152 42 C 166 42, 166 24, 180 24" />
        <path d="M152 42 C 166 42, 166 60, 180 60" strokeDasharray="2 2" opacity="0.6" />
      </g>
      {stages.map((x, i) => (
        <g key={x}>
          <rect x={x} y="32" width="34" height="20" rx="2.5" {...STROKE} opacity={0.4 + i * 0.08} />
          <rect x={x + 6} y="41" width={16 - i * 4} height="2" rx="1" fill="currentColor" opacity="0.3" />
        </g>
      ))}
      <circle cx="184" cy="24" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="184" cy="60" r="4" {...STROKE} opacity="0.35" />
    </svg>
  );
}

/** One codebase, several viewports. */
function Devices() {
  return (
    <svg viewBox="0 0 200 84" className="size-full text-muted-foreground">
      <g {...STROKE} opacity="0.45">
        <rect x="46" y="16" width="66" height="46" rx="2.5" />
        <path d="M46 25 H112" />
        <rect x="124" y="20" width="24" height="44" rx="3" />
        <path d="M124 27 H148" />
        <rect x="160" y="26" width="18" height="32" rx="2.5" />
        <path d="M22 39 H46" />
      </g>
      <circle cx="16" cy="39" r="4" fill="currentColor" opacity="0.25" />
      <g fill="currentColor" opacity="0.12">
        <rect x="52" y="31" width="30" height="3" rx="1.5" />
        <rect x="52" y="38" width="44" height="3" rx="1.5" />
        <rect x="130" y="33" width="12" height="3" rx="1.5" />
      </g>
    </svg>
  );
}

/** Related tables — the shape of a records system. */
function Schema() {
  const tables: [number, number, number][] = [
    [16, 14, 3],
    [82, 30, 4],
    [146, 12, 3],
  ];
  return (
    <svg viewBox="0 0 200 84" className="size-full text-muted-foreground">
      <g {...STROKE} opacity="0.4">
        <path d="M62 32 H82" />
        <path d="M128 48 C 137 48, 137 30, 146 30" />
      </g>
      {tables.map(([x, y, rows]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="46" height={12 + rows * 8} rx="2.5" {...STROKE} opacity="0.45" />
          <path d={`M${x} ${y + 10} H${x + 46}`} {...STROKE} opacity="0.35" />
          {Array.from({ length: rows }).map((_, r) => (
            <rect
              key={r}
              x={x + 6}
              y={y + 16 + r * 8}
              width={30 - (r % 2) * 10}
              height="2"
              rx="1"
              fill="currentColor"
              opacity="0.22"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/** Hardware output — a driven signal rather than a screen. */
function Signal() {
  return (
    <svg viewBox="0 0 200 84" className="size-full text-muted-foreground">
      <g {...STROKE} opacity="0.4">
        <path d="M14 42 H40 L46 22 L58 62 L70 30 L82 54 L94 36 L106 46 H130" />
        <circle cx="158" cy="42" r="22" />
        <circle cx="158" cy="42" r="12" opacity="0.6" />
      </g>
      <g fill="currentColor" opacity="0.22">
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={150} y={22 + i * 5} width="16" height="2" rx="1" />
        ))}
      </g>
      <circle cx="130" cy="42" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

const MOTIF: Record<Motif, () => React.ReactElement> = {
  topology: Topology,
  pipeline: Pipeline,
  devices: Devices,
  schema: Schema,
  signal: Signal,
};

/** "DynaPOS - Multi-Tenant SaaS POS Platform" -> "MULTI-TENANT SAAS POS…" */
function systemLabel(title: string, max = 26) {
  const i = title.indexOf(" - ");
  if (i < 0) return null;
  const category = title.slice(i + 3).toUpperCase();
  return category.length > max
    ? `${category.slice(0, max).replace(/[\s·-]+$/, "")}…`
    : category;
}

export function ProjectVisual({
  image,
  video,
  visual,
  title,
  initials,
  className,
}: {
  image?: string;
  video?: string;
  visual?: Motif;
  title: string;
  /** Used only by the final monogram fallback. */
  initials?: string;
  className?: string;
}) {
  // --- 1. A real screenshot always wins ---
  if (image || video) {
    return (
      <div className={cn(FRAME, "bg-background", className)}>
        <div
          aria-hidden
          className="flex h-5 items-center gap-1.5 border-b border-hairline bg-muted/40 px-2.5"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-muted-foreground/25" />
          ))}
        </div>
        <div className="relative h-[calc(100%-1.25rem)] overflow-hidden">
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <Image
              src={image!}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}
        </div>
      </div>
    );
  }

  const Diagram = visual ? MOTIF[visual] : null;
  const label = systemLabel(title);

  // --- 3. Final fallback: a compact monogram, small and off to one side ---
  if (!Diagram) {
    return (
      <div className={cn(FRAME, "grid place-items-center", className)}>
        <span
          aria-hidden
          className="grid size-9 place-items-center rounded-md border border-border bg-background font-mono text-xs text-muted-foreground"
        >
          {initials ?? title.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  // --- 2. Project-specific technical motif ---
  return (
    <div
      className={cn(FRAME, className)}
      role="img"
      aria-label={`Abstract diagram of the ${title} system`}
    >
      <div className="absolute inset-0 p-4 pb-6 transition-transform duration-500 group-hover:scale-[1.02]">
        <Diagram />
      </div>

      {/* The label is what makes the card identifiable at a glance — the motif
          alone says "a platform", the label says which one. */}
      {label && (
        <span className="absolute bottom-2 left-3 font-mono text-[9px] tracking-[0.12em] text-muted-foreground/60">
          {label}
        </span>
      )}
    </div>
  );
}

export default ProjectVisual;
