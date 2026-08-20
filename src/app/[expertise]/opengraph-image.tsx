import { ImageResponse } from "next/og";
import { OgCard } from "@/components/seo/og-card";
import {
  expertisePages,
  getExpertiseBySlug,
} from "@/data/expertise.data";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "Software engineering expertise and proof of work by Ifham Mohamed";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return expertisePages.map((page) => ({ expertise: page.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ expertise: string }>;
}) {
  const { expertise } = await params;
  const page = getExpertiseBySlug(expertise);

  return new ImageResponse(
    <OgCard
      eyebrow={page?.label ?? "Engineering expertise"}
      title={page?.title ?? "Software engineering expertise"}
      description={
        page?.description ??
        "Production engineering capabilities connected to projects and technical evidence."
      }
    />,
    { ...size }
  );
}

