import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectVisual as Motif } from "@/types";

/**
 * ProjectVisual — the image area of a featured project card.
 *
 * No screenshots exist in the repo yet, and the two easy fallbacks are both
 * bad: a mock application UI would misrepresent what was built, and a gradient
 * would carry no information at all. So each project gets an abstract motif
 * drawn from what the system actually is — a tenant topology, a deploy
 * pipeline, a device matrix, an entity schema.
 *
 * The moment a real screenshot lands in `project.image`, it wins and renders
 * inside a restrained browser frame instead. No code change needed.
 *
 * Motifs are pure SVG at low contrast: they should read as technical texture
 * behind the type, never as illustration competing with it.
 */

const FRAME =
  "relative aspect-[2.6/1] w-full overflow-hidden rounded-md border border-hairline bg-muted/30";

/** Dotted background grid shared by every motif. */
function Grid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.5]"
      style={{
        backgroundImage:
          "radial-gradient(currentColor 0.5px, transparent 0.5px)",
        backgroundSize: "10px 10px",
        color: "var(--muted-foreground)",
        maskImage: "radial-gradient(120% 120% at 50% 40%, black, transparent)",
        WebkitMaskImage:
          "radial-gradient(120% 120% at 50% 40%, black, transparent)",
      }}
    />
  );
}

/** Multi-tenant: one core, many isolated tenants hanging off it. */
function Topology() {
  const tenants = [
    [42, 26],
    [42, 74],
    [88, 16],
    [88, 50],
    [88, 84],
    [212, 26],
    [212, 74],
  ];
  return (
    <svg viewBox="0 0 260 100" className="size-full text-muted-foreground">
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.45" fill="none">
        {tenants.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y} C 120 ${y}, 130 50, 150 50`} />
        ))}
      </g>
      {tenants.map(([x, y]) => (
        <rect
          key={`n-${x}-${y}`}
          x={x - 9}
          y={y - 5}
          width="18"
          height="10"
          rx="2"
          fill="currentColor"
          opacity="0.16"
        />
      ))}
      <rect
        x="140"
        y="38"
        width="24"
        height="24"
        rx="4"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

/** CI/CD: staged pipeline ending in a blue-green swap. */
function Pipeline() {
  const stages = [14, 66, 118, 170];
  return (
    <svg viewBox="0 0 260 100" className="size-full text-muted-foreground">
      <path
        d="M14 50 H222"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.4"
      />
      {stages.map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y="40"
            width="38"
            height="20"
            rx="3"
            fill="currentColor"
            opacity={0.14 + i * 0.04}
          />
          <rect
            x={x + 6}
            y="47"
            width={18 - i * 3}
            height="2"
            rx="1"
            fill="currentColor"
            opacity="0.4"
          />
        </g>
      ))}
      {/* health-gated split: one path promoted, one held */}
      <path
        d="M222 50 C 234 50, 234 28, 246 28"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.4"
        fill="none"
      />
      <path
        d="M222 50 C 234 50, 234 72, 246 72"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.25"
        fill="none"
        strokeDasharray="2 2"
      />
      <circle cx="248" cy="28" r="4" fill="currentColor" opacity="0.35" />
      <circle
        cx="248"
        cy="72"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.3"
      />
    </svg>
  );
}

/** Cross-platform: one codebase, three viewports. */
function Devices() {
  return (
    <svg viewBox="0 0 260 100" className="size-full text-muted-foreground">
      <g fill="currentColor">
        <rect x="60" y="16" width="76" height="52" rx="3" opacity="0.16" />
        <rect x="60" y="16" width="76" height="7" rx="3" opacity="0.14" />
        <rect x="66" y="72" width="64" height="3" rx="1.5" opacity="0.1" />

        <rect x="148" y="22" width="30" height="56" rx="4" opacity="0.2" />
        <rect x="152" y="29" width="22" height="42" rx="1.5" opacity="0.12" />

        <rect x="190" y="30" width="24" height="42" rx="3" opacity="0.16" />
        <rect x="194" y="36" width="16" height="30" rx="1.5" opacity="0.1" />
      </g>
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.35" fill="none">
        <path d="M40 46 H60" />
        <path d="M136 42 C 142 42, 142 50, 148 50" />
        <path d="M178 50 C 184 50, 184 51, 190 51" />
      </g>
      <circle cx="34" cy="46" r="5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/** Relational schema: related tables with a tenant-scoped root. */
function Schema() {
  const tables: [number, number, number][] = [
    [22, 18, 5],
    [104, 12, 6],
    [104, 62, 3],
    [188, 34, 4],
  ];
  return (
    <svg viewBox="0 0 260 100" className="size-full text-muted-foreground">
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.4" fill="none">
        <path d="M74 40 H104" />
        <path d="M74 46 C 90 46, 90 76, 104 76" />
        <path d="M156 40 C 172 40, 172 50, 188 50" />
      </g>
      {tables.map(([x, y, rows]) => (
        <g key={`${x}-${y}`}>
          <rect
            x={x}
            y={y}
            width="52"
            height={12 + rows * 6}
            rx="2.5"
            fill="currentColor"
            opacity="0.13"
          />
          <rect
            x={x}
            y={y}
            width="52"
            height="8"
            rx="2.5"
            fill="currentColor"
            opacity="0.16"
          />
          {Array.from({ length: rows }).map((_, r) => (
            <rect
              key={r}
              x={x + 5}
              y={y + 13 + r * 6}
              width={34 - (r % 3) * 7}
              height="2"
              rx="1"
              fill="currentColor"
              opacity="0.32"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

const MOTIF: Record<Motif, () => React.ReactElement> = {
  topology: Topology,
  pipeline: Pipeline,
  devices: Devices,
  schema: Schema,
};

export function ProjectVisual({
  image,
  video,
  visual,
  title,
  className,
}: {
  image?: string;
  video?: string;
  visual?: Motif;
  title: string;
  className?: string;
}) {
  // A real screenshot always beats a motif — shown in a restrained browser
  // frame, not a tilted 3D mockup.
  if (image || video) {
    return (
      <div className={cn(FRAME, "bg-background", className)}>
        <div
          aria-hidden
          className="flex h-5 items-center gap-1.5 border-b border-hairline bg-muted/40 px-2.5"
        >
          {["", "", ""].map((_, i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-muted-foreground/25"
            />
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
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}
        </div>
      </div>
    );
  }

  const Motif = visual ? MOTIF[visual] : null;

  return (
    <div
      className={cn(FRAME, className)}
      role="img"
      aria-label={`Abstract technical diagram representing the architecture of ${title}`}
    >
      <Grid />
      {Motif && (
        <div className="absolute inset-0 p-3 transition-transform duration-500 group-hover:scale-[1.02]">
          <Motif />
        </div>
      )}
    </div>
  );
}

export default ProjectVisual;
