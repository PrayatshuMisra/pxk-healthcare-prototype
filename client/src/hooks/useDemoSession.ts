import { useCallback, useEffect, useState } from "react";

export const DEMO_SESSION_KEY = "pxk-demo-session-v1";
export const DEMO_SESSION_EVENT = "pxk-demo-session-change";

export const isDemoSessionActive = (value: string | null) => value === "active";

export function setDemoSession(active: boolean) {
  if (typeof window === "undefined") return;
  if (active) window.localStorage.setItem(DEMO_SESSION_KEY, "active");
  else window.localStorage.removeItem(DEMO_SESSION_KEY);
  window.dispatchEvent(new Event(DEMO_SESSION_EVENT));
}

export function useDemoSession() {
  const read = useCallback(() => typeof window !== "undefined" && isDemoSessionActive(window.localStorage.getItem(DEMO_SESSION_KEY)), []);
  const [isDemoSession, setIsDemoSession] = useState(read);

  useEffect(() => {
    const sync = () => setIsDemoSession(read());
    window.addEventListener(DEMO_SESSION_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(DEMO_SESSION_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [read]);

  return { isDemoSession, setDemoSession };
}
