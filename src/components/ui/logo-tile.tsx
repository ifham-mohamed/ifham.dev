"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoTileProps = {
  src?: string;
  alt: string;
  /** `contain` for logos with their own padding, `cover` for screenshots. */
  fit?: "contain" | "cover";
  className?: string;
};

/**
 * LogoTile — company / school / project / activity avatar with an initial
 * fallback.
 *
 * This replaced four byte-identical components (CompanyLogo, ProjectThumb,
 * SchoolLogo, ActivityLogo) that differed only in their object-fit.
 */
export function LogoTile({
  src,
  alt,
  fit = "contain",
  className,
}: LogoTileProps) {
  const [failed, setFailed] = useState(false);

  const base = cn(
    "size-10 rounded-md border border-border flex-none overflow-hidden bg-surface",
    className
  );

  if (!src || failed) {
    return (
      <div
        aria-hidden
        className={cn(base, "flex items-center justify-center bg-surface-raised")}
      >
        <span className="text-sm font-medium text-muted-foreground">
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className={cn(
        base,
        fit === "contain" ? "object-contain p-1" : "object-cover"
      )}
      onError={() => setFailed(true)}
    />
  );
}

export default LogoTile;
