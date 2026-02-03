import { ImageResponse } from "next/og";
import { allPosts } from "../../../../.content-collections/generated";

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
          padding: 60,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: "bold", maxWidth: "90%" }}>
          {title}
        </div>
        {summary && (
          <div
            style={{
              fontSize: 28,
              marginTop: 20,
              opacity: 0.8,
              maxWidth: "80%",
            }}
          >
            {summary}
          </div>
        )}
        <div style={{ fontSize: 24, marginTop: 40, opacity: 0.6 }}>
          ifham.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
