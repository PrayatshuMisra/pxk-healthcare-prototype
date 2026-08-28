/** Community Wayfinding: this stateless prototype route classifies a consented sample concern without requiring an external account. */
import { z } from "zod";
import { classifyConcern } from "../nlp";
import { publicProcedure, router } from "../_core/trpc";

const language = z.enum(["en", "kn", "tulu", "kok"]);
export const intakeRouter = router({
  classify: publicProcedure
    .input(z.object({ concern: z.string().trim().min(8).max(1200), language, consentAcknowledged: z.literal(true) }))
    .mutation(({ input }) => classifyConcern(input.concern, input.language)),
});
