export const analyticsConfig = {
  measurementId: "G-HGESN3BVG1",
  consentStorageKey: "ifham.analytics-consent.v1",
  openPreferencesEvent: "ifham:open-analytics-preferences",
  consentChangedEvent: "ifham:analytics-consent-changed",
} as const;

export type AnalyticsConsentChoice = "granted" | "denied";

