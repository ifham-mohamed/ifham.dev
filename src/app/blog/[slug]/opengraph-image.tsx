import { ImageResponse } from "next/og";
import { allPosts } from "../../../../.content-collections/generated";
import { themePalette } from "@/config/theme.config";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    (p) => p._meta.path.replace(/\.mdx$/, "") === params.slug
  );
  const title = post?.title || "Blog Post";
  const summary = post?.summary || "";
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
          color: color.text,
          padding: 54,
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
            Engineering note
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                maxWidth: 970,
                fontSize: title.length > 50 ? 54 : 66,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                fontWeight: 700,
              }}
            >
              {title}
            </div>
            {summary && (
              <div
                style={{
                  maxWidth: 900,
                  color: color.textSecondary,
                  fontSize: 27,
                  lineHeight: 1.35,
                }}
              >
                {summary}
              </div>
            )}
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
