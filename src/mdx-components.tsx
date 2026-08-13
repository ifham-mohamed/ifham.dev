import { CodeBlock } from "@/components/mdx/code-block";
import { ANCHOR_OFFSET } from "@/components/ui";
import { slugify, textFromChildren } from "@/lib/slug";
import { MediaContainer } from "@/components/mdx/media-container";
import type { ComponentProps } from "react";

type CodeProps = ComponentProps<"code"> & {
  "data-language"?: string;
};

/**
 * Headings carry the ids the contents rail links to.
 *
 * `rehype-slug` would do this, but it is a dependency for one function and it
 * would not solve the other half of the problem: the rail needs the heading
 * list *before* render, which is extracted in content-collections.ts. Both
 * sides call `slugify`, so the id on the element and the href in the rail can
 * never drift apart.
 *
 * ANCHOR_OFFSET is the same scroll-margin the case studies use, so a jumped-to
 * heading clears the 3.5rem sticky header instead of hiding behind it.
 */
function heading(Tag: "h2" | "h3") {
  const Heading = ({ children, ...props }: ComponentProps<"h2">) => (
    <Tag id={slugify(textFromChildren(children))} className={ANCHOR_OFFSET} {...props}>
      {children}
    </Tag>
  );
  Heading.displayName = `Mdx${Tag.toUpperCase()}`;
  return Heading;
}

export const mdxComponents = {
  h2: heading("h2"),
  h3: heading("h3"),
  MediaContainer,
  pre: (props: ComponentProps<"pre">) => <CodeBlock {...props} />,
  hr: (props: ComponentProps<"hr">) => (
    <div className="my-10 flex w-full items-center" {...props}>
      <div
        className="flex-1 h-px bg-border"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      />
    </div>
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 border border-border rounded-xl overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table
          className="m-0! w-full min-w-full border-separate border-spacing-0"
          {...props}
        />
      </div>
    </div>
  ),
  code: ({ children, ...props }: CodeProps) => {
    if (props["data-language"]) {
      return <code {...props}>{children}</code>;
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded-md bg-muted/60 dark:bg-muted/40 text-sm font-mono text-foreground/90"
        {...props}
      >
        {children}
      </code>
    );
  },
} as const;

