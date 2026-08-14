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
              justifyContent: "space-between",
              color: color.textSecondary,
              fontSize: 22,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: color.accent,
                }}
              />
              ifham.dev
            </div>
            Portfolio · 2026
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                maxWidth: 900,
                fontSize: 78,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                fontWeight: 700,
              }}
            >
              Ifham Mohamed
            </div>
            <div
              style={{
                maxWidth: 760,
                color: color.textSecondary,
                fontSize: 30,
                lineHeight: 1.35,
              }}
            >
              Software Engineer building reliable full-stack products and
              evidence-led systems.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{ width: 72, height: 4, borderRadius: 99, background: color.accent }}
            />
            <div style={{ color: color.textSubtle, fontSize: 22 }}>
              Engineering · Research · Writing
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
