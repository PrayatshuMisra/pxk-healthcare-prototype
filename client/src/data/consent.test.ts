import { describe, expect, it } from "vitest";
import { isCompleteDemoConsent } from "./consent";

describe("local demo approval checklist", () => {
  const completeApproval = {
    version: "v2" as const,
    acknowledgedAt: "2026-08-28T00:00:00.000Z",
    prototypeOnly: true as const,
    localProcessing: true as const,
    clinicalBoundary: true as const,
  };

  it("unlocks only after all three required acknowledgements are present", () => {
    expect(isCompleteDemoConsent(completeApproval)).toBe(true);
    expect(isCompleteDemoConsent({ ...completeApproval, localProcessing: false })).toBe(false);
    expect(isCompleteDemoConsent({ ...completeApproval, clinicalBoundary: false })).toBe(false);
  });

  it("invalidates the prior two-item consent version", () => {
    expect(isCompleteDemoConsent({ version: "v1", localOnly: true, clinicalBoundary: true })).toBe(false);
  });
});
