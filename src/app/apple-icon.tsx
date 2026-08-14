import { ImageResponse } from "next/og";
import { themePalette } from "@/config/theme.config";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  const color = themePalette.dark;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: color.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 17,
              height: 17,
              borderRadius: 999,
              background: color.accent,
            }}
          />
          <div
            style={{
              width: 17,
              height: 68,
              borderRadius: 8,
              background: color.text,
            }}
          />
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            color: color.text,
            lineHeight: 1,
            letterSpacing: -3,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
