export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { setDemoSession } from "@/hooks/useDemoSession";

/** Starts a browser-local demo session. It deliberately does not call an external identity provider. */
export const startLogin = () => {
  setDemoSession(true);
};
