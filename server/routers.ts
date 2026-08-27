/** Community Wayfinding: the root tRPC router combines authenticated saved-progress and non-diagnostic NLP intake contracts. */
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { intakeRouter } from "./routers/intake";
import { screeningRouter } from "./routers/screening";
export const appRouter = router({ system: systemRouter, auth: router({ me: publicProcedure.query((opts) => opts.ctx.user), logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }) }), intake: intakeRouter, screening: screeningRouter });
export type AppRouter = typeof appRouter;
