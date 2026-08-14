import { ImageResponse } from "next/og";
import { themePalette } from "@/config/theme.config";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function Image() {
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
          padding: 54,
          color: color.text,
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
            Writing · Engineering notes
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontSize: 88,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                fontWeight: 700,
              }}
            >
              Blog
            </div>
            <div style={{ color: color.textSecondary, fontSize: 30 }}>
              Software development, architecture, and the things I get wrong first.
            </div>
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
