import { ImageResponse } from "next/og";
import { OgCard } from "@/components/seo/og-card";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "Applied software engineering research by Ifham Mohamed";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Applied research"
      title="From official rule to informed action"
      description="Regulatory intelligence, multilingual document processing, machine learning, and evidence-grounded SME guidance."
    />,
    { ...size }
  );
}

