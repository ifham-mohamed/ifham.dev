"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  analyticsConfig,
  type AnalyticsConsentChoice,
} from "@/config/analytics.config";
import { classifyAnalyticsLink } from "@/lib/analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const disableKey = `ga-disable-${analyticsConfig.measurementId}`;

function isConsentChoice(value: string | null): value is AnalyticsConsentChoice {
  return value === "granted" || value === "denied";
}

function setAnalyticsDisabled(disabled: boolean) {
  (window as unknown as Record<string, unknown>)[disableKey] = disabled;
}

function removeAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name?.startsWith("_ga")));

  const host = window.location.hostname;
  const registrableDomain = host.split(".").slice(-2).join(".");
  const domains = Array.from(
    new Set(["", host, `.${host}`, `.${registrableDomain}`])
  );

  for (const name of cookieNames) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${
        domain ? `; domain=${domain}` : ""
      }`;
    }
  }
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<AnalyticsConsentChoice | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTagReady, setIsTagReady] = useState(false);

  useEffect(() => {
    const initializationId = window.setTimeout(() => {
      let storedChoice: string | null = null;

      try {
        storedChoice = window.localStorage.getItem(
          analyticsConfig.consentStorageKey
        );
      } catch {
        // Storage can be unavailable in hardened or private browsing modes.
      }

      const initialChoice = isConsentChoice(storedChoice)
        ? storedChoice
        : null;
      setChoice(initialChoice);
      setAnalyticsDisabled(initialChoice !== "granted");
      setIsOpen(initialChoice === null);
      setIsReady(true);
    }, 0);

    const openPreferences = () => setIsOpen(true);
    window.addEventListener(
      analyticsConfig.openPreferencesEvent,
      openPreferences
    );

    return () => {
      window.clearTimeout(initializationId);
      window.removeEventListener(
        analyticsConfig.openPreferencesEvent,
        openPreferences
      );
    };
  }, []);

  useEffect(() => {
    if (choice !== "granted" || !isTagReady || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
    });
  }, [choice, isTagReady, pathname]);

  useEffect(() => {
    if (choice !== "granted" || !isTagReady) return;

    function trackQualifiedLink(event: MouseEvent) {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const containingSection = anchor.closest<HTMLElement>(
        "section[id], header, footer"
      );
      const linkLocation =
        anchor.dataset.analyticsLocation ||
        containingSection?.id ||
        containingSection?.tagName.toLowerCase() ||
        "page";
      const analyticsEvent = classifyAnalyticsLink({
        href: anchor.href,
        sourcePath: window.location.pathname,
        siteOrigin: window.location.origin,
        linkLocation,
      });

      if (!analyticsEvent || !window.gtag) return;
      window.gtag("event", analyticsEvent.name, analyticsEvent.params);
    }

    document.addEventListener("click", trackQualifiedLink);
    return () => document.removeEventListener("click", trackQualifiedLink);
  }, [choice, isTagReady]);

  function saveChoice(nextChoice: AnalyticsConsentChoice) {
    try {
      window.localStorage.setItem(
        analyticsConfig.consentStorageKey,
        nextChoice
      );
    } catch {
      // The choice still applies for this page even if persistence is blocked.
    }

    setAnalyticsDisabled(nextChoice !== "granted");

    if (nextChoice === "granted" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      setIsTagReady(true);
    } else if (nextChoice === "denied") {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      removeAnalyticsCookies();
      setIsTagReady(false);
    }

    setChoice(nextChoice);
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent(analyticsConfig.consentChangedEvent, {
        detail: nextChoice,
      })
    );
  }

  return (
    <>
      {choice === "granted" && (
        <>
          <Script id="ga4-consent-bootstrap" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
              window.gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              window.gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              window.gtag('js', new Date());
              window.gtag('config', '${analyticsConfig.measurementId}', {
                allow_ad_personalization_signals: false,
                allow_google_signals: false,
                send_page_view: false
              });
            `}
          </Script>
          <Script
            id="ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.measurementId}`}
            strategy="afterInteractive"
            onLoad={() => setIsTagReady(true)}
            onReady={() => setIsTagReady(true)}
          />
        </>
      )}

      {isReady && isOpen && (
        <section
          aria-labelledby="analytics-consent-title"
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-xl border border-border-strong bg-surface-raised p-4 shadow-xl sm:inset-x-6 sm:bottom-6 sm:p-5"
          role="dialog"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="max-w-xl">
              <h2
                id="analytics-consent-title"
                className="text-sm font-semibold text-foreground"
              >
                Optional, privacy-first analytics
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Google Analytics stays completely off unless you allow it. If
                enabled, it helps me understand which pages are useful; ad
                storage and advertising signals remain disabled. Read the{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-brand underline underline-offset-4 hover:text-brand-hover"
                >
                  privacy and analytics details
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-none flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => saveChoice("denied")}
              >
                Decline
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => saveChoice("granted")}
              >
                Allow analytics
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AnalyticsConsent;
