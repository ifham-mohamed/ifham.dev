"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { playClick } from "@/lib/sound";

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  const handleToggle = () => {
    // Dark → light = higher tick; light → dark = lower tick.
    playClick({
      freq: isDark ? 920 : 780,
      volume: 0.06,
      duration: 0.07,
    });
    setTheme(nextTheme);
  };

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      aria-label={
        mounted ? `Switch to ${nextTheme} mode` : "Toggle theme"
      }
      className={cn(className)}
      onClick={handleToggle}
    >
      {mounted ? (
        isDark ? (
          <SunIcon className="h-full w-full" />
        ) : (
          <MoonIcon className="h-full w-full" />
        )
      ) : (
        <SunIcon className="h-full w-full opacity-0" />
      )}
    </Button>
  );
}
