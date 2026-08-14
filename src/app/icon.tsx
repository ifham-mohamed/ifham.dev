import { ImageResponse } from "next/og";
import { themePalette } from "@/config/theme.config";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 32, height: 32 };

export default function Icon() {
  const color = themePalette.dark;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: color.background,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: 999,
              background: color.accent,
            }}
          />
          <div
            style={{
              width: 3,
              height: 12,
              borderRadius: 1.5,
              background: color.text,
            }}
          />
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: color.text,
            lineHeight: 1,
            letterSpacing: -0.5,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
