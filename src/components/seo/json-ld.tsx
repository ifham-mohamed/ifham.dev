interface JsonLdProps {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
}

/** Server-rendered JSON-LD with script-breaking characters escaped. */
export function JsonLd({ data }: JsonLdProps) {
  const content = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default JsonLd;
