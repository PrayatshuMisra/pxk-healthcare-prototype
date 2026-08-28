import { afterEach, describe, expect, it, vi } from "vitest";
import { DEMO_SESSION_EVENT, DEMO_SESSION_KEY, isDemoSessionActive, setDemoSession } from "./useDemoSession";

describe("local demo session", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("writes and removes the browser-local session marker while notifying the UI", () => {
    const values = new Map<string, string>();
    const dispatchEvent = vi.fn();
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
        removeItem: (key: string) => values.delete(key),
      },
      dispatchEvent,
    });

    setDemoSession(true);
    expect(isDemoSessionActive(values.get(DEMO_SESSION_KEY) ?? null)).toBe(true);
    expect(dispatchEvent).toHaveBeenCalledWith(expect.objectContaining({ type: DEMO_SESSION_EVENT }));

    setDemoSession(false);
    expect(isDemoSessionActive(values.get(DEMO_SESSION_KEY) ?? null)).toBe(false);
  });
});
