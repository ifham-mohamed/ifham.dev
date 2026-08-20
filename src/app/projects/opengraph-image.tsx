import { ImageResponse } from "next/og";
import { OgCard } from "@/components/seo/og-card";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "Software engineering projects and case studies by Ifham Mohamed";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Engineering portfolio"
      title="Projects & case studies"
      description="Production systems, technical decisions, constraints, and evidence from full-stack engineering work."
    />,
    { ...size }
  );
}

