import { ImageResponse } from "next/og";
import { projects } from "@/data";
import { themePalette } from "@/config/theme.config";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  const title = project?.title ?? "Engineering case study";
  const description = project?.oneLiner ?? project?.description ?? "";
  const color = themePalette.dark;

  return new ImageResponse(
    (
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
            Engineering case study
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
            {description && (
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
            )}
          </div>

          <div style={{ color: color.textSubtle, fontSize: 22 }}>
            Ifham Mohamed · ifham.dev
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
