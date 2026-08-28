/** Community Wayfinding: consent is explicit, versioned, and stored only in this browser for the prototype. */
export const CONSENT_KEY = "pxk-demo-consent-v2";
export type DemoConsent = { version: "v2"; acknowledgedAt: string; prototypeOnly: true; localProcessing: true; clinicalBoundary: true };

export function isCompleteDemoConsent(value: unknown): value is DemoConsent {
  const consent = value as Partial<DemoConsent> | null;
  return consent?.version === "v2" && consent.prototypeOnly === true && consent.localProcessing === true && consent.clinicalBoundary === true;
}

export function getDemoConsent(): DemoConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    const consent = raw ? JSON.parse(raw) : null;
    return isCompleteDemoConsent(consent) ? consent : null;
  } catch {
    return null;
  }
}

export function setDemoConsent() {
  const consent: DemoConsent = { version: "v2", acknowledgedAt: new Date().toISOString(), prototypeOnly: true, localProcessing: true, clinicalBoundary: true };
  if (typeof window !== "undefined") window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  return consent;
}
