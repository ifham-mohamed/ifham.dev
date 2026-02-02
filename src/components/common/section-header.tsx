import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

export default SectionHeader;
