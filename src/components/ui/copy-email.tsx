import { cn } from "@/lib/utils";
import { CopyValueButton } from "./copy-value-button";

/** Keeps clipboard state at the leaf so the full contact/GitHub panel remains server-rendered. */
export function CopyEmail({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-hairline pt-5",
        className
      )}
    >
      <a
        href={`mailto:${email}`}
        className="link-underline font-mono text-sm text-foreground"
      >
        {email}
      </a>

      <CopyValueButton value={email} label="email address" />
    </div>
  );
}

export default CopyEmail;
