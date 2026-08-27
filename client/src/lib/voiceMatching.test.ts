/** Community Wayfinding: spoken-answer matching is bounded to visible option values and can never infer an unlisted medical response. */
import { describe, expect, it } from "vitest";
import { matchSpokenOption } from "./voiceMatching";
const options = [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }, { value: "Not sure", label: "Not sure" }];
describe("PxK spoken option matching", () => { it("matches an exact spoken option and common non-medical alias", () => { expect(matchSpokenOption("yes", options)).toBe("Yes"); expect(matchSpokenOption("yeah", options)).toBe("Yes"); }); it("does not select an option when the transcription is unrelated", () => { expect(matchSpokenOption("I cannot describe this", options)).toBeUndefined(); }); });
