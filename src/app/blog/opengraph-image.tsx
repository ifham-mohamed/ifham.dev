import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "linear-gradient(to bottom right, #1a1a2e, #16213e)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: "bold" }}>Blog</div>
        <div style={{ fontSize: 32, marginTop: 20, opacity: 0.8 }}>
          Ifham Mohamed
        </div>
      </div>
    ),
    { ...size }
  );
}
