import { describe, expect, it } from "vitest";
import { ASSETS } from "./mockData";

describe("mobile visual asset configuration", () => {
  it("uses the user-supplied phone illustration from managed project storage", () => {
    expect(ASSETS.heroPhone).toBe("/manus-storage/pxk-user-supplied-phone-illustration_a1d560a6.png");
  });
});
