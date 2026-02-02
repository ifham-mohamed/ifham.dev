import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  backHref,
  backLabel = "Back",
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {backLabel}
        </Link>
      )}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
