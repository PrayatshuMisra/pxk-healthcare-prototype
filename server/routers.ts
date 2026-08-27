/** Community Wayfinding: protected NLP, voice, saved-progress, and appointment contracts keep patient-owned workflow data separate from provider-only review. */
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { appointmentRouter } from "./routers/appointments";
import { intakeRouter } from "./routers/intake";
import { screeningRouter } from "./routers/screening";
import { voiceRouter } from "./routers/voice";
export const appRouter = router({ system: systemRouter, auth: router({ me: publicProcedure.query((opts) => opts.ctx.user), logout: publicProcedure.mutation(({ ctx }) => { const cookieOptions = getSessionCookieOptions(ctx.req); ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 }); return { success: true } as const; }) }), intake: intakeRouter, screening: screeningRouter, voice: voiceRouter, appointments: appointmentRouter });
export type AppRouter = typeof appRouter;
