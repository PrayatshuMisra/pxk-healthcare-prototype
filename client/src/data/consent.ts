/** Community Wayfinding: consent is explicit, versioned, and local to this frontend-only demonstration. */
export const CONSENT_KEY = "pxk-demo-consent-v1";
export type DemoConsent = { version: "v1"; acknowledgedAt: string; localOnly: true; clinicalBoundary: true };
export function getDemoConsent(): DemoConsent | null { if (typeof window === "undefined") return null; try { const raw = window.localStorage.getItem(CONSENT_KEY); return raw ? JSON.parse(raw) as DemoConsent : null; } catch { return null; } }
export function setDemoConsent() { const consent: DemoConsent = { version: "v1", acknowledgedAt: new Date().toISOString(), localOnly: true, clinicalBoundary: true }; if (typeof window !== "undefined") window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent)); return consent; }
