import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 180, height: 180 };

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
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
              background: "#e8b339",
            }}
          />
          <div
            style={{
              width: 17,
              height: 68,
              borderRadius: 8,
              background: "#ffffff",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            color: "#ffffff",
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
