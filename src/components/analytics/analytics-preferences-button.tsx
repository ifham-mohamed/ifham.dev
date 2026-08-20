"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  analyticsConfig,
  type AnalyticsConsentChoice,
} from "@/config/analytics.config";

function isConsentChoice(value: string | null): value is AnalyticsConsentChoice {
  return value === "granted" || value === "denied";
}

export function AnalyticsPreferencesButton() {
  const [choice, setChoice] = useState<AnalyticsConsentChoice | null>(null);

  useEffect(() => {
    const initializationId = window.setTimeout(() => {
      try {
        const storedChoice = window.localStorage.getItem(
          analyticsConfig.consentStorageKey
        );
        setChoice(isConsentChoice(storedChoice) ? storedChoice : null);
      } catch {
        setChoice(null);
      }
    }, 0);

    const handleChange = (event: Event) => {
      const nextChoice = (event as CustomEvent<string>).detail;
      setChoice(isConsentChoice(nextChoice) ? nextChoice : null);
    };

    window.addEventListener(
      analyticsConfig.consentChangedEvent,
      handleChange
    );
    return () => {
      window.clearTimeout(initializationId);
      window.removeEventListener(
        analyticsConfig.consentChangedEvent,
        handleChange
      );
    };
  }, []);

  const status =
    choice === "granted"
      ? "Allowed"
      : choice === "denied"
        ? "Declined"
        : "Not selected";

  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-border bg-surface-raised p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Current analytics choice:{" "}
        <span className="font-medium text-foreground">{status}</span>
      </p>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() =>
          window.dispatchEvent(
            new Event(analyticsConfig.openPreferencesEvent)
          )
        }
      >
        Review analytics choice
      </Button>
    </div>
  );
}

export default AnalyticsPreferencesButton;
