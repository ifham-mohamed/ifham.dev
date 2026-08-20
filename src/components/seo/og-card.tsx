import { themePalette } from "@/config/theme.config";

interface OgCardProps {
  eyebrow: string;
  title: string;
  description: string;
  footer?: string;
}

/** Shared, self-hosted artwork for route-specific Open Graph images. */
export function OgCard({
  eyebrow,
  title,
  description,
  footer = "Ifham Mohamed · ifham.dev",
}: OgCardProps) {
  const color = themePalette.dark;

  return (
    <div
      style={{
        background: color.background,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color.text,
        padding: 54,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `1px solid ${color.border}`,
          borderRadius: 24,
          background: color.surface,
          padding: 58,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: color.accent,
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: color.accent,
            }}
          />
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              maxWidth: 980,
              fontSize: title.length > 54 ? 52 : 64,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              fontWeight: 700,
            }}
          >
            {title}
          </div>
          <div
            style={{
              maxWidth: 920,
              color: color.textSecondary,
              fontSize: 26,
              lineHeight: 1.35,
            }}
          >
            {description}
          </div>
        </div>

        <div style={{ color: color.textSubtle, fontSize: 22 }}>{footer}</div>
      </div>
    </div>
  );
}

