import { ImageResponse } from "next/og";
import { allResearch } from "../../../../.content-collections/generated";
import { OgCard } from "@/components/seo/og-card";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "Applied software engineering research by Ifham Mohamed";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return allResearch.map((document) => ({ slug: document.researchId }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const document = allResearch.find((item) => item.researchId === slug);

  return new ImageResponse(
    <OgCard
      eyebrow={document?.eyebrow ?? "Research dossier"}
      title={document?.title ?? "Applied software engineering research"}
      description={
        document?.summary ??
        "Research questions, implementation evidence, evaluation, and limitations."
      }
    />,
    { ...size }
  );
}
