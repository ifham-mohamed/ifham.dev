import { Mermaid } from "@/components/projects/mermaid";
import { researchDiagrams, type ResearchDiagramKind } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Named diagrams keep dense Mermaid source out of the MDX narrative while
 * preserving it as text, in version control, beside the research data.
 */
export function ResearchDiagram({
  kind,
  className,
}: {
  kind: ResearchDiagramKind;
  className?: string;
}) {
  const diagram = researchDiagrams[kind];

  return (
    <div className={cn("not-prose my-8 max-w-case-wide", className)}>
      <Mermaid
        chart={diagram.chart}
        label={diagram.label}
        caption={diagram.caption}
      />
    </div>
  );
}

export default ResearchDiagram;
